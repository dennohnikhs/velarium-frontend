import { LineOfBusiness } from "@models/master";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isRejected } from "@reduxjs/toolkit";
import { ConfirmDialog, ConfirmDialogRef } from "components/ConfirmDialog";
import Iconify from "components/Iconify";
import Page from "components/Page";
import {
  LineOfBusinessDialog,
  LineOfBusinessDialogRef,
} from "features/master/forms/line-of-business";
import useAuth from "hooks/useAuth";
import { useHasPermissions } from "hooks/useHasPermissions";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxDeleteLineOfBusiness,
  reduxGetLineOfBusinesses,
} from "store/actions/master/line-of-business";
import { selectLineOfBusinesses } from "store/selectors/master/line-of-business";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const LineOfBusinessPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const lineOfBusinesses = useSelector(selectLineOfBusinesses);
  const lineOfBusinessDialogRef = useRef<LineOfBusinessDialogRef>(null);
  const translate = useTranslate();
  const { user } = useAuth();
  const insurance_id = user.entity[0]?.id;

  const _columns: GridColDef<LineOfBusiness>[] = [
    {
      field: "name",
      headerName: translate("business", "columns.name"),
      flex: 1 / 4,
    },
    {
      field: "description",
      headerName: translate("business", "columns.description"),
      flex: 3 / 4,
    },
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
            lineOfBusiness={params.row}
            {...{ lineOfBusinessDialogRef }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (!lineOfBusinesses.loading)
      dispatch(reduxGetLineOfBusinesses({ insurance_id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_lines_of_business");

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button
            variant="contained"
            onClick={() => lineOfBusinessDialogRef.current?.open()}
          >
            {translate("business", "addLine")}
          </Button>
        )}

        <LineOfBusinessDialog ref={lineOfBusinessDialogRef} />
      </Stack>

      <Paper>
        <DataGrid
          autoHeight
          {...{
            rows: lineOfBusinesses.data,
            loading: lineOfBusinesses.loading,
            columns: [..._columns],
          }}
        />
      </Paper>
    </>
  );
};

const TableActions = ({
  lineOfBusiness,
  lineOfBusinessDialogRef,
}: {
  lineOfBusiness: LineOfBusiness;
  lineOfBusinessDialogRef: MutableRefObject<LineOfBusinessDialogRef>;
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const ref = useRef<ConfirmDialogRef>(null);

  const onEditClick = useCallback(() => {
    lineOfBusinessDialogRef.current?.open({
      id: lineOfBusiness.id,
      name: lineOfBusiness.name,
      description: lineOfBusiness.description,
    });
  }, [
    lineOfBusiness.description,
    lineOfBusiness.id,
    lineOfBusiness.name,
    lineOfBusinessDialogRef,
  ]);

  const onDeleteClick = () => {
    dispatch(reduxDeleteLineOfBusiness(lineOfBusiness?.id)).then((payload) => {
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

  const hasEditPermissions = useHasPermissions("change_lines_of_business");
  const hasDeletePermissions = useHasPermissions("delete_lines_of_business");

  return (
    <>
      <Stack direction="row">
        {hasEditPermissions && ( // Only render the edit icon if the user has edit permissions
          <IconButton color="primary" onClick={onEditClick}>
            <Iconify icon="eva:edit-outline" />
          </IconButton>
        )}
        {hasDeletePermissions && ( // Only render the edit icon if the user has edit permissions
          <IconButton color="error" onClick={() => ref.current?.open()}>
            <Iconify icon="fluent:delete-28-regular" />
          </IconButton>
        )}
      </Stack>
      <ConfirmDialog {...{ ref, onConfirm: onDeleteClick }} />
    </>
  );
};

LineOfBusinessPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("business", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["business"])),
    },
  };
};

export default LineOfBusinessPage;
