import { yupResolver } from "@hookform/resolvers/yup";
import { EntityPayload } from "@models/api/master";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { MenuProps } from "components/dynamic-form/hooks/useRenderFormFields";
import { FormProvider, RHFSelect } from "components/hook-form";
import RHFTextField from "components/hook-form/RHFTextField";
import useNotifications from "hooks/useNotifications";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxAddEntity } from "store/actions/master/entity";
import { reduxGetEntityTypes } from "store/actions/master/entity-types";
import { reduxGetLineOfBusinesses } from "store/actions/master/line-of-business";
import { selectEntityTypes } from "store/selectors/master/entity-type";
import { selectLineOfBusinesses } from "store/selectors/master/line-of-business";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";
import { baseSchema } from "./edit-entity";

const EntityInfoForm: FC<EntityInfoFormProps> = ({ setEntity, goNext }) => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useNotifications();
  const _lineOfBusinesses = useSelector(selectLineOfBusinesses).data;
  const lineOfBusinesses = useMemo(
    () => _lineOfBusinesses,
    [_lineOfBusinesses]
  );
  const _entityTypes = useSelector(selectEntityTypes).data;
  const entityTypes = useMemo(() => _entityTypes, [_entityTypes]);

  const [selectedEntityType, setSelectedEntityType] = useState<string>("");
  const [selectedLineOfBusiness, setSelectedLineOfBusiness] = useState<
    string[]
  >([]);
  const [isInsuranceSelected, setIsInsuranceSelected] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(reduxGetLineOfBusinesses({}));
    dispatch(reduxGetEntityTypes());
  }, [dispatch]);

  const methods = useForm({
    defaultValues: entityInfoFormValues,
    resolver: yupResolver(entityInfoSchema),
  });

  const handleEntityTypeChange = (event) => {
    setSelectedEntityType(event.target.value);

    const entityTypeName = entityTypes.find(
      (entityType) => entityType.id === event.target?.value
    )?.name;

    setIsInsuranceSelected(
      entityTypeName &&
        (entityTypeName.includes("insurance") ||
          entityTypeName.includes("Insurance"))
    );

    methods.setValue("entity_type_id", event.target.value);
  };

  const handleBusinessChange = (
    event: SelectChangeEvent<typeof selectedLineOfBusiness>
  ) => {
    const {
      target: { value },
    } = event;

    const updatedSelectedLineOfBusiness =
      typeof value === "string" ? value.split(",") : value;

    setSelectedLineOfBusiness(updatedSelectedLineOfBusiness);
    methods.setValue("lines_business", updatedSelectedLineOfBusiness);
  };

  const isLineOfBusinessValid = (): boolean => {
    if (!isInsuranceSelected) {
      methods.setValue("lines_business", []);
      return true;
    }

    if (!selectedLineOfBusiness.length) {
      methods.setError("lines_business", {
        type: "min",
        message: "At least one line of business is required",
      });
      return false;
    }
    return true;
  };

  const onSubmit = methods.handleSubmit((values) => {
    if (values && isLineOfBusinessValid())
      dispatch(reduxAddEntity(values)).then((response) => {
        if (isRejected(response)) {
          enqueueSnackbar("Failed to create entity", { variant: "error" });
        } else {
          enqueueSnackbar("Entity created successfully");
          methods.reset();
          setEntity(response.payload.id);
          goNext();
        }
      });
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={2}>
          <RHFTextField
            name="name"
            label={translate("entity", "dialog.fields.name")}
          />

          <RHFTextField
            name="email"
            label={translate("entity", "dialog.fields.email")}
          />
        </Stack>

        <RHFTextField
          name="physical_address"
          label={translate("entity", "dialog.fields.address")}
        />

        <RHFSelect
          name="entity_type_id"
          label={translate("entity", "dialog.fields.type")}
          value={selectedEntityType}
          onChange={handleEntityTypeChange}
        >
          {entityTypes.map((entityType, index) => (
            <MenuItem key={index} value={entityType.id}>
              {entityType.name}
            </MenuItem>
          ))}
        </RHFSelect>

        {isInsuranceSelected && (
          <FormControl
            fullWidth
            error={!!methods.formState.errors.lines_business}
          >
            <InputLabel>
              {translate("entity", "dialog.fields.business")}
            </InputLabel>
            <Select
              name={"lines_business"}
              label={translate("entity", "dialog.fields.business")}
              value={selectedLineOfBusiness}
              multiple
              onChange={handleBusinessChange}
              MenuProps={MenuProps}
            >
              {lineOfBusinesses.map((lob, index) => (
                <MenuItem key={index} value={lob.id}>
                  {lob.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {methods.formState.errors.lines_business &&
                methods.formState.errors.lines_business.message}
            </FormHelperText>
          </FormControl>
        )}

        <LoadingButton
          type="submit"
          loading={methods.formState.isSubmitting}
          variant="contained"
          size="large"
        >
          {translate("entity", "dialog.submitButton")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

const entityInfoFormValues: EntityPayload = {
  name: "",
  email: "",
  physical_address: "",
  entity_type_id: "",
  lines_business: [],
};

const entityInfoSchema = baseSchema.concat(
  yup.object({
    entity_type_id: yup.string().required("Entity type is required"),
    lines_business: yup.array(),
  })
);

type EntityInfoFormProps = {
  setEntity: Dispatch<SetStateAction<string>>;
  goNext: () => void;
};

export default EntityInfoForm;
