import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Iconify from "components/Iconify";
import { cloneElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetMasterDataSummary } from "store/actions/master/data-summary";
import { selectMasterDataSummary } from "store/selectors/master/data-summary";

import { publicSans } from "theme/fonts";
import cssStyles from "utils/cssStyles";
import { fNumber } from "utils/formatNumber";
import { excludeProps } from "utils/functions";
import { useTranslate } from "utils/useTranslation";

const RADIUS = 2;
const ICON_SIZE = 24;
const ICON_CONTAINER_SIZE = ICON_SIZE * 1.85;

const EntityProfileStats = () => {
  const dispatch = useDispatch();
  const dataSummary = useSelector(selectMasterDataSummary);
  const translate = useTranslate();

  useEffect(() => {
    dispatch(reduxGetMasterDataSummary());
  }, [dispatch]);

  const items = [
    {
      title: translate("common", "dashboard.cards.insurances"),
      value: dataSummary.data?.insurances,
      gradient: gradients.red_to_orange,
      icon: <Iconify icon="eva:people-fill" />,
    },
    {
      title: translate("common", "dashboard.cards.intermediaries"),
      gradient: gradients.blue_to_pink,
      value: dataSummary.data?.intermediaries,
      icon: <Iconify icon="la:user-cog" />,
    },
    {
      title: translate("common", "dashboard.cards.businesses"),
      gradient: gradients.back_to_earth,
      value: dataSummary.data?.lines_of_business,
      icon: <Iconify icon="ri:building-4-fill" />,
    },
  ] as const;

  return (
    <Grid
      container
      spacing={{
        xs: 4,
        sm: 2,
      }}
      sx={{ mt: 2, pt: 2 }}
      justifyContent="space-between"
    >
      {items.map((item) => (
        <Grid item key={item.title} xs={12} sm={4}>
          <StatCardRoot gradient={item.gradient}>
            <Typography
              className="title"
              color="grey.100"
              fontFamily={publicSans.fontFamily}
            >
              {item.title}
            </Typography>
            <StatCard variant="outlined" elevation={0}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h4">{fNumber(item.value)}</Typography>

                <IconContainer gradient={item.gradient}>
                  {cloneElement(item.icon, {
                    height: ICON_SIZE,
                    width: ICON_SIZE,
                  })}
                </IconContainer>
              </CardContent>
            </StatCard>
          </StatCardRoot>
        </Grid>
      ))}
    </Grid>
  );
};

const StatCard = styled(Card)(({ theme: { spacing, shadows, alpha } }) => ({
  cursor: "pointer",
  padding: 0,
  borderRadius: spacing(RADIUS),
  flexGrow: 1,

  boxShadow: shadows[12],
  borderWidth: 0,
  ...cssStyles.glass({
    border: false,
  }),

  background: `linear-gradient(200deg,${alpha("#ffffff", 0.98)} 20%, ${alpha(
    "#ffffff",
    0.4
  )})`,

  "& .MuiCardContent-root": {
    display: "flex",
    flexDirecion: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const StatCardRoot = styled(Box, {
  shouldForwardProp: excludeProps(["gradient"]),
})<{ gradient: string }>(({ gradient, theme: { spacing } }) => ({
  paddingLeft: spacing(3),
  borderRadius: spacing(RADIUS),
  background: gradient,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "row",
  height: "100%",
  borderCollapse: "collapse",
  padding: 0,
  margin: 0,

  "& .title": {
    textTransform: "uppercase",
    letterSpacing: 1,
    writingMode: "vertical-lr",
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    textAlign: "center",
  },
}));

const IconContainer = styled("span", {
  shouldForwardProp: excludeProps(["gradient"]),
})<{ gradient: string }>(
  ({
    gradient,
    theme: {
      alpha,
      palette: { common },
      shadows,
    },
  }) => ({
    background: gradient,
    height: ICON_CONTAINER_SIZE,
    width: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: shadows[10],
    borderWidth: 1,
    borderColor: alpha(common.white, 0.8),
    borderStyle: "solid",

    "& svg": {
      color: `${alpha(common.white, 0.9)}`,
    },
  })
);

const gradients = {
  red_to_orange: "linear-gradient(185deg, #ff5f6d, #ffc371)",
  blue_to_pink: "linear-gradient(185deg, #CB3066, #16BFFD)",
  back_to_earth: "linear-gradient(185deg,  #00c9ff, #92fe9d)",
};

export { EntityProfileStats };
