const APPBAR = {
  HEIGHT: 55,
};

const COLLAPSE_WIDTH = 77;
const WIDTH = 260;
const SIDEBAR = {
  WIDTH,
  ICON_SIZE: 23,
  BUTTON_HEIGHT: 45,
  BUTTON_COLLAPSE_WIDTH: 35,
  MIN_WIDTH_FACTOR: 1.75,
  COLLAPSE_WIDTH: COLLAPSE_WIDTH,
  SUBMENU_WIDTH: -COLLAPSE_WIDTH + WIDTH,
  SHADOW: 5,
};

// validation constants
const MIN_PASSWORD_LEN = 6;
const USERNAME_REGEX = /^([a-zA-Z])([a-zA-Z0-9-_])*(?<![-.])/;

const LOCALES = {
  en: "English",
  sw: "Swahili",
  pt: "Portuguese",
};

export { APPBAR, SIDEBAR, MIN_PASSWORD_LEN, USERNAME_REGEX, LOCALES };
