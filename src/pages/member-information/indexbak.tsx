import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { Group } from "@models/access/groups";
import Iconify from "components/Iconify";
import Page from "components/Page";
import { membersUrls } from "features/members/urls";
import UserStatusLabel from "features/access/users/UserStatusLabel";



import { useHasPermissions } from "hooks/useHasPermissions";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { reduxGetAllMembers } from "store/actions/members/members";
import { selectAllMembers } from "store/selectors/members/members";
import serverSideTranslations from "utils/serversideTranslations"
import { useTranslate } from "utils/useTranslation";


const RenderActions = ({ id }: GridRenderCellParams<Group>) => {
  const { push } = useRouter();

  const hasEditPermissions = useHasPermissions("change_groups");
  const hasDeletePermissions = useHasPermissions("delete_groups");

  return (
    <Stack direction="row" justifyContent="end" flex={1}>
      {hasEditPermissions && ( // Only render the edit icon if the user has edit permissions
        <IconButton onClick={() => push(membersUrls.editMember(id as string))}>
          <Iconify icon="eva:edit-outline" />
        </IconButton>
      )}
    {/*  {hasDeletePermissions && ( // Only render the edit icon if the user has edit permissions
        <IconButton onClick={() => push(accessUrls.memberDetail(id as string))}>
          <Iconify icon="eva:eye-outline" />
        </IconButton>
      )}*/}
      <IconButton onClick={() => push(membersUrls.memberPayment(id as string))}>
          Initiate Payment
        </IconButton>
    </Stack>
  );
};

const columns = (): GridColDef[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return [
    {
      field: "gender",
      headerName: translate("members", "columns.gender"),
      flex: 1,
    },
    {
      field: "marital_status",
      headerName: translate("members", "columns.marital_status"),
      flex: 1,
    },
    {
      field: "phone_no",
      headerName: translate("members", "columns.phone_no"),
      flex: 1,
    },
     {
      field: "status",
      align: "center",
      headerAlign: "center",
      headerName: translate("members", "columns.status"),
      renderCell(params) {
        return <UserStatusLabel status={params.value} />;
      },
    },
  ];
};

const MemberInformation: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { data, loading } = useSelector(selectAllMembers);
  const translate = useTranslate();

  const onCreateClick = useCallback(() => {
    push(membersUrls.createMember());
  }, [push]);

  useEffect(() => {
    dispatch(reduxGetAllMembers());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(reduxGetAllMembers());

  //   // Check if data has been fetched
  //   if (!data.loading) {
  //     // Data has been fetched, you can perform additional actions here
  //     console.log(data);
  //   }
  // }, [dispatch, data]);

  //const hasCreatePermissions = useHasPermissions("create_groups");
  const hasCreatePermissions = useHasPermissions("create_users");

  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button variant="contained" onClick={onCreateClick}>
            {translate("member" as any, "addMember" as any)}
          </Button>
        )}
      </Stack>

      <Paper sx={{ mt: 4 }}>
        <DataGrid
          {...{
            columns: [
              ...columns(),
              {
                field: "actions",
                headerName: "",
                renderCell: (params) => <RenderActions {...params} />,
                editable: false,
                sortable: false,
                flex: 1,
              },
            ],
            rows: data,
            loading: loading === true,
            autoHeight: true,
            disableSelectionOnClick: true,
          }}
        />
      </Paper>
    </>
  );
};

MemberInformation.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("members", "title")}>{page}</Page>
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

export default MemberInformation;
