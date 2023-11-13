// form
// @mui
import FormHelperText from "@mui/material/FormHelperText";
import { CSSProperties, Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
// type
import {
  handleFileDrop,
  UploadAvatar,
  UploadMultiFile,
  UploadMultiFileProps,
  UploadProps,
  UploadSingleFile,
} from "../upload";

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, "file"> {
  name: string;
}

export function RHFUploadAvatar({
  name,
  containerStyle,
  ...other
}: Props & { containerStyle?: CSSProperties }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <div style={containerStyle}>
            <UploadAvatar
              error={checkError}
              {...other}
              file={field.value}
              labels={{
                new: "Upload logo (optional)",
                update: "Update logo",
              }}
            />
            {checkError && (
              <FormHelperText error sx={{ px: 2, width: "100%" }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadSingleFile({
  name,
  label,
  required,
  ...other
}: Props & { label?: string; required?: boolean }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <Fragment>
            <UploadSingleFile
              file={field.value}
              error={checkError}
              onDrop={(e) => handleFileDrop(name, e, setValue)}
              label={label + (required ? `*` : "")}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {error.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
          </Fragment>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFUploadMultiFileProps extends Omit<UploadMultiFileProps, "files"> {
  name: string;
}

export function RHFUploadMultiFile({
  name,
  ...other
}: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            files={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
