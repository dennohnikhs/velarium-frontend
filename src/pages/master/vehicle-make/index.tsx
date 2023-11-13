import { VehicleMake } from "@models/master";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { isRejected } from "@reduxjs/toolkit";
import { ConfirmDialog, ConfirmDialogRef } from "components/ConfirmDialog";
import Iconify from "components/Iconify";
import Page from "components/Page";
import {
  VehicleMakeDialog,
  VehicleMakeDialogRef,
} from "features/master/forms/vehicle-make";
import { useHasPermissions } from "hooks/useHasPermissions";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxDeleteVehicleMake,
  reduxGetVehicleMakes,
} from "store/actions/master/vehicle-makes";
import { selectVehicleMakes } from "store/selectors/master/vehicle-make";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const VehicleMakePage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const vehicleMakes = useSelector(selectVehicleMakes);
  const vehicleDialogRef = useRef<VehicleMakeDialogRef>(null);
  const translate = useTranslate();

  useEffect(() => {
    if (!vehicleMakes.loading) dispatch(reduxGetVehicleMakes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_vehicle_make");

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button
            variant="contained"
            onClick={() => vehicleDialogRef.current.open()}
          >
            {translate("vehicle-make", "addMake")}
          </Button>
        )}

        <VehicleMakeDialog ref={vehicleDialogRef} />
      </Stack>

      <Paper sx={{ mt: 3 }}>
        <DataGrid
          autoHeight
          {...{
            columns: [
              {
                field: "name",
                headerName: translate("vehicle-make", "columns.name"),
                flex: 1 / 2,
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
                      vehicleMake={params.row}
                      {...{ vehicleDialogRef }}
                    />
                  );
                },
              },
            ],
            rows: vehicleMakes.data,
            loading: vehicleMakes.loading,
          }}
        />
      </Paper>
    </>
  );
};

const TableActions = ({
  vehicleMake,
  vehicleDialogRef,
}: {
  vehicleMake: VehicleMake;
  vehicleDialogRef: MutableRefObject<VehicleMakeDialogRef>;
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const ref = useRef<ConfirmDialogRef>(null);

  const onEditClick = useCallback(() => {
    vehicleDialogRef.current?.open({
      id: vehicleMake.id,
      name: vehicleMake.name,
    });
  }, [vehicleDialogRef, vehicleMake.id, vehicleMake.name]);

  const onDeleteClick = () => {
    dispatch(reduxDeleteVehicleMake(vehicleMake.id)).then((response) => {
      isRejected(response)
        ? enqueueSnackbar("Failed to delete vehicle make", { variant: "error" })
        : enqueueSnackbar("Vehicle make deleted successfully");
    });

    ref.current?.close();
  };

  const hasEditPermissions = useHasPermissions("change_vehicle_make");
  const hasDeletePermissions = useHasPermissions("delete_vehicle_make");

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

VehicleMakePage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();

  return (
    <DashboardLayout>
      <Page title={translate("vehicle-make", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["vehicle-make"])),
    },
  };
};

export default VehicleMakePage;
