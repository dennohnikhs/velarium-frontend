import { EntityMapping } from "@models/master";
import { Business } from "@models/master/entity-lines-of-business";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isRejected } from "@reduxjs/toolkit";
import { ConfirmDialog, ConfirmDialogRef } from "components/ConfirmDialog";
import Iconify from "components/Iconify";
import Page from "components/Page";
import EntityMappingDialog, {
  EntityMappingDialogRef,
} from "features/master/forms/entity-mapping";
import useAuth from "hooks/useAuth";
import { useHasPermissions } from "hooks/useHasPermissions";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxDeleteEntityMapping,
  reduxGetEntityMappings,
} from "store/actions/master/entity-mappings";
import { selectEntityMappings } from "store/selectors/master/entity-mappings";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const EntityMappingsPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const entityMappings = useSelector(selectEntityMappings);
  const entityMappingDialogRef = useRef<EntityMappingDialogRef>(null);
  const translate = useTranslate();
  const { user } = useAuth();
  const insurance_id = user.entity[0]?.id;

  const _columns: GridColDef<EntityMapping>[] = [
    {
      field: "insurance.name",
      headerName: translate("entity-mappings", "columns.insurance_name"),
      flex: 1,
      valueGetter: ({ row }) => row.insurance?.name,
    },
    {
      field: "intermediary.name",
      headerName: translate("entity-mappings", "columns.intermediary_name"),
      flex: 1,
      valueGetter: ({ row }) => row.intermediary?.name,
    },
    {
      field: "businesses",
      headerName: translate("entity-mappings", "columns.business"),
      valueFormatter: ({ value }: { value: Business[] }) => {
        const businessNames = value?.map(
          (business) => business.name
        );
        return businessNames.join(", ");
      },
      flex: 1,
    },
    {
      field: "actions",
      renderHeader: null,
      headerName: "",
      align: "center",
      disableExport: true,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell(params) {
        return <TableActions entityMapping={params.row} />;
      },
    },
  ];

  useEffect(() => {
    if (!entityMappings.loading)
      dispatch(reduxGetEntityMappings({ insurance_id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_entity_mapping");

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
        {hasCreatePermissions && ( // Only render the add icon if the user has add permissions
          <Button
            variant="contained"
            onClick={() => entityMappingDialogRef.current?.open()}
          >
            {translate("entity-mappings", "attachIntermediaryButton")}
          </Button>
        )}

        <EntityMappingDialog ref={entityMappingDialogRef} />
      </Stack>

      <Paper sx={{ mt: 3 }}>
        <DataGrid
          autoHeight
          {...{
            columns: [..._columns],
            rows: entityMappings.data,
            loading: entityMappings.loading,
          }}
        />
      </Paper>
    </>
  );
};

const TableActions = ({ entityMapping }: { entityMapping: EntityMapping }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const ref = useRef<ConfirmDialogRef>(null);

  const onDeleteClick = () => {
    dispatch(reduxDeleteEntityMapping(entityMapping.id)).then((response) => {
      isRejected(response)
        ? enqueueSnackbar("Failed to delete entity mapping", {
            variant: "error",
          })
        : enqueueSnackbar("Entity mapping deleted successfully");
    });
    ref.current.close();
  };

  const hasDeletePermissions = useHasPermissions("delete_entity_mapping");

  return (
    <>
      <Stack direction="row">
        {hasDeletePermissions && ( // Only render the delete icon if the user has delete permissions
          <IconButton color="error" onClick={() => ref.current?.open()}>
            <Iconify icon="fluent:delete-28-regular" />
          </IconButton>
        )}
      </Stack>
      <ConfirmDialog {...{ ref, onConfirm: onDeleteClick }} />
    </>
  );
};

EntityMappingsPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("entity-mappings", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["entity-mappings"])),
    },
  };
};

export default EntityMappingsPage;
