import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { sentenceCase } from "change-case";
import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { BackendErrors, FormField } from "../types";

const DEFAULT_FIELD_WIDTH = "14em";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const useRenderFormFields = ({
  fields,
  validationSchema,
  backendErrors,
}: UseRenderFormFieldsProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: fields.reduce((initialValues: any, field) => {
      initialValues[field.name] =
        field.type === "select" && field.multiple
          ? []
          : field.type === "select" && !field.multiple
          ? ""
          : field.type === "checkbox"
          ? false
          : "";
      return initialValues;
    }, {}),
    resolver: yupResolver(validationSchema || yup.object()),
    shouldUnregister: false,
  });

  const setInitialValues = useCallback(
    () =>
      fields.forEach((field) => {
        const { name, value } = field;
        if (value) {
          setValue(name, value);
        }
      }),
    [fields, setValue]
  );

  useEffect(() => {
    setInitialValues();
  }, [setInitialValues]);

  const formFields = useMemo(
    () =>
      fields?.map((field) => {
        const fieldProps = register(field.name);
        const {
          label,
          type,
          options,
          name,
          variant,
          width,
          multiline,
          rows,
          size,
          multiple,
        } = field;
        const fieldError = errors[name];
        const backendError = backendErrors ? backendErrors[name] : "";

        switch (type) {
          case "text":
          case "number":
            return (
              <Box width={width ? width : DEFAULT_FIELD_WIDTH} key={label}>
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={label}
                      size={size}
                      error={!!fieldError || !!backendError}
                      variant={variant}
                      helperText={
                        fieldError
                          ? backendError || (fieldError?.message as string)
                          : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Box>
            );

          case "textarea":
            return (
              <Box width={width ? width : DEFAULT_FIELD_WIDTH} key={label}>
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({}) => (
                    <TextField
                      fullWidth
                      label={label}
                      name={name}
                      size={size}
                      variant={variant}
                      multiline={multiline}
                      rows={rows}
                      error={!!fieldError || !!backendError}
                      helperText={
                        fieldError
                          ? backendError || (fieldError?.message as string)
                          : ""
                      }
                      {...fieldProps}
                    />
                  )}
                />
              </Box>
            );

          case "email":
          case "password":
            return (
              <Box width={width ? width : DEFAULT_FIELD_WIDTH} key={field.name}>
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={label}
                      type={type}
                      size={size}
                      error={!!fieldError || !!backendError}
                      variant={variant}
                      helperText={
                        fieldError
                          ? backendError || (fieldError?.message as string)
                          : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Box>
            );
          case "select":
            if (multiple) {
              return (
                <Box width={width ? width : DEFAULT_FIELD_WIDTH} key={label}>
                  <FormControl fullWidth error={!!fieldError}>
                    <InputLabel id="multiple-chip-label">{label}</InputLabel>
                    <Controller
                      name={name}
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="multiple-chip-label"
                          id="multiple-chip"
                          multiple
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected?.map((value) => {
                                const selectedOption = options?.find(
                                  (option) => option.value === value
                                );
                                return (
                                  <Chip
                                    key={value}
                                    label={
                                      selectedOption ? selectedOption.label : ""
                                    }
                                  />
                                );
                              })}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {sentenceCase(option.label as string)}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {fieldError
                        ? backendError || (fieldError?.message as string)
                        : ""}
                    </FormHelperText>
                  </FormControl>
                </Box>
              );
            }
            return (
              <Box width={width ? width : DEFAULT_FIELD_WIDTH} key={label}>
                <FormControl fullWidth error={!!fieldError}>
                  <InputLabel>{label}</InputLabel>
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <Select
                        multiple={multiple}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        size={size}
                      >
                        {options?.map(({ value, label }) => (
                          <MenuItem key={`${value}-${label}`} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>
                    {fieldError
                      ? backendError || (fieldError?.message as string)
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Box>
            );
          case "checkbox":
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({}) => (
                  <Box key={label}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={name}
                            color="primary"
                            {...fieldProps}
                          />
                        }
                        label={label}
                      />
                    </FormGroup>
                  </Box>
                )}
              />
            );
          default:
            return null;
        }
      }),
    [backendErrors, control, errors, fields, register]
  );

  return { formFields, handleSubmit, isSubmitting };
};

type UseRenderFormFieldsProps = {
  fields: FormField[];
  validationSchema?: yup.ObjectSchema<any>;
  backendErrors?: BackendErrors;
};
