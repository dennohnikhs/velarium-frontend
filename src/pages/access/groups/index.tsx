import { Group } from "@models/access/groups";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Iconify from "components/Iconify";
import Page from "components/Page";
import { accessUrls } from "features/access/urls";
import { useHasPermissions } from "hooks/useHasPermissions";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetAllGroups } from "store/actions/access/groups";
import { selectAllGroups } from "store/selectors/access/groups";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const RenderActions = ({ id }: GridRenderCellParams<Group>) => {
  const { push } = useRouter();

  const hasEditPermissions = useHasPermissions("change_groups");
  const hasDeletePermissions = useHasPermissions("delete_groups");

  return (
    <Stack direction="row" justifyContent="end" flex={1}>
      {hasEditPermissions && ( // Only render the edit icon if the user has edit permissions
        <IconButton onClick={() => push(accessUrls.editGroup(id as string))}>
          <Iconify icon="eva:edit-outline" />
        </IconButton>
      )}
      {hasDeletePermissions && ( // Only render the edit icon if the user has edit permissions
        <IconButton onClick={() => push(accessUrls.groupDetail(id as string))}>
          <Iconify icon="eva:eye-outline" />
        </IconButton>
      )}
    </Stack>
  );
};

const columns = (): GridColDef[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return [
    {
      field: "name",
      headerName: translate("groups", "columns.name"),
      flex: 1,
    },
    {
      field: "description",
      headerName: translate("groups", "columns.description"),
      flex: 1,
    },
  ];
};

const GroupList: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { data, loading } = useSelector(selectAllGroups);
  const translate = useTranslate();

  const onCreateClick = useCallback(() => {
    push(accessUrls.createGroup());
  }, [push]);

  useEffect(() => {
    dispatch(reduxGetAllGroups());
  }, [dispatch]);

  const hasCreatePermissions = useHasPermissions("create_groups");

  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button variant="contained" onClick={onCreateClick}>
            {translate("groups", "addGroup")}
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

GroupList.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("groups", "title")}>{page}</Page>
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

export default GroupList;
