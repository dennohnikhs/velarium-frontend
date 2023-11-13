import PermissionsConsumer from "components/PermissionsConsumer";
import DashboardLayout from "layouts/dashboard/DashboardLayout";

const AccessPage: NextPageWithLayout = () => {
  return (
    <PermissionsConsumer {...{ permissions: ["view_users"], statusCode: 403 }}>
    </PermissionsConsumer>
  );
};

AccessPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccessPage;