import { User } from "@models/access/users";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { capitalCase } from "change-case";
import Iconify from "components/Iconify";
import Page from "components/Page";
import {
  UserFormDialog,
  UserFormDialogRef,
} from "features/access/users/UserForm";
import UserStatusLabel from "features/access/users/UserStatusLabel";
import { useHasPermissions } from "hooks/useHasPermissions";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetUsers } from "store/actions/access/users";
import { selectUsers } from "store/selectors/access/users";
import { maskEmail } from "utils/functions";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const getColumns = (): GridColDef<User>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return [
    {
      field: "name",
      headerName: translate("users", "columns.name"),
      flex: 1,
      valueGetter({ row }) {
        return (
          row.username ??
          capitalCase(
            [row.first_name ?? "", row.last_name ?? ""].join(" ").trim() || "-"
          )
        );
      },
    },
    {
      field: "username",
      headerAlign: "center",
      headerName: translate("users", "columns.username"),
      valueGetter(params) {
        return params.row.username ?? "-";
      },
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerAlign: "center",
      headerName: translate("users", "columns.email"),
      valueFormatter: ({ value }) => maskEmail(value) ?? "-",
      flex: 1,
      align: "left",
    },
    {
      field: "status",
      align: "center",
      headerAlign: "center",
      headerName: translate("users", "columns.status"),
      renderCell(params) {
        return <UserStatusLabel status={params.value} />;
      },
    },
  ];
};

const UserListPage: NextPageWithLayout = () => {
  const _columns = getColumns();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userFormRef = useRef<UserFormDialogRef>();
  const translate = useTranslate();

  useEffect(() => {
    if (!users.loading) dispatch(reduxGetUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_users");

  return (
    <>
      <Stack direction="row" justifyContent="end">
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button
            variant="contained"
            onClick={() => userFormRef.current?.open()}
          >
            {translate("users", "addUser")}
          </Button>
        )}

        <UserFormDialog ref={userFormRef} />
      </Stack>

      <Paper sx={{ mt: 3 }}>
        <DataGrid
          autoHeight
          {...{
            columns: [
              ..._columns,
              {
                field: "_actions",
                renderHeader: null,
                headerName: "",
                disableExport: true,
                disableColumnMenu: true,
                disableReorder: true,
                sortable: false,
                renderCell(params) {
                  return (
                    <UserTableActions user={params.row} {...{ userFormRef }} />
                  );
                },
              },
            ],
            rows: users.data,
            loading: users.loading || users.refreshing,
          }}
        />
      </Paper>
    </>
  );
};

const UserTableActions = ({
  user,
  userFormRef,
}: {
  user: User;
  userFormRef: MutableRefObject<UserFormDialogRef>;
}) => {
  const onEditClick = useCallback(() => {
    userFormRef.current?.open({
      id: user.id,
      first_name: user.first_name ?? null,
      last_name: user.last_name ?? null,
      email: user.email ?? null,
    });
  }, [user.email, user.first_name, user.id, user.last_name, userFormRef]);

  const hasEditPermissions = useHasPermissions("change_users");

  return (
    <Stack direction="row">
      {hasEditPermissions && ( // Only render the edit icon if the user has edit permissions
        <Button onClick={onEditClick}>
          <Iconify icon="eva:edit-outline" />
        </Button>
      )}
    </Stack>
  );
};

UserListPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("users", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["users"])),
    },
  };
};

export default UserListPage;
