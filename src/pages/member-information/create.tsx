import Page from "components/Page";
import { MembersFormStepper } from "features/members/members/forms/MembersFormStepper";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "store";
///change this later
import { reduxGetAllPermissions } from "store/actions/access/permissions";
///
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const MemberCreatePage: NextPageWithLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reduxGetAllPermissions());
  }, [dispatch]);

  return (
    <>
      <MembersFormStepper
        member={{
          // id: "",
          first_name: "",
          last_name: "",
          email: "",
          user_id: "",
          member_location_id: "",
          personal_id: "",
          tax_id_no: "",
          phone_no: "",
          gender: "",
          marital_status: "",
          income_source_id: "",
          monthly_contribution: "",
        }}
      />
    </>
  );
};

MemberCreatePage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("members", "addMember")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["members"])),
    },
  };
};

export default MemberCreatePage;
