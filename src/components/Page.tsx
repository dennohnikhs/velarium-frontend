import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { memo, useMemo } from "react";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

const Page: FunctionComponent<PageProps> = ({
  children,
  title: titleText,
  override,
  breadcrumbs,
  disableTitle,
  disableContainer,
}) => {
  const _title = useMemo(() => {
    if (!titleText) return "VT";
    if (!override) return `VT | ${titleText}`;

    return titleText;
  }, [override, titleText]);

  const headerChildren = useMemo(() => {
    return (
      <>
        {!!_title && (
          <Head>
            <title>{_title}</title>
          </Head>
        )}
        {((!disableTitle && !!titleText) || breadcrumbs?.length > 0) && (
          <Typography variant="h4">
            {titleText ?? breadcrumbs?.[breadcrumbs?.length ?? 0].title ?? null}
          </Typography>
        )}

        {!!breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </>
    );
  }, [_title, breadcrumbs, disableTitle, titleText]);

  if (disableContainer)
    return (
      <>
        {headerChildren}

        {children}
      </>
    );

  return (
    <Container maxWidth={"xl"} sx={{ height: "100%" }}>
      {headerChildren}

      {children}
    </Container>
  );
};

type PageProps = {
  children: React.ReactNode;
  title?: string | null | undefined;
  override?: boolean;
  disableTitle?: boolean;
  disableContainer?: boolean;

  breadcrumbs?: BreadcrumbItem[];
};

export default memo(Page);
