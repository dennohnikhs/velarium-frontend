import { VehicleModel } from "@models/master";
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
  VehicleModelDialog,
  VehicleModelDialogRef,
} from "features/master/forms/vehicle_model";
import { useHasPermissions } from "hooks/useHasPermissions";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxDeleteVehicleModel,
  reduxGetVehicleModels,
} from "store/actions/master/vehicle-model";
import { selectVehicleModels } from "store/selectors/master/vehicle-model";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const VehicleModelPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const vehicleModels = useSelector(selectVehicleModels);
  const vehicleModelRef = useRef<VehicleModelDialogRef>(null);
  const translate = useTranslate();

  const _columns: GridColDef<VehicleModel>[] = [
    {
      field: "name",
      headerName: translate("models", "columns.name"),
      flex: 1,
    },
    {
      field: "make",
      headerName: translate("models", "columns.make"),
      valueGetter: (params) => params.row.make.name,
      flex: 1,
    },
    {
      field: "actions",
      renderHeader: null,
      headerName: "",
      disableExport: true,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell(params) {
        return (
          <TableActions vehicleModel={params.row} {...{ vehicleModelRef }} />
        );
      },
    },
  ];

  useEffect(() => {
    if (!vehicleModels.loading) dispatch(reduxGetVehicleModels());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_vehicle_model");

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button
            variant="contained"
            onClick={() => vehicleModelRef.current?.open()}
          >
            {translate("models", "addModel")}
          </Button>
        )}

        <VehicleModelDialog ref={vehicleModelRef} />
      </Stack>

      <Paper sx={{ mt: 3 }}>
        <DataGrid
          autoHeight
          {...{
            columns: [..._columns],
            rows: vehicleModels.data,
            loading: vehicleModels.loading,
          }}
        />
      </Paper>
    </>
  );
};

const TableActions = ({
  vehicleModel,
  vehicleModelRef,
}: {
  vehicleModel: VehicleModel;
  vehicleModelRef: MutableRefObject<VehicleModelDialogRef>;
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const ref = useRef<ConfirmDialogRef>(null);
  const onEditClick = useCallback(() => {
    vehicleModelRef.current.open({
      id: vehicleModel.id,
      name: vehicleModel.name,
      make_id: vehicleModel.make_id,
    });
  }, [
    vehicleModel.id,
    vehicleModel.make_id,
    vehicleModel.name,
    vehicleModelRef,
  ]);

  const onDeleteClick = () => {
    dispatch(reduxDeleteVehicleModel(vehicleModel.id)).then((response) => {
      isRejected(response)
        ? enqueueSnackbar("Failed to delete vehicle model", {
            variant: "error",
          })
        : enqueueSnackbar("Vehicle model deleted successfully");
    });
    ref.current.close();
  };

  const hasEditPermissions = useHasPermissions("change_vehicle_model");
  const hasDeletePermissions = useHasPermissions("delete_vehicle_model");

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

VehicleModelPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();

  return (
    <DashboardLayout>
      <Page title={translate("models", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["models"])),
    },
  };
};

export default VehicleModelPage;
