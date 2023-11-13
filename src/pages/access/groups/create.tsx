import Page from "components/Page";
import { GroupsFormStepper } from "features/access/groups/forms/GroupsFormStepper";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "store";
import { reduxGetAllPermissions } from "store/actions/access/permissions";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const GroupCreatePage: NextPageWithLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reduxGetAllPermissions());
  }, [dispatch]);

  return (
    <>
      <GroupsFormStepper
        group={{
          id: "",
          name: "",
          description: "",
          permission_ids: [],
        }}
      />
    </>
  );
};

GroupCreatePage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("groups", "addGroup")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["groups"])),
    },
  };
};

export default GroupCreatePage;
