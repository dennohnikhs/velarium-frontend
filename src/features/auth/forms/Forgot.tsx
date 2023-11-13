import Stack, { StackProps } from "@mui/material/Stack";
import { RHFTextField } from "components/hook-form";

import * as yup from "yup";

const ForgotForm: FunctionComponent<ForgotFormProps> = ({
  children,
  ...props
}) => {
  return (
    <Stack spacing={2} {...props}>
      <RHFTextField
        name="email"
        label="Email"
        autoComplete="email"
        autoCapitalize="off"
        type="email"
      />
      {children}
    </Stack>
  );
};

const forgotFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const forgotFormValues: ForgotFormValues = {
  email: "",

};

type ForgotFormValues = {
  email: string;

};

type ForgotFormProps = {
  children?: React.ReactNode;
} & StackProps;

export type { ForgotFormValues, ForgotFormProps };
export { forgotFormSchema, forgotFormValues, ForgotForm };
