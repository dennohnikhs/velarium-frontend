const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "sw"],
    localeDetection: true,
    reloadOnPrerender: process.env.NODE_ENV === "development",
  },
};

module.exports = config;
