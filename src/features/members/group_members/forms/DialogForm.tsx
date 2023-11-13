import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import { useState } from "react";
import Button from "@mui/material/Button";

const HandleDialog = (props: {
  isOpen: boolean;
  handleClose(): void;
  handleDelete(): void;
}) => {
  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose}>
        <DialogContent>
          <DialogContentText> The user is being deleted </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>

          <Button
            onClick={() => {
              props.handleDelete();
              props.handleClose();
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export { HandleDialog };
