import { Translate } from "@google-cloud/translate/build/src/v2";

import clc from "cli-color";
import fs from "fs";
import get from "lodash.get";
import set from "lodash.set";
import path from "path";
import { Locales } from ".";

const namespacesDir = path.join(__dirname, "namespaces");
const namespaces = fs.readdirSync(namespacesDir);

// Instantiates a client
const translate = new Translate({
  key: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY,
});

async function translateText(text, target = "pt") {
  if (text && target) {
    let [translation] = await translate.translate(text, {
      from: "en",
      to: target,
    });
    return translation;
  }
}

const processLocale = async (locale, defaultLocale) => {
  if (!locale) {
    throw "No Locale";
  }

  let namespaceIndex = 0;

  while (namespaceIndex < namespaces.length) {
    const namespace = namespaces[namespaceIndex];
    const currentData = getNamespaceContent(namespace);
    const previousData = getPublicLocaleJSONContent(defaultLocale, namespace);

    const isDefault = defaultLocale === locale;
    const currentLocaleData = getPublicLocaleJSONContent(locale, namespace);

    if (isDefault && false) {
      writeLocaleJSON(namespace, locale, currentData);
    } else {
      const promises = [];
      let skipped = 0;

      for (const key in currentData) {
        const { text } = getText(get(currentData, key), locale);
        const prevText = get(previousData, key);
        const currentLocaleText = get(currentLocaleData, key);

        if (isDefault || (text === prevText && !!currentLocaleText)) {
          skipped++;

          promises.push(
            Promise.resolve({
              [key]: isDefault ? text : currentLocaleText,
            })
          );
        } else {
          console.log(clc.bgYellow("GETTING", `${namespace}:${key}`));

          promises.push(
            translateText(text, locale).then((data) => ({
              [key]: data,
            }))
          );
        }
      }

      const translatedText = await Promise.all(promises);
      const data = translatedText.reduce(
        (prev, current) => ({
          ...prev,
          ...current,
        }),
        {}
      );

      if (skipped) {
        console.log(
          clc.bold(clc.bgCyan("SKIPPED", skipped, "on", locale, namespace))
        );
      }

      writeLocaleJSON(namespace, locale, data);
    }
    namespaceIndex += 1;
  }
  cleanUpLocale(locale);
};

const cleanUpLocale = (locale) => {
  console.log(clc.blue("CLEANUP LOCALE", locale), "\n", "----------");
};

const writeLocaleJSON = (namespace, locale, data) => {
  const dirName = path.join(__dirname, "../", "public", "locales", locale);
  const fileName = path.join(dirName, replaceJStoJSON(namespace));
  createDirIfNotExists(dirName);

  fs.writeFileSync(fileName, JSON.stringify(toPairs(data) ?? "{}"), {
    flag: "w+",
  });

  console.log(clc.green("UPDATED:", locale, replaceJStoJSON(namespace)));
};

const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const replaceJStoJSON = (name) => name.replace(".ts", ".json");

const getPublicLocaleJSONContent = (locale, namespace) => {
  const dirName = path.join(__dirname, "../", "public", "locales", locale);
  const fileName = path.join(dirName, replaceJStoJSON(namespace));

  createDirIfNotExists(dirName);

  if (fs.existsSync(fileName)) {
    const raw = fs.readFileSync(fileName).toString();
    if (!!raw) {
      console.log("FOUND INITIAL DATA for", locale, replaceJStoJSON(namespace));

      return JSON.parse(raw);
    }
  }

  return {};
};

const getNamespaceContent = (namespace) => {
  const fileName = path.join(namespacesDir, namespace);
  const content = toDotNotation(require(fileName).default);

  return content;
};

function toDotNotation(obj: any, res: Object = {}, current: string = "") {
  for (const key in obj) {
    let value = obj[key];
    let newKey = current ? current + "." + key : key; // joined key with dot
    if (value && typeof value === "object") {
      toDotNotation(value, res, newKey); // it's a nested object, so do it again
    } else {
      res[newKey] = value; // it's not an object, so set the property
    }
  }
  return res;
}

const toPairs = (obj: object) => {
  const out = {};

  if (!obj) return out;

  for (const key in obj) {
    const value = obj[key];
    set(out, key, value);
  }

  return out;
};

export const sortLocales = (locales: string[], defaultLocale: string) => {
  const data = new Set(locales);
  data.delete(defaultLocale);

  return [...Array.from(data), defaultLocale];
};

export { translateText, processLocale, toDotNotation };

const getText = (data: string | Function, locale: any) => {
  if (typeof data === "function")
    return {
      text: data(locale),
      isFunction: true,
    };
  return {
    text: data,
    isFunction: false,
  };
};

export const customTranslation = <T = any>(
  data: Partial<Omit<Record<Locales, string>, "en">> & {
    en: string;
    default?: Locales;
  }
) => {
  return ((locale: Locales, defaultLocale: Locales = "en") => {
    return (
      data[data.default ?? locale] ??
      data[defaultLocale] ??
      data[data.default ?? "en"]
    );
  }) as T;
};
