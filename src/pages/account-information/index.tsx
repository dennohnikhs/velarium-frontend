import { PolicyInfo } from "@models/master";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isRejected } from "@reduxjs/toolkit";
import { ConfirmDialog, ConfirmDialogRef } from "components/ConfirmDialog";
import Iconify from "components/Iconify";
import Page from "components/Page";
import ConfirmCancelDialog, {
  ConfirmCancelDialogRef,
} from "features/master/forms/ConfirmCancelDialog";
import AccountFilterForm from "features/master/forms/account-filter";
import {
  AccountInfoFormDialog,
  AccountInfoFormDialogRef,
} from "features/master/forms/account-information";
import useAuth from "hooks/useAuth";
import { useHasPermissions } from "hooks/useHasPermissions";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxDeleteLineOfBusiness } from "store/actions/master/line-of-business";
import { reduxGetAllPolicyInfo } from "store/actions/master/policy-information";
import { selectAllPolicyInfo } from "store/selectors/master/policy-information";
import { formatDate } from "utils/formatDate";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

import Box from "@mui/material/Box";
import ExportButtons from "components/Export";

const _columns = (): GridColDef<PolicyInfo>[] => {
  const translate = useTranslate();
  return [
    {
      field: "risk_id",
      headerName: translate("policy", "columns.risk_id"),
      flex: 1,
    },
    {
      field: "cert_number",
      headerName: translate("policy", "columns.cert_number"),
      flex: 1,
    },
    {
      field: "policy_holder",
      headerName: translate("policy", "columns.policy_holder"),
      flex: 1,
    },
    {
      field: "policy_number",
      headerName: translate("policy", "columns.policy_number"),
      flex: 1,
    },
    {
      field: "insurance",
      headerName: translate("policy", "columns.insurance_name"),
      flex: 2.2,
      renderCell: (params) => {
        return params.row.insurance?.name;
      },
    },
    {
      field: "intermediary",
      headerName: translate("policy", "columns.intermediary_name"),
      flex: 1,
      renderCell: (params) => {
        return params.row.intermediary?.name;
      },
    },
    {
      field: "policy_date_from",
      headerName: translate("policy", "columns.start_date"),
      flex: 1,
      valueGetter: ({ value }) => formatDate(value),
    },
    {
      field: "policy_date_to",
      headerName: translate("policy", "columns.end_date"),
      flex: 1,
      valueGetter: ({ value }) => formatDate(value),
    },
    {
      field: "status",
      headerName: translate("policy", "columns.status"),
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <PolicyStatusLabel {...params.row} />;
      },
    },
  ];
};

const AccountInfoPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const allPolicyInfo = useSelector(selectAllPolicyInfo);
  const AccountInfoFormDialogRef = useRef<AccountInfoFormDialogRef>(null);
  const translate = useTranslate();
  const { user } = useAuth();
  const entity_id = user.entity[0]?.id;

  useEffect(() => {
    if (!allPolicyInfo.loading) dispatch(reduxGetAllPolicyInfo({ entity_id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_policy_information");

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <ExportButtons
          data={allPolicyInfo.data.map((policy) => ({
            risk_id: policy.risk_id,
            cert_number: policy.cert_number,
            policy_holder: policy.policy_holder,
            policy_number: policy.policy_number,
            insurance: policy.insurance?.name,
            intermediary: policy.intermediary?.name,
            policy_date_from: formatDate(policy.policy_date_from),
            policy_date_to: formatDate(policy.policy_date_to),
            status: policy.status,
          }))}
        />

        <Box>
          {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
            <Button
              variant="contained"
              onClick={() => AccountInfoFormDialogRef.current?.open()}
            >
              {translate("account", "btn_text")}
            </Button>
          )}

          <AccountInfoFormDialog ref={AccountInfoFormDialogRef} />
        </Box>
      </Stack>

      <AccountFilterForm />

      <Paper>
        <DataGrid
          autoHeight
          {...{
            rows: allPolicyInfo.data,
            loading: allPolicyInfo.loading,
            columns: [
              ..._columns(),
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
                    <TableActions
                      policyInfo={params.row}
                      {...{ AccountInfoFormDialogRef }}
                    />
                  );
                },
              },
            ],
          }}
        />
      </Paper>
    </>
  );
};

