import LoadingButton from "@mui/lab/LoadingButton";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { Fragment } from "react";

const variant: ButtonProps["variant"][] = [
  "contained",
  "outlined",
  "text",
  "textContained",
];

const Buttons: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Stack spacing={2}>
        <div>
          <Typography variant="overline">Button Variants</Typography>
          <Stack spacing={2} direction="row" mt={1}>
            {variant.map((variant) => (
              <Button {...{ variant }} key={variant}>
                {variant}
              </Button>
            ))}
          </Stack>
        </div>

        <div>
          <Typography variant="overline">Loading Button</Typography>
          <Stack spacing={2} direction="row" mt={1}>
            <LoadingButton color="secondary" variant="contained">
              Loading Button
            </LoadingButton>
            <LoadingButton color="secondary" loading variant="contained">
              Loading Button
            </LoadingButton>
          </Stack>
        </div>
      </Stack>
    </Fragment>
  );
};

Buttons.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Buttons;
