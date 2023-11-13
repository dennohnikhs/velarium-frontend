import { Entity } from "@models/master";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Iconify from "components/Iconify";
import Page from "components/Page";
import StatusLabel from "components/StatusLabel";
import AddEntityDialog, {
  AddEntityDialogRef,
} from "features/master/forms/entity/add-entity";
import EditEntityDialog, {
  EditEntityDialogRef,
} from "features/master/forms/entity/edit-entity";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetEntities } from "store/actions/master/entity";
import { selectEntities } from "store/selectors/master/entity";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";
import { maskEmail } from "utils/functions";

const EntitiesPage: NextPageWithLayout = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const entities = useSelector(selectEntities);
  const editEntityDialogRef = useRef<EditEntityDialogRef>(null);
  const addEntityDialogRef = useRef<AddEntityDialogRef>(null);

  const _columns: GridColDef<Entity>[] = [
    {
      field: "name",
      headerName: translate("entity", "columns.name"),
      flex: 1,
    },
    {
      field: "email",
      headerName: translate("entity", "columns.email"),
      valueFormatter: ({ value }) => maskEmail(value) ?? "-",
      flex: 1,
    },
    {
      field: "physical_address",
      headerName: translate("entity", "columns.address"),
      flex: 1,
    },
    {
      field: "status",
      headerName: translate("entity", "columns.status"),
      renderCell(params) {
        return <StatusLabel status={params.value} />;
      },
    },
    {
      field: "actions",
      align: "center",
      renderHeader: null,
      headerName: "",
      disableExport: true,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell(params) {
        return (
          <TableActions entity={params.row} {...{ editEntityDialogRef }} />
        );
      },
    },
  ];

  useEffect(() => {
    if (!entities.loading) dispatch(reduxGetEntities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => addEntityDialogRef.current?.open()}
        >
          {translate("entity", "addButton")}
        </Button>

        <AddEntityDialog ref={addEntityDialogRef} />
        <EditEntityDialog ref={editEntityDialogRef} />
      </Stack>

      <Paper sx={{ mt: 3 }}>
        <DataGrid
          autoHeight
          {...{
            columns: [..._columns],
            rows: entities.data,
            loading: entities.loading,
          }}
        />
      </Paper>
    </>
  );
};

const TableActions = ({
  entity,
  editEntityDialogRef,
}: {
  entity: Entity;
  editEntityDialogRef: MutableRefObject<EditEntityDialogRef>;
}) => {
  const onEditClick = useCallback(() => {
    editEntityDialogRef.current?.open({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      physical_address: entity.physical_address,
    });
  }, [
    editEntityDialogRef,
    entity.email,
    entity.id,
    entity.name,
    entity.physical_address,
  ]);

  return (
    <>
      <Stack direction="row">
        <Button color="primary" onClick={onEditClick}>
          <Iconify icon="eva:edit-outline" sx={{ fontSize: 16 }} />
        </Button>
      </Stack>
    </>
  );
};

EntitiesPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("entity", "title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["entity"])),
    },
  };
};

export default EntitiesPage;
