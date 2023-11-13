// import TabsComponent from "components/Tabs";
// import tabs from "features/configurations/tabs";
import DashboardLayout from "layouts/dashboard/DashboardLayout";

const AccessPage: NextPageWithLayout = () => {
  return (
    <>
      {/* <TabsComponent tabs={tabs} /> */}
    </>
  );
};

AccessPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccessPage;
