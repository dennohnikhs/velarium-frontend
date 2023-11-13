import _formatDate from "date-fns/format";
import * as DfnsLocale from "date-fns/locale";
import { useRouter } from "next/router";
const dfnsLocale: typeof DfnsLocale = require("date-fns/locale");

export function fDate(date: string | number) {
  const today = new Date(date);

  const _date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const time = today.getHours() + ":" + today.getMinutes();

  const dateTime = `${_date} ${time}`;

  return dateTime;
}

export const formatDate = (
  date: Date | number | string,
  { format, ...options }: FormatDateOptions = {
    format: defaultFormat,
  }
) => {
  if (!date) return "-";
  const _date = typeof date === "object" ? date : new Date(date);
  try {
    return _formatDate(new Date(_date), format, options);
  } catch (e) {
    return _date?.toString();
  }
};

export const useDateFormat = (): FormatDate => {
  const { locale, defaultLocale } = useRouter();
  const _locale = getLocale(locale ?? defaultLocale);

  return (date, options) =>
    formatDate(date, {
      format: defaultFormat,
      ...options,
      ...(_locale && {
        locale: _locale,
      }),
    });
};

export const getLocale = (locale: string) => {
  let defaultLocale = dfnsLocale.enUS;

  for (const key in dfnsLocale) {
    if (key.startsWith(locale)) {
      defaultLocale = dfnsLocale[key];
      break;
    }
  }

  return defaultLocale;
};

const defaultFormat = "do MMM Y HH:mm";

export type FormatDate = typeof formatDate;
export type FormatDateOptions = {
  format: string;
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
};
