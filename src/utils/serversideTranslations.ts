import { UserConfig } from "next-i18next";
import { serverSideTranslations as i18nserverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Namespaces } from "../../translations";

const serverSideTranslations = async (
  locale: string,
  _namespaces: Namespaces[],
  config?: UserConfig | undefined,
  extraLocales?: string[] | false
) => {
  const namespaces = Array.from(
    new Set(["common", "navigation", ..._namespaces])
  );

  // Reload resources on every render
  if (process.env.NODE_ENV === "development") {
    const i118 = await import("next-i18next");
    i118.i18n?.loadResources();
  }
  const response = await i18nserverSideTranslations(
    locale,
    namespaces,
    config,
    extraLocales
  );

  return response;
};

export const useReloadRouteOnFilesChange = (a = null) => {
  if (!a) return;

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const timer = setInterval(() => {
        router.replace(router.asPath, undefined, {
          scroll: false,
        });
      }, 5000);
      return () => clearTimeout(timer);
    });
  }
};

export default serverSideTranslations;
