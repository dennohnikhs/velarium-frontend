import { customTranslation } from "../helpers";

const auth = {
  login: {
    title: "Sign in to get Started",
    description: "Enter you password to login",
    fields: {
      username_or_email: "Username or email",
      password: "Password",
    },
    validation_errors: {
      username: {
        required: "Username is required",
      },
      password: {
        required: "Password is required.",
        min: "password must be atleast {{min}} characters",
      },
    },
  },

  reset: {
    title: "Forgot Password?",
    buttonText: "Send Link",
    description: "To reset your password, enter your email address below :",
    fields: {
      email: "Email",
    },
  },

  magic_login: {
    title: "UH-OH!",
    expired: customTranslation({
      en: "The login link you followed has expired, or is invalid.",
      sw: "The link you followed has expired, is is invalid",
    }),
    to_dashboard: "Continue to dashboard",
    to_login: "Take me to login",
    page_title: customTranslation({
      en: "Magic Login",
      sw: "Fast Login",
    }),
    attempting_to_login: "Attempting to login...",
  },
  // rest of the data
  forgot_password: "Forgot password?",
  remember_me: "Remember me",
  login_btn: "Login",
  login_as_provider: "Login as provider",
  need_help: "Need help",
  contact_us: "Contact Us",
  session_ended: "Your session ended",
} as const;

export type AuthNamespace = typeof auth;

export default auth;
