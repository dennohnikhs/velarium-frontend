/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-imports */
import { yupResolver } from "@hookform/resolvers/yup";
import { PolicyInfoPayload } from "@models/api/master";
import LoadingButton from "@mui/lab/LoadingButton";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Stack,
} from '@mui/material';
// import MenuItem from "@mui/material/MenuItem";
// import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import {
  FormProvider,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from "components/hook-form";
import useAuth from "hooks/useAuth";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetCancellationReasons } from "store/actions/master/cancellation-reasons";
import { reduxGetEntityLinesOfBusiness } from "store/actions/master/entity-lines-of-business";
import { reduxGetEntityMappings } from "store/actions/master/entity-mappings";
import {
  reduxAddPolicyInfo,
  reduxUpdatePolicyInfo,
  reduxValidatePolicyInfo,
} from "store/actions/master/policy-information";
import { reduxGetVehicleColors } from "store/actions/master/vehicle-colors";
import { reduxGetVehicleMakes } from "store/actions/master/vehicle-makes";
import { reduxGetVehicleModels } from "store/actions/master/vehicle-model";
import { reduxGetVehiclePaintTypes } from "store/actions/master/vehicle-paint-types";
import { selectEntityLineOfBusiness } from "store/selectors/master/entity-lines-of-business";
import { selectEntityMappings } from "store/selectors/master/entity-mappings";
import { selectValidatedPolicyInfo } from "store/selectors/master/policy-information";
import { selectVehicleColors } from "store/selectors/master/vehicle-colors";
import { selectVehicleMakes } from "store/selectors/master/vehicle-make";
import { selectVehicleModels } from "store/selectors/master/vehicle-model";
import { selectVehiclePaintTypes } from "store/selectors/master/vehicle-paint-types";
import { resetValidationState } from "store/slices/master/policy-information";
import { getPrefix } from "utils/functions";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";

