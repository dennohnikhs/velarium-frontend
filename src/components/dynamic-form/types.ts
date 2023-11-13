import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import React, { CSSProperties } from "react";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";

export type FormField = {
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "number"
    | "select"
    | "checkbox";
  label: string;
  name?: string;
  value?: string | boolean | number;
  options?: Option[];
  variant?: "outlined" | "filled" | "standard";
  width?: ResponsiveStyleValue<string | number>;
  multiline?: boolean;
  rows?: string | number;
  size?: "small" | "medium";
  rules?: ValidationRule[];
  multiple?: boolean;
};

export type DynamicFormProps = {
  fields: FormField[];
  formStyle?: CSSProperties;
  fieldContainerStyle?: React.CSSProperties;
  buttonContainerStyle?: React.CSSProperties;
  direction?: ResponsiveStyleValue<
    "row" | "column" | "column-reverse" | "row-reverse"
  >;
  spacing?: ResponsiveStyleValue<string | number>;
  style?: CSSProperties;
  prefix?: string;
  validationSchema?: yup.ObjectSchema<any>;
  onSubmit: SubmitHandler<any>;
  flexWrap?: ResponsiveStyleValue<"wrap" | "nowrap" | "wrap-reverse">;
  useFlexGap?: boolean;
  gap?: string | number;
  maxWidth?: ResponsiveStyleValue<string | number>;
  backendErrors?: BackendErrors;
};

export type ValidationRule = {
  type: "required" | "minLength" | "maxLength" | "pattern";
  value?: any;
  message: string;
};

export type BackendErrors = {
  [fieldName: string]: string;
};

type Option = {
  value: string | number;
  label: string | number;
};
