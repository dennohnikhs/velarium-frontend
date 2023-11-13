import { yupResolver } from "@hookform/resolvers/yup";
import { EntityMappingPayload } from "@models/api/master";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFSelect } from "components/hook-form";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import {
  reduxGetEntities,
  reduxGetEntitiesByType,
} from "store/actions/master/entity";
import { reduxAddEntityMapping } from "store/actions/master/entity-mappings";
import { selectAuthUser } from "store/selectors/auth";
import {
  selectEntitiesByType,
  selectEntityById,
} from "store/selectors/master/entity";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";

const EntityMappingDialog = forwardRef<EntityMappingDialogRef>(
  function EntityMappingDialog(_, ref) {
    const translate = useTranslate();
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useNotifications();
    const entityId = useSelector(selectAuthUser).user?.entity[0]?.id;

    const entity = useSelector(selectEntityById(entityId));
    const businesses = entity.data?.businesses;
    const intermediaries = useSelector(selectEntitiesByType("INT")).data;
    const [selectedLineOfBusiness, setSelectedLineOfBusiness] = useState<
      string[]
    >([]);
    const intermediariesData = intermediaries.map((entity) => ({
      label: entity.name,
      value: entity.id,
    }));
    const options = {
      label: "label",
      val: "value",
      options: [...intermediariesData],
      default: {
        label: "",
        value: "",
      },
    };

    useEffect(() => {
      dispatch(reduxGetEntitiesByType("INT"));
      dispatch(reduxGetEntities());
    }, [dispatch]);

    const methods = useForm({
      defaultValues: entityMappingFormValues,
      resolver: yupResolver(entityMappingSchema),
    });

    const selectedIntermediary = methods.watch("intermediary_id");

    const handleChange = (
      event: SelectChangeEvent<typeof selectedLineOfBusiness>
    ) => {
      const {
        target: { value },
      } = event;

      const updatedSelectedLineOfBusiness =
        typeof value === "string" ? value.split(",") : value;

      setSelectedLineOfBusiness(updatedSelectedLineOfBusiness);

      methods.setValue("business_line_ids", updatedSelectedLineOfBusiness);
    };

    const handleClose = () => {
      setOpen(false);
      methods.reset();
      setSelectedLineOfBusiness([]);
    };

    const onSubmit = methods.handleSubmit((values) => {
      if (values && entityId) {
        methods.setValue("insurance_id", entityId);
        dispatch(reduxAddEntityMapping(values)).then((response) => {
          if (isRejected(response)) {
            enqueueSnackbar("Failed to map intermediary", { variant: "error" });
          } else {
            enqueueSnackbar("Mapped successfully");
            handleClose();
          }
        });
      }
    });

    return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>
          {translate("entity-mappings", "dialog.title")}
        </DialogTitle>
        <DialogContent>
          <FormProvider {...{ methods, onSubmit }}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <RHFSelect
                name="intermediary_id"
                label={translate(
                  "entity-mappings",
                  "dialog.fields.intermediary"
                )}
                options={options}
              />

              {selectedIntermediary && (
                <FormControl
                  fullWidth
                  error={!!methods.formState.errors.business_line_ids}
                >
                  <InputLabel>
                    {translate(
                      "entity-mappings",
                      "dialog.fields.line_of_business"
                    )}
                  </InputLabel>
                  <Select
                    name={"lines_business"}
                    label="Line of business"
                    value={selectedLineOfBusiness}
                    multiple
                    onChange={handleChange}
                  >
                    {businesses?.map((lob, index) => (
                      <MenuItem key={index} value={lob.insurance_lines.id}>
                        {lob.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {methods.formState.errors.business_line_ids &&
                      methods.formState.errors.business_line_ids.message}
                  </FormHelperText>
                </FormControl>
              )}

              <LoadingButton
                type="submit"
                loading={methods.formState.isSubmitting}
                variant="contained"
                size="large"
              >
                {translate("entity-mappings", "dialog.button")}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    );
  }
);

const entityMappingFormValues: EntityMappingPayload = {
  insurance_id: "",
  intermediary_id: "",
  business_line_ids: [],
};

const entityMappingSchema = yup.object({
  insurance_id: yup.string(),
  intermediary_id: yup.string().required("Select an intermediary"),
  business_line_ids: yup
    .array()
    .min(1, "At least one line of business is required"),
});

export type EntityMappingDialogRef = {
  open: () => void;
};

export default EntityMappingDialog;
