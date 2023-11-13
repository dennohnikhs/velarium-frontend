import Page from "components/Page";
import { GroupsFormStepper } from "features/access/groups/forms/GroupsFormStepper";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetAllPermissions } from "store/actions/access/permissions";
import { selectGroupById } from "store/selectors/access/groups";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const EditUserGroupPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  let group_id = "";
  const router = useRouter();
  const pathname = router.asPath; // Get the full path including the query string
  const parts = pathname.split("/"); // Split the path by "/"
  group_id = parts[3]; // The UUID is at index 4 in the path parts

  const { group } = useSelector(selectGroupById(`${group_id}`));

  useEffect(() => {
    dispatch(reduxGetAllPermissions());
  }, [dispatch]);

  return (
    <Page title={`${translate("groups", "edit.name")}: ${group?.name ?? "..."} - Edit`}>
      <GroupsFormStepper {...{ group }} />
    </Page>
  );
};

EditUserGroupPage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["groups"])),
    },
  };
};

export default EditUserGroupPage;
