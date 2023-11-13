import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";

import Page from "components/Page";
import { membersUrls } from "features/members/urls";
import UserStatusLabel from "features/access/users/UserStatusLabel";
import InitiateDialog from "features/members/members/forms/InitiateDialog";
import { CreatePaymentPayload } from "@models/api/master";
import { reduxAddPayment } from "store/actions/master/payment";

import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";

import { useHasPermissions } from "hooks/useHasPermissions";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { reduxGetAllMembers } from "store/actions/members/members";
import { selectAllMembers } from "store/selectors/members/members";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";
import { User } from "@models/access/users";
import { Label } from "@mui/icons-material";
import { Chip } from "@mui/material";

// const RenderActions = ({ id }: GridRenderCellParams<Group>) => {
//   const { push } = useRouter();

//   const hasEditPermissions = useHasPermissions("change_groups");
//   const hasDeletePermissions = useHasPermissions("delete_groups");

//   return (
//     <Stack direction="row" justifyContent="end" flex={1}>
//       {hasEditPermissions && ( // Only render the edit icon if the user has edit permissions
//         <IconButton onClick={() => push(membersUrls.editMember(id as string))}>
//           <Iconify icon="eva:edit-outline" />
//         </IconButton>
//       )}
//     {/*  {hasDeletePermissions && ( // Only render the edit icon if the user has edit permissions
//         <IconButton onClick={() => push(accessUrls.memberDetail(id as string))}>
//           <Iconify icon="eva:eye-outline" />
//         </IconButton>
//       )}*/}
//       <IconButton onClick={() => push(membersUrls.memberPayment(id as string))}>
//           Initiate Payment
//         </IconButton>
//     </Stack>
//   );
// };

const UserTableActions = ({
  user,
  onInitiate,
}: {
  user: User;
  onInitiate: (userId: string) => void;
}) => {
  return (
    <Stack direction="row" sx={{ textAlign: "center", alignItems: "center" }}>
      {user.registration_fee_status === "NOT PAID" ? (
        <Button onClick={() => onInitiate(user.id)}>Pay Reg Fee</Button>
      ) : (
        <Stack direction="row" spacing={1}>
          <Chip size="small" label="PAID" color="success" />
        </Stack>
      )}
      {/*<Button onClick={() => onInitiate(user.id)}>Initiate Payment</Button>*/}
    </Stack>
  );
};

const columns = (): GridColDef[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return [
    {
      field: "user.user",
      headerName: "Full Name",
      renderCell(params) {
        return `${params?.row.user?.first_name} ${params?.row.user?.last_name}`;
      },
      flex: 1,
    },
    {
      field: "gender",
      headerName: translate("members", "columns.gender"),

      flex: 1,
    },
    {
      field: "email",
      headerName: translate("members", "columns.email"),
      renderCell(params) {
        return `${params?.row.user?.email}`;
      },
      flex: 1,
    },
    {
      field: "registration_fee_status",
      headerName: translate("members", "columns.registration_fee_status"),
      flex: 1,
    },
    {
      field: "phone_no",
      headerName: translate("members", "columns.phone_no"),
      flex: 1,
    },
    {
      field: "monthly_contribution",
      headerName: translate("members", "columns.monthly_contribution"),
      flex: 1,
    },
    {
      field: "member_location.name",
      headerName: "Location",
      renderCell(params) {
        return `${params?.row.member_location?.name}`;
      },
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

  const [initiateDialogOpen, setInitiateDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleInitiateClick = (userId) => {
    setSelectedUserId(userId);
    setInitiateDialogOpen(true);
  };

  const handleCloseInitiateDialog = () => {
    setInitiateDialogOpen(false);
  };

  const handleInitiateAction = () => {
    const data: CreatePaymentPayload = {
      member_id: selectedUserId,
    };
    const action = reduxAddPayment;

    return dispatch(
      action({
        ...data,
      })
    ).then((payload) => {
      if (isRejected(payload)) {
        if (isRejectedWithValue(payload)) {
          console.log("FORM ERRORS", payload);
        }
      } //else replace(accessUrls.groupListCreate());
    });

    //console.log("Initiating action for user with ID:", selectedUserId);

    handleCloseInitiateDialog();
  };

  const onCreateClick = useCallback(() => {
    push(membersUrls.createMember());
  }, [push]);

  useEffect(() => {
    dispatch(reduxGetAllMembers());
  }, [dispatch]);

  //const hasCreatePermissions = useHasPermissions("create_groups");
  const hasCreatePermissions = useHasPermissions("create_users");

  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button variant="contained" onClick={onCreateClick}>
            Add Member
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
                headerName: "Reg Fee Status",
                renderCell: (params) => (
                  <UserTableActions
                    user={params.row}
                    onInitiate={handleInitiateClick}
                  />
                ),
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
      <InitiateDialog
        open={initiateDialogOpen}
        onClose={handleCloseInitiateDialog}
        onInitiate={handleInitiateAction}
        userId={selectedUserId}
      />
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
