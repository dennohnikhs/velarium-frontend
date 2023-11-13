import { KeyPrefix, TOptions } from "i18next";
import {
  useTranslation as usei18nTranslation,
  UseTranslationResponse,
} from "react-i18next";
import { Namespaces, NamespacesObj } from "../../translations";

type DefaultType = UseTranslationResponse<Namespaces, KeyPrefix<Namespaces>>;

type Returns = Omit<DefaultType, "t"> &
  Record<
    "t" | "translate",
    <T extends Namespaces>(
      namespace: T,
      text: Join<DotNotation<NamespacesObj[T]>, ".">,
      options?: TOptions
    ) => ReturnType<DefaultType["t"]>
  >;

const useTranslation = () => {
  const translation = usei18nTranslation<Namespaces>();

  const translate: Returns["t"] = (namespace, text, options) => {
    return translation.t(`${namespace}:${(text ?? "") as any}`, {
      ...options,
    });
  };

  return {
    ...translation,
    t: translate,
    translate,
  } as Returns;
};

export const useTranslate = () => {
  const translation = useTranslation();

  return translation.t;
};

export default useTranslation;