const PolicyStatusLabel = (policy: PolicyInfo) => {
  const translate = useTranslate();
  const ref = useRef<ConfirmCancelDialogRef>(null);
  const handleClick = () => ref.current?.open();



  const checkStatus = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return translate("policy", "policy_status.active").toUpperCase();
      case "CANCELLED":
        return translate("policy", "policy_status.cancelled").toUpperCase();
      case "INVALID":
        return translate("policy", "policy_status.inactive").toUpperCase();
      case "EXPIRED":
        return translate("policy", "policy_status.expired").toUpperCase();
      case "UNINSURED":
        return translate("policy", "policy_status.uninsured").toUpperCase();
      default:
        break;
    }
  };

  const hasEditStatusPermissions = useHasPermissions("change_policy_status");

  return (
    <>
      {hasEditStatusPermissions ? (
        <Tooltip
          title={translate("policy", "dialog.fields.status_tooltip_text")}
        >
          <Chip
            size="small"
            color={policy.status === "ACTIVE" ? "success" : "error"}
            label={checkStatus(policy.status)}
            sx={{
              color: "#fff",
              padding: 2,
              fontWeight: 600,
            }}
            clickable={policy.status === "ACTIVE"}
            onClick={handleClick}
            disabled={policy.status !== "ACTIVE"}
          />
        </Tooltip>
      ) : (
        <Chip
          size="small"
          color={policy.status === "ACTIVE" ? "success" : "error"}
          label={checkStatus(policy.status)}
          sx={{
            color: "#fff",
            padding: 2,
            fontWeight: 600,
            cursor: "default", // Set the cursor to default when no onClick
          }}
        />
      )}
      <ConfirmCancelDialog {...{ ref, policy }} />
    </>
  );
};

const TableActions = ({
  policyInfo,
  AccountInfoFormDialogRef,
}: {
  policyInfo: PolicyInfo;
  AccountInfoFormDialogRef: MutableRefObject<AccountInfoFormDialogRef>;
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const ref = useRef<ConfirmDialogRef>(null);

  const onEditClick = useCallback(() => {
    AccountInfoFormDialogRef.current?.open({
      id: policyInfo.id,
      risk_id: policyInfo.risk_id,
      policy_date_from: policyInfo.policy_date_from as any as string,
      policy_date_to: policyInfo.policy_date_to as any as string,
      policy_holder: policyInfo.policy_holder,
      policy_number: policyInfo.policy_number,
    });
  }, [
    policyInfo.id,
    policyInfo.policy_date_from,
    policyInfo.policy_date_to,
    policyInfo.policy_holder,
    policyInfo.policy_number,
    policyInfo.risk_id,
    AccountInfoFormDialogRef,
  ]);

  const onDeleteClick = () => {
    dispatch(reduxDeleteLineOfBusiness(policyInfo?.id)).then((payload) => {
      if (isRejected(payload)) {
        const msg = `Failed to delete Line of business`;
        enqueueSnackbar(msg, {
          variant: "error",
        });
      } else {
        const msg = `Line of business deleted successfully`;
        enqueueSnackbar(msg);
        ref.current.close();
      }
    });
  };

  const hasEditPermissions = useHasPermissions("change_policy_information");

  return (
    <>
      <Stack direction="row">
        {hasEditPermissions && ( // Only render the edit icon if the user has edit permissions
          <IconButton color="primary" onClick={onEditClick}>
            <Iconify icon="eva:edit-outline" />
          </IconButton>
        )}

        {/*  <IconButton color="error" onClick={() => ref.current?.open()}>
          <Iconify icon="fluent:delete-28-regular" />
        </IconButton> */}
      </Stack>
      <ConfirmDialog {...{ ref, onConfirm: onDeleteClick }} />
    </>
  );
};

AccountInfoPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("account", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["account"])),
    },
  };
};

export default AccountInfoPage;
