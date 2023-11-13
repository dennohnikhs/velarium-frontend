import Page from "components/Page";
import Dashboard from "features/dashboard";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const DashboardPage: NextPageWithLayout = () => {
  return (
    // <PermissionsConsumer {...{ permissions: ["change_groups", "view_groups"] }}>
    <Dashboard />
    // </PermissionsConsumer>
  );
};

DashboardPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("common", "dashboard.title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default DashboardPage;
