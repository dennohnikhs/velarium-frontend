import { GetQRPolicyInfoParams } from "@models/api/comms/qr";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LanguageSwitcher from "components/LanguageSwitcher";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetQRPolicyInfo } from "store/actions/comms/qr";
import { selectQRPolicyInfo } from "store/selectors/comms/qr";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

const QRPage = () => {
  const translate = useTranslate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { cert_number } = router.query;

  useEffect(() => {
    setIsLoading(true);

    cert_number &&
      dispatch(
        reduxGetQRPolicyInfo({ cert_number } as GetQRPolicyInfoParams)
      ).then(() => {
        setIsLoading(false);
      });
  }, [cert_number, dispatch]);

  const policyInfo = useSelector(selectQRPolicyInfo)?.data;

  const formatDate = (date: string) => {
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      return formattedDate;
    }
    return;
  };

  const policyFromDate = policyInfo && formatDate(policyInfo.policy_date_from);
  const policyToDate = policyInfo && formatDate(policyInfo.policy_date_to);

  const checkStatus = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return translate("qr-policy", "policy_status.active").toUpperCase();
      case "CANCELLED":
        return translate("qr-policy", "policy_status.cancelled").toUpperCase();
      case "INVALID":
        return translate("qr-policy", "policy_status.inactive").toUpperCase();
      case "EXPIRED":
        return translate("qr-policy", "policy_status.expired").toUpperCase();
      default:
        break;
    }
  };

  return (
    <Box width={"100vw"} height={"100vh"} p={4}>
      <Box sx={{ position: "relative" }}>
        <div style={{ flexGrow: 1 }} />
        <Box sx={{ width: "fit-content", position: "absolute", right: 0 }}>
          <LanguageSwitcher />
        </Box>
      </Box>

      <Stack
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              width: { xs: "100vw", sm: "60vw" },
            }}
          >
            <Box sx={{ width: { xs: "100vw", sm: "60vw" }, mb: 2 }}>
              <img
                src="/images/VT-logo-trimmed.png"
                alt="logo"
                style={{ maxWidth: "100%", height: "100%" }}
              />
            </Box>

            {policyInfo.risk_id ? (
              <Stack sx={{ mx: "auto", px: 1 }}>
                <Stack mb={2} direction={"row"} gap={1}>
                  <Typography fontWeight="bold">
                    {translate("qr-policy", "risk")}
                  </Typography>
                  <Typography>{policyInfo?.risk_id}</Typography>
                </Stack>
                <Stack mb={2} direction={"row"} gap={1}>
                  <Typography fontWeight="bold">
                    {translate("qr-policy", "certificate")}:
                  </Typography>
                  <Typography>{policyInfo?.cert_number}</Typography>
                </Stack>
                <Stack mb={2} direction={"row"} gap={1}>
                  <Typography fontWeight="bold">
                    {translate("qr-policy", "policy_status.title")}:
                  </Typography>
                  <Chip
                    size="small"
                    label={checkStatus(policyInfo?.status)}
                    color={
                      policyInfo?.status === "ACTIVE" ? "success" : "error"
                    }
                    sx={{ color: "#fff" }}
                  />
                </Stack>
                <Stack mb={2} direction={"row"} gap={1}>
                  <Typography fontWeight="bold">
                    {translate("qr-policy", "period.title")}:
                  </Typography>
                  <Typography>
                    {policyFromDate}{" "}
                    <b> {translate("qr-policy", "period.to")} </b>{" "}
                    {policyToDate}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Typography fontWeight="bold" align="center">
                {translate("qr-policy", "not_found")}
              </Typography>
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths<{
  cert_number: string;
}> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["qr-policy"])),
    },
  };
};

export default QRPage;
