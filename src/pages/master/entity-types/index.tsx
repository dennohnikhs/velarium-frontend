import { EntityType } from "@models/master";
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
  EntityTypeDialog,
  EntityTypeDialogRef,
} from "features/master/forms/entity-type";
import { useHasPermissions } from "hooks/useHasPermissions";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxDeleteEntityType,
  reduxGetEntityTypes,
} from "store/actions/master/entity-types";
import { selectEntityTypes } from "store/selectors/master/entity-type";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const EntityTypePage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const entityTypes = useSelector(selectEntityTypes);
  const entityDialogRef = useRef<EntityTypeDialogRef>(null);
  const translate = useTranslate();

  const _columns: GridColDef<EntityType>[] = [
    {
      field: "name",
      headerName: translate("entity-type", "columns.name"),
      flex: 1,
    },
    {
      field: "description",
      headerName: translate("entity-type", "columns.description"),
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
          <TableActions entityType={params.row} {...{ entityDialogRef }} />
        );
      },
    },
  ];

  useEffect(() => {
    if (!entityTypes.loading) dispatch(reduxGetEntityTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCreatePermissions = useHasPermissions("create_lines_of_business");

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
        {hasCreatePermissions && ( // Only render the edit icon if the user has edit permissions
          <Button
            variant="contained"
            onClick={() => entityDialogRef.current.open()}
          >
            {translate("entity-type", "addType")}
          </Button>
        )}

        <EntityTypeDialog ref={entityDialogRef} />
      </Stack>

      <Paper sx={{ mt: 3 }}>
        <DataGrid
          autoHeight
          {...{
            columns: [..._columns],
            rows: entityTypes.data,
            loading: entityTypes.loading,
          }}
        />
      </Paper>
    </>
  );
};

const TableActions = ({
  entityType,
  entityDialogRef,
}: {
  entityType: EntityType;
  entityDialogRef: MutableRefObject<EntityTypeDialogRef>;
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const ref = useRef<ConfirmDialogRef>(null);
  const onEditClick = useCallback(() => {
    entityDialogRef.current?.open({
      id: entityType.id,
      name: entityType.name,
      description: entityType.description,
    });
  }, [entityDialogRef, entityType.description, entityType.id, entityType.name]);

  const onDeleteClick = () => {
    dispatch(reduxDeleteEntityType(entityType.id)).then((response) => {
      isRejected(response)
        ? enqueueSnackbar("Failed to delete entity type", {
            variant: "error",
          })
        : enqueueSnackbar("Entity type deleted successfully");
    });
    ref.current.close();
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

EntityTypePage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("entity-type", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["entity-type"])),
    },
  };
};

export default EntityTypePage;
