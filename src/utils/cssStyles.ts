import { alpha } from "@mui/material/styles";

const cssStyles = {
  glass(options?: GlassOptions) {
    return {
      background: alpha(options?.bg ?? "#ffffff", options?.opacity ?? 0.12),

      ...(options?.saturate > 0
        ? {
            backdropFilter: `blur(${options.blur ?? blur}px) saturate(${
              options.saturate
            }%)`,
            WebkitBackdropFilter: `blur(${options.blur ?? blur}px)  saturate(${
              options.saturate
            }%)`,
          }
        : {
            backdropFilter: `blur(${options?.blur ?? blur}px)`,
          }),

      ...(!!options && options?.border !== false
        ? {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: alpha("#ffffff", options.border?.opacity ?? 0.6),
          }
        : {
            borderWidth: 0,
          }),
    };
  },
};

const blur = 5;

type GlassOptions = {
  opacity?: number;
  blur?: number;
  bg?: string;
  border?:
    | false
    | {
        opacity?: number;
      };
  saturate?: false | number;
};
export default cssStyles;
