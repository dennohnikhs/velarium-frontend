import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useRouter } from "next/router";

import LanguageRounded from "@mui/icons-material/LanguageRounded";
import InputAdornment from "@mui/material/InputAdornment";
import { LOCALES } from "utils/constants";
import { setCookie } from "utils/cookies";

const LanguageSwitcher = () => {
  const { locales, locale, defaultLocale, query, asPath, pathname, replace } =
    useRouter();

  if (!locales?.length) return null;

  return (
    <Select
      size="small"
      value={locale ?? defaultLocale}
      onChange={(e) => {
        setCookie("NEXT_LOCALE", e.target.value);
        replace({ pathname, query }, asPath, {
          locale: e.target.value,
        });
      }}
      startAdornment={
        <InputAdornment position="start">
          <LanguageRounded />
        </InputAdornment>
      }
      renderValue={(val) => val?.toUpperCase()}
      sx={{
        mr: 1,
        "& fieldset": {
          // border: "none",
        },
      }}
    >
      {locales.map((locale) => (
        <MenuItem key={locale} value={locale}>
          {LOCALES[locale] ?? locale.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
