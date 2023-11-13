import Stack, { StackProps } from "@mui/material/Stack";
import RHFPasswordField from "components/hook-form/RHFPasswordField";
import { MIN_PASSWORD_LEN } from "utils/constants";
import * as yup from "yup";


const ResetForm: FunctionComponent<ResetFormProps> = ({
  children,
  ...props
}) => {
  return (
    <Stack spacing={2} {...props}>
      <RHFPasswordField name="New password" label="New Password" />
      <RHFPasswordField name="Re-enter password" label="Re-enter Password" />
      {children}
    </Stack>
  );
};

const resetFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(
      MIN_PASSWORD_LEN,
      ({ min }) => `Password must be atleast ${min} characters`
    ),

}); 

const resetFormValues: ResetFormValues = {
  email: "",
  password: "",
  remember_me: true,
};

type ResetFormValues = {
  email: string;
  password: string;
  remember_me: boolean;
};

type ResetFormProps = {
  children?: React.ReactNode;
} & StackProps;

export type { ResetFormValues, ResetFormProps };
export { resetFormSchema, resetFormValues, ResetForm }; 
