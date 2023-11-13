/* eslint-disable react-hooks/rules-of-hooks */
import { GroupMember } from "@models/access/groups";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { isRejected } from "@reduxjs/toolkit";
import Iconify from "components/Iconify";
import Page from "components/Page";
import { HandleDialog } from "features/access/group_members/forms/DialogForm";
import {
  GroupMemberForm,
  GroupMemberFormDialogRef,
} from "features/access/group_members/forms/GroupMemberForm";
import useNotifications from "hooks/useNotifications";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxDeleteGroupMember,
  reduxGetGroupMembers,
} from "store/actions/access/groupMembers";
import {
  selectGroupMemberLoading,
  selectGroupMembers,
} from "store/selectors/access/groupMembers";
import { selectGroupById } from "store/selectors/access/groups";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const RenderActions = ({ id }: GridRenderCellParams<GroupMember>) => {
  const [isOpen, setisOpen] = useState(false);
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();

  const handleClose = () => {
    setisOpen(false);
  };

  const handleOpen = () => {
    setisOpen(true);
  };

  const handleDelete = () => {
    return dispatch(
      reduxDeleteGroupMember({
        group_id: query?.id as string,
        user_id: id as string,
      })
    ).then((payload) => {
      if (isRejected(payload)) {
        const msg = `Failed to delete user`;
        enqueueSnackbar(msg, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(`User deleted successfuly`, {
          variant: "success",
        });
      }
    });
  };

  return (
    <Stack direction="row" justifyContent="end" flex={1}>
      <HandleDialog
        isOpen={isOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <IconButton color="error" onClick={handleOpen}>
        <Iconify icon="mdi:delete-outline" />
      </IconButton>
    </Stack>
  );
};

const column = (): GridColDef[] => {
  const translate = useTranslate();
  return [
    {
      field: "name",
      headerName: translate("groups", "view.columns.name"),
      flex: 1,
    },
    {
      field: "username",
      headerName: translate("groups", "view.columns.username"),
      flex: 1,
    },
  ];
};
const GroupDetailPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { id } = query;
  const { group } = useSelector(selectGroupById(id as string));
  const { data } = useSelector(selectGroupMembers);
  const loading = useSelector(selectGroupMemberLoading);
  const translate = useTranslate();

  useEffect(() => {
    dispatch(reduxGetGroupMembers(id as string));
  }, [dispatch, id]);

  const formDialogRef = useRef<GroupMemberFormDialogRef>(null);

  return (
    <Page>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          onClick={() => formDialogRef.current?.open()}
        >
          {translate("groups", "view.addMember")}
        </Button>
      </Stack>
      <Typography variant="subtitle2">
        {translate("groups", "view.sub_title")} {`${group?.name ?? ""}`}
      </Typography>
      <Paper sx={{ mt: 4 }}>
        <DataGrid
          {...{
            columns: [
              ...column(),
              {
                field: "actions",
                headerName: "",
                renderCell: (params) => <RenderActions {...params} />,
                editable: false,
                sortable: false,
              },
            ],
            rows: data,
            loading: loading as boolean,
            autoHeight: true,
            disableSelectionOnClick: true,
          }}
        />
      </Paper>
      <GroupMemberForm group_id={id as string} ref={formDialogRef} user={""} />
    </Page>
  );
};
GroupDetailPage.getLayout = (page) => {
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("groups", "view.title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["groups"])),
    },
  };
};

export default GroupDetailPage;
