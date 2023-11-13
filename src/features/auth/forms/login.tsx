import Stack, { StackProps } from "@mui/material/Stack";
import { RHFTextField } from "components/hook-form";
import RHFPasswordField from "components/hook-form/RHFPasswordField";
import { useTranslate } from "utils/useTranslation";
// import { MIN_PASSWORD_LEN } from "utils/constants";
import * as yup from "yup";

const LoginForm: FunctionComponent<LoginFormProps> = ({
  children,
  ...props
}) => {
  const translate = useTranslate();
  return (
    <Stack spacing={2} {...props}>
      <RHFTextField
        name="username"
        label={translate("auth", "login.fields.username_or_email")}
        autoComplete="username"
        autoCapitalize="off"
        type="username"
      />
      <RHFPasswordField
        name="password"
        label={translate("auth", "login.fields.password")}
      />
      {children}
    </Stack>
  );
};

const loginFormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  // .min(
  //   MIN_PASSWORD_LEN,
  //   ({ min }) => `Password must be atleast ${min} characters`
  // ),
  remember_me: yup.boolean().default(true),
});

const loginFormValues: LoginFormValues = {
  username: "",
  password: "",
  remember_me: true,
};

type LoginFormValues = {
  username: string;
  password: string;
  remember_me: boolean;
};

type LoginFormProps = {
  children?: React.ReactNode;
} & StackProps;

export type { LoginFormValues, LoginFormProps };
export { loginFormSchema, loginFormValues, LoginForm };