const  AccountInfoFormDialog = forwardRef< AccountInfoFormDialogRef>(
  function  AccountInfoFormDialog(_, ref) {
    const dispatch = useDispatch();
    const translate = useTranslate();
    const { enqueueSnackbar } = useNotifications();
    const getName = getPrefix("");
    const methods = useForm<PolicyInfoFormValues, any, PolicyInfoFormValues>({
      resolver: yupResolver(policyInfoFormSchema, { stripUnknown: true }),
      defaultValues: policyInfoFormDefaultValues,
    });

    const entityMappings = useSelector(selectEntityMappings)?.data;
    const linesofBusiness = useSelector(selectEntityLineOfBusiness);

    const { isValidated } = useSelector(selectValidatedPolicyInfo);
    const vehicleMakes = useSelector(selectVehicleMakes);
    const vehicleModels = useSelector(selectVehicleModels);
    const vehicleColors = useSelector(selectVehicleColors);
    const vehiclePaintTypes = useSelector(selectVehiclePaintTypes);
    const { user } = useAuth();
    const [policyHolder, setPolicyHolder] = useState<{
      name: string;
      number: string;
    }>({ name: "", number: "" });
    const [extra_info, setExtraInfo] = useState<{
      line_of_business: string;
      policy_holder_email: string;
      chasis_number: string;
      ownership_type: string;
      vehicle_make: string;
      vehicle_model: string;
      vehicle_color: string;
      paint_type: string;
      cover_type: string;
    }>({
      line_of_business: "",
      vehicle_make: "",
      vehicle_model: "",
      policy_holder_email: "",
      ownership_type: "",
      chasis_number: "",
      cover_type: "",
      vehicle_color: "",
      paint_type: "",
    });
    const [insurance_id, setInsuranceId] = useState<string>("");

    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

    const [existingPolicy, setExistingPolicy] = useState(null);

    const [loading, setLoading] = useState(false);

    const [selectedMake, setSelectedMake] = useState("");
    const [filteredModels, setFilteredModels] = useState([]);
    const [isModelDisabled, setIsModelDisabled] = useState(true);

    const handleMakeChange = (e) => {
      const selectedMake = e.target.value;
      setSelectedMake(selectedMake);
      setExtraInfo((prev) => ({
        ...prev,
        vehicle_make: selectedMake,
        vehicle_model: "",
      }));
    };

    const coverTypes = [
      {
        name: translate(
          "policy",
          "dialog.fields.cover_type_options.comprehensive_private"
        ),
        value: "Comprehensive private",
      },
      {
        name: translate(
          "policy",
          "dialog.fields.cover_type_options.comprehensive_public"
        ),
        value: "Comprehensive public",
      },
      {
        name: translate(
          "policy",
          "dialog.fields.cover_type_options.third_party_private"
        ),
        value: "Third party private",
      },
      {
        name: translate(
          "policy",
          "dialog.fields.cover_type_options.third_party_public"
        ),
        value: "Third party public",
      },
      {
        name: translate(
          "policy",
          "dialog.fields.cover_type_options.motor_commercial"
        ),
        value: "Motor commercial",
      },
      {
        name: translate(
          "policy",
          "dialog.fields.cover_type_options.motorcycle"
        ),
        value: "Motorcycle",
      },
    ];

    const handleDialogClose = () => {
      setErrorDialogOpen(false);
    };

    const id = methods.watch("id");
    const open = methods.watch("open");

    const entity_id = user.entity[0]?.id;
    const entity_type = user.entity[0]?.entity_type?.name === "Intermediary";

    useImperativeHandle(ref, () => ({
      open(values) {
        methods.reset({
          ...policyInfoFormDefaultValues,
          ...values,
          open: true,
        });
        setPolicyHolder({
          name: values?.policy_holder,
          number: values?.policy_number,
        });
      },
    }));

    const handleDateChange = (name, date) => {
      methods.setValue(name, date, { shouldValidate: true });
    };

    const checkPolicyInfo = methods.handleSubmit((values) => {
      const { risk_id, policy_date_from, policy_date_to } = values;
      if (risk_id && policy_date_from && policy_date_to) {
        dispatch(
          reduxValidatePolicyInfo({
            risk_id,
            date_from: policy_date_from,
            date_to: policy_date_to,
          })
        ).then((payload) => {
          if (isRejected(payload)) {
            const msg = payload.payload["detail"];
            enqueueSnackbar(msg, {
              variant: "error",
            });
          } else {
            /**
             * isRejected returns is valid even when a policy is not valid.
             * With this change, an error gets thrown to the console
             * "next-dev.js:20 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
             */
            if (payload.payload.valid) {
              const msg = `Proceed with the process`;
              enqueueSnackbar(msg);
            } else {
              const msg = `Status still Active`;
              enqueueSnackbar(msg, {
                variant: "error",
              });
              setExistingPolicy(payload.payload.policy_data);
              setErrorDialogOpen(true);
            }
          }
        });
      }
    }, console.error);

    const onSubmit = methods.handleSubmit((values) => {
      const action = id ? reduxUpdatePolicyInfo : reduxAddPolicyInfo;
      setLoading(true);
      const payload: PolicyInfoPayload = {
        ...values,
        policy_number: policyHolder.number,
        policy_holder: policyHolder.name,
        extra_info: extra_info,
        insurance_id: !entity_type ? entity_id : insurance_id,
        intermediary_id: entity_type ? entity_id : undefined,
      };

      if (payload)
        dispatch(action({ ...payload, id: id } as any)).then((payload) => {
          if (isRejected(payload)) {
            const msg = `Failed to ${
              values?.id ? "update" : "create"
            } policy info`;
            enqueueSnackbar(msg, { variant: "error" });
            setLoading(false);
          } else {
            const msg = `Policy info ${
              id ? "updated" : "created"
            } successfully`;
            enqueueSnackbar(msg);
            onClose();
            setLoading(false);
          }
        });
    }, console.error);

    const onClose = useCallback(() => {
      methods.reset({
        ...methods.getValues(),
        open: false,
      });
      setPolicyHolder({ name: "", number: "" });
      setExtraInfo({
        line_of_business: "",
        vehicle_make: "",
        vehicle_model: "",
        policy_holder_email: "",
        ownership_type: "",
        chasis_number: "",
        cover_type: "",
        vehicle_color: "",
        paint_type: "",
      });
      if (isValidated) dispatch(resetValidationState());
    }, [dispatch, isValidated, methods]);

    const getLinesOfBusiness = useCallback(() => {
      if (entity_type && insurance_id) {
        dispatch(
          reduxGetEntityLinesOfBusiness({
            insurance_id: insurance_id,
            intermediary_id: entity_id,
          })
        );
      } else if (!entity_type && !insurance_id) {
        dispatch(
          reduxGetEntityLinesOfBusiness({
            insurance_id: entity_id,
          })
        );
      } else {
        return;
      }
    }, [dispatch, entity_id, entity_type, insurance_id]);

    const getInsurances = useCallback(() => {
      dispatch(reduxGetEntityMappings({ insurance_id: entity_id }));
    }, [dispatch, entity_id]);

    const getVehicleDetails = useCallback(() => {
      dispatch(reduxGetVehicleMakes());
      dispatch(reduxGetVehicleModels());
      dispatch(reduxGetVehicleColors());
      dispatch(reduxGetVehiclePaintTypes());
    }, [dispatch]);

    const getCancellationReasons = useCallback(() => {
      dispatch(reduxGetCancellationReasons());
    }, [dispatch]);

    useEffect(() => {
      getInsurances();
      getLinesOfBusiness();
      getVehicleDetails();
      getCancellationReasons();
    }, [
      dispatch,
      entity_id,
      entity_type,
      getInsurances,
      getLinesOfBusiness,
      getVehicleDetails,
      getCancellationReasons,
    ]);

    useEffect(() => {
      if (selectedMake) {
        const modelsForMake = vehicleModels.data.filter(
          (model) => model.make.name === selectedMake
        );
        setFilteredModels(modelsForMake);
        setIsModelDisabled(false);
      } else {
        setFilteredModels([]);
        setIsModelDisabled(true);
      }
    }, [selectedMake, vehicleModels.data]);

    return (      
      <FormProvider {...{ methods }}>
        <Dialog {...{ open, onClose }} fullWidth>
          <DialogTitle>
            {id
              ? `${translate("account", "dialog.update_title")}`
              : `${translate("account", "dialog.add_title")}`}       

          </DialogTitle>
           

             <Button onClick={onClose} style=
             {{ width: "1000px", margin: 2 }}
             color="error">
                X</Button>
          
           
          <DialogContent>
            
            <RHFSelect
              sx={{ mt: 2 }}
              name="line_of_business"
              label={translate("policy", "dialog.fields.line_of_business")}
              value={extra_info.line_of_business}
              onChange={(e) =>
                setExtraInfo((prev) => ({
                  ...prev,
                  line_of_business: e.target.value,
                }))
              }
              disabled={isValidated}
            >
              {linesofBusiness.data.map((business, index) => (
                <MenuItem
                  key={`business-${business.id}-${index}`}
                  value={business.name}
                >
                  {business.name}
                </MenuItem>
              ))}
            </RHFSelect>

            <Stack spacing={2} mt={2}>
              <RHFTextField
                name={getName("risk_id")}
                label={translate("policy", "dialog.fields.risk_id")}
                variant="outlined"
                fullWidth
                disabled={isValidated}
              />
              <Stack direction={"row"} spacing={2} pt={1}>
                <RHFDatePicker
                  name={getName("policy_date_from")}
                  label={translate("policy", "dialog.fields.policy_start_date")}
                  onChange={(date) =>
                    handleDateChange("policy_date_from", date)
                  }
                  disabled={isValidated}
                />
                <RHFDatePicker
                  name={getName("policy_date_to")}
                  label={translate("policy", "dialog.fields.policy_end_date")}
                  onChange={(date) => handleDateChange("policy_date_to", date)}
                  disabled={isValidated}
                />
              </Stack>

              {!isValidated && !id && (
                <LoadingButton
                  type="submit"
                  onClick={() => checkPolicyInfo()}
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  {translate("account", "dialog.fields.validate")}
                </LoadingButton>
              )}

              
            </Stack>
          </DialogContent>

         
        </Dialog>
       
      </FormProvider>
    );
  }
);

