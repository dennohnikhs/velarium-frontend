import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {
  cloneElement,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslate } from "utils/useTranslation";
import EntityAdminForm from "./entity-admin";
import EntityInfoForm from "./entity-info";

const AddEntityDialog = forwardRef<AddEntityDialogRef>(function AddEntityDialog(
  _,
  ref
) {
  const [entity, setEntity] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const goNext = useCallback(() => {
    handleGoNext();
  }, []);

  const handleGoNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const _steps = () => {
    const translate = useTranslate();
    return [
      {
        key: "entity",
        title: `${translate("entity", "dialog.add_title")}`,
        component: <EntityInfoForm {...{ setEntity, goNext }} />,
      },
      {
        key: "entity_admin",
        title: `${translate("entity", "dialog.add_entity_user")}`,
        component: <EntityAdminForm {...{ entity_id: entity, handleClose }} />,
      },
    ];
  };

  const steps = _steps();

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>
        {steps.map((step, index) => (index !== activeStep ? null : step.title))}
      </DialogTitle>
      <DialogContent>
        <Stepper {...{ activeStep }} sx={{ py: 2 }}>
          {steps.map((step) => (
            <Step key={step.key}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {steps.map((step, index) => {
          if (index !== activeStep) return null;

          return <Box key={index}>{cloneElement(step.component)}</Box>;
        })}
      </DialogContent>
    </Dialog>
  );
});

export type AddEntityDialogRef = {
  open: () => void;
};

export default AddEntityDialog;
