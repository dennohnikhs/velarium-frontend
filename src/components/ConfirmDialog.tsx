import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Iconify from "components/Iconify";
import { forwardRef, useImperativeHandle, useState } from "react";

export const ConfirmDialog = forwardRef<ConfirmDialogRef, ConfirmDialogProps>(
  function ConfirmDialog({ onConfirm }, ref) {
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
      setOpen(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
      }),
      []
    );

    return (
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <Stack alignItems="center">
            <IconButton color="warning">
              <Iconify icon="ion:warning-outline" fontSize={48} />
            </IconButton>
            <Typography variant="subtitle2">
              Proceed with this action?
            </Typography>
          </Stack>
          <Stack mt={1} direction="row" justifyContent="center">
            <IconButton color="error" onClick={handleClose}>
              <Iconify icon="carbon:close-outline" fontSize={32} />
            </IconButton>
            <IconButton color="success" onClick={onConfirm}>
              <Iconify icon="line-md:confirm-circle" fontSize={32} />
            </IconButton>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
);

type ConfirmDialogProps = {
  onConfirm: VoidFunction;
};

export type ConfirmDialogRef = {
  open?: VoidFunction;
  close?: VoidFunction;
};
