const excludeProps =
  (propNames: (string | number)[]) => (propName: string | number) =>
    !propNames.includes(propName);

const date = new Date();
export const addPadding = (val: string | number, padding = 2): string => {
  const value = val.toString();

  return value.padStart(padding, "0");
};

const simulateClock = (time: number) => {
  date.setHours(0, 0, time, 0);

  const mins = date.getMinutes();
  const secs = date.getSeconds();

  return `${addPadding(mins)}:${addPadding(secs)}`;
};

type JoinStringParams = string | null | undefined | number;

const getPrefix = (..._prefix: JoinStringParams[]) => {
  const prefix = joinStringsWithDot(..._prefix);

  return (...params: JoinStringParams[]) =>
    joinStringsWithDot(prefix, ...params);
};

const joinStringsWithDot = (...data: JoinStringParams[]): string =>
  [...data.filter((a) => a == 0 || !!a)].join(".");

const buildUrl = (
  root: string | URL,
  options?: {
    params: Record<string, string | number>;
  }
) => {
  const url = new URL(root, window.location.origin);

  if (options.params) {
    for (let param in options.params) {
      let val = options.params[param];
      url.searchParams.append(param, val?.toString());
    }
  }

  return url.toString();
};

const maskEmail = (mail: string | null | undefined): string | null => {
  if (!mail) return null;
  const index = mail.lastIndexOf("@");
  const prefix = mail.substring(0, index);
  const postfix = mail.substring(index);

  const mask = prefix
    .split("")
    .map(function (o, i) {
      if (i == 0 || i == index - 1) {
        return o;
      } else {
        return "*";
      }
    })
    .join("");

  return mask + postfix;
};

export {
  buildUrl,
  excludeProps,
  getPrefix,
  joinStringsWithDot,
  maskEmail,
  simulateClock,
};
