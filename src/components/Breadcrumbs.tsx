// eslint-disable-next-line no-restricted-imports
import MuiBreadcrumbs, {
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import get from "lodash.get";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import { pxToRem } from "utils/getFontValue";

import Iconify from "./Iconify";
import NextLink from "./NextLink";

const SEP_SIZE = 6;

const isHandler = (item: BreadcrumbItem): item is BreadcrumbItemHandler =>
  typeof item === "object" && typeof item["handler"] === "function";

const isStatic = (item: BreadcrumbItem): item is BreadcrumbItemStatic =>
  typeof item === "object" && typeof item["handler"] === undefined;

const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({
  items,
  ...props
}) => (
  <RootStyles
    {...props}
    separator={
      <Iconify
        icon="ion:ellipse"
        {...{ height: SEP_SIZE, width: SEP_SIZE, color: "grey.600" }}
      />
    }
  >
    {items?.map((item, index) => (
      <RenderItem
        {...{ item, isLast: index === items.length - 1 }}
        key={item.title}
      />
    ))}
  </RootStyles>
);

const RenderItem = memo<{ item: BreadcrumbItem; isLast: boolean }>(
  function RenderItem({ item, isLast }) {
    const { query } = useRouter();

    const href = useMemo(() => {
      if (isHandler(item)) {
        const args = item.params_from_queries?.map(
          (a) => get(query, a) ?? ""
        ) as string[];

        return item.handler(...(args ?? []));
      }

      if (isStatic(item)) {
        return item.path ?? "/";
      }

      return null;
    }, [item, query]);

    if (href && !isLast) return <NextLink {...{ href }}>{item.title}</NextLink>;

    return <Typography>{item.title}</Typography>;
  }
);

const RootStyles = styled(MuiBreadcrumbs)(({ theme: { palette } }) => ({
  userSelect: "none",
  paddingTop: pxToRem(12),
  paddingBottom: pxToRem(16),

  "& a": {
    textDecoration: "none",
    textDecorationColor: palette.grey[400],
  },
  "& a:hover": {
    textDecoration: "underline",
  },
  "& .MuiTypography-root:last-of-type": {
    color: palette.grey[500],
    pointerEvents: "none",
  },
}));

/**
 * types
 */
type BreadcrumbItemHandler = {
  handler: Function;
  params_from_queries?: string[];
  title: string;
};

type BreadcrumbItemStatic = {
  path?: string;
  title: string;
};

type BreadcrumbItem = BreadcrumbItemHandler | BreadcrumbItemStatic;

type BreadcrumbsProps = Omit<MuiBreadcrumbsProps, "children"> & {
  items: BreadcrumbItem[];
};
export type {
  BreadcrumbsProps,
  MuiBreadcrumbsProps,
  BreadcrumbItem,
  BreadcrumbItemHandler,
  BreadcrumbItemStatic,
};

export default Breadcrumbs;
