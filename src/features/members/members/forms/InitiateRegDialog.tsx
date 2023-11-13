import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const InitiateDialog = ({ open, onClose, onInitiate, userId }) => {
  const handleInitiate = () => {
    onInitiate();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Initiate Payment</DialogTitle>
      <DialogContent>
        {`Initiate Payment to Complete Registration`}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleInitiate} color="primary">
          Initiate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InitiateDialog;
