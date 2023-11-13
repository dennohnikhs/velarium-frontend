import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "components/Image";
import LanguageSwitcher from "components/LanguageSwitcher";
import NextLink from "components/NextLink";
import GuestGuard from "guards/GuestGuard";
import useResponsive from "hooks/useResponsive";
import { poppins } from "theme/fonts";
import cssStyles from "utils/cssStyles";

// hooks

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: {
    link?: string;
    linkText?: string;
    text: string;
  };
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  const isLg = useResponsive("up", "lg");

  return (
    <GuestGuard>
      <RootStyles container>
       
        <CenterPanel item xs={12} sm={12} md={12} lg={12}>       
          <LanguageSwitcherContainer>
            <LanguageSwitcher />
          </LanguageSwitcherContainer>
          <span className="inner">
            <Typography variant="h4" mb={5} fontFamily={poppins.fontFamily}>
              {title}
            </Typography>

            {!!subtitle && (
              <Typography variant="body2" component="div" mb={4}>
                {subtitle.text}{" "}
                {subtitle?.link && (
                  <NextLink
                    href={subtitle.link}
                    color="primary.main"
                    fontFamily="publicSans"
                    fontWeight={500}
                  >
                    {subtitle.linkText}
                  </NextLink>
                )}
              </Typography>
            )}

            {children}
          </span>
        </CenterPanel>      
      </RootStyles>
    </GuestGuard>
  );
};

const RootStyles = styled(Grid)(() => ({
  height: "100%",
}));

const LanguageSwitcherContainer = styled(Box)(({}) => ({
  position: "absolute",
  top: 15,
  right: 15,
}));

const CenterPanel = styled(Grid)(({ theme: { spacing, breakpoints } }) => ({
  height: "100%",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  paddingLeft: spacing(4),
  paddingRight: spacing(4),
  backgroundColor: "transparent",
 



  [breakpoints.up("lg")]: {
    backgroundColor: "white",
    paddingLeft: spacing(7),
    paddingRight: spacing(7),
  },

  "& .inner": {
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
}));



const src = `/images/illustrations/illustration_dashboard.png`;
export default AuthLayout;