const policyInfoFormSchema = yup.object().shape({
  risk_id: yup.string().required("Risk ID is required"),
  policy_date_from: yup.date().required("Policy start date is required"),
  policy_date_to: yup.date().required("Policy end date is required"),
});

const policyInfoFormDefaultValues: PolicyInfoFormValues = {
  open: false,
  risk_id: "",
  policy_date_from: "",
  policy_date_to: "",
  policy_number: "",
  policy_holder: "",
  line_of_business: "",
  policy_holder_email: "",
  chasis_number: "",
  ownership_type: "",
  vehicle_make: "",
  vehicle_model: "",
  vehicle_color: "",
  cover_type: "",
  paint_type: "",
};

type PolicyInfoFormValues = {
  id?: string;
  open: boolean;
  risk_id: string;
  policy_date_from: string;
  policy_date_to: string;
  policy_number: string;
  policy_holder: string;
  line_of_business: string;
  policy_holder_email: string;
  chasis_number: string;
  ownership_type: string;
  cover_type: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_color: string;
  paint_type: string;
};

type  AccountInfoFormDialogRef = {
  open?: (values?: Partial<PolicyInfoFormValues>) => void;
};

export {
   AccountInfoFormDialog,
  policyInfoFormDefaultValues,
  policyInfoFormSchema,
};
export type {  AccountInfoFormDialogRef, PolicyInfoFormValues };
