import { Color } from "@mui/material/colors";
import { NextPage } from "next";
import type { AppProps } from "next/app";

declare global {
  export type FunctionComponent<P> = React.FunctionComponent<P>;
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout(page: React.ReactNode): React.ReactElement;
  };

  export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };

  export type ColorMode = "dark" | "light";

  export type ColorPalette = Record<ColorMode, Color>;

  export type Optional<T> = null | undefined | T;

  export type FieldDescriptionType = string;

  export type Loading = boolean | "error";

  export type { CSSObject };

  export type PageInfo = {
    page: number;
    has_next: boolean;
    has_previous: boolean;
    count: number;
  };

  export type StateRef = {
    page: number;
  };

  export type StateRefObject = Record<string, StateRef | null>;

  export type DotNotation<T> = T extends string
    ? []
    : {
        [K in keyof T]: [K, ...DotNotation<T[K]>];
      }[keyof T];

  export type Join<
    T extends (string | number)[],
    D extends string
  > = T extends []
    ? never
    : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
    ? F extends string
      ? `${F}${D}${Join<Extract<R, string[]>, D>}`
      : never
    : string;
}

export {};
