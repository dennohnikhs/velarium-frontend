import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetPolicyInfoSummary } from "store/actions/master/policy-information";
import { selectPolicyInfoSummary } from "store/selectors/master/policy-information";
import { EntityProfileStats } from "./EntityProfileStats";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTranslate } from "utils/useTranslation";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    colors.push(color);
  }
  return colors;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { intermediaries, cover_types } = useSelector(selectPolicyInfoSummary);
  const translate = useTranslate();

  const canViewProfileStats =
    user.entity[0]?.entity_type?.name == "Insurance Authority" ||
    user.entity[0]?.entity_type?.name == "Host";

  const coverTypeData =
    cover_types &&
    Object.entries(cover_types).map(([type, count]) => ({
      name: type,
      value: count,
    }));

  const intermediaryData =
    intermediaries &&
    Object.entries(intermediaries).map(([name, count]) => ({ name, count }));

  const emptyChart = {
    labels: ["No Data"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["#CCCCCC"],
      },
    ],
  };

  const backgroundColors = generateRandomColors(
    coverTypeData && coverTypeData.length
  );
  const borderColors = backgroundColors.map((color) =>
    color.replace("0.6", "1")
  );

  const data = coverTypeData?.length > 0 ? {
    labels: coverTypeData && coverTypeData.map(({ name }) => name.substring(0, 5) + '...'),
    datasets: [
      {
        label: "# of Cover types",
        data: coverTypeData && coverTypeData.map(({ value }) => value),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  } : { ...emptyChart };

  const dataOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItem) => coverTypeData && coverTypeData[tooltipItem[0].dataIndex]?.name,
        },
      },
    },
  };

  const intBackgroundColors = generateRandomColors(
    intermediaryData && intermediaryData.length
  );
  const intBorderColors = intBackgroundColors.map((color) =>
    color.replace("0.6", "1")
  );

  const intData = intermediaryData?.length > 0 ? {
    labels: intermediaryData && intermediaryData.map(({ name }) => name.substring(0, 5) + '...'),
    datasets: [
      {
        label: "# of Covers",
        data: intermediaryData && intermediaryData.map(({ count }) => count),
        backgroundColor: intBackgroundColors,
        borderColor: intBorderColors,
        borderWidth: 1,
      },
    ],
  }: { ...emptyChart };

  const intDataOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItem) => intermediaryData && intermediaryData[tooltipItem[0].dataIndex]?.name,
        },
      },
    },
  };

  useEffect(() => {
    dispatch(reduxGetPolicyInfoSummary(user.entity[0].id));
  }, [dispatch, user.entity]);

  return (
    <>
      {canViewProfileStats && <EntityProfileStats />}

      {(data.labels || intData.labels) && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }}>
            {data.labels && (
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {translate("common", "dashboard.charts.cover_types")}
                </Typography>
                <Stack
                  alignItems={{ xs: "center", md: "start" }}
                  sx={{ height: "300px" }}
                >
                  <Pie data={data} options={dataOptions} />
                </Stack>
              </Box>
            )}

            {intData.labels && (
              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {translate("common", "dashboard.charts.entities")}
                </Typography>
                <Stack
                  alignItems={{ xs: "center", md: "start" }}
                  sx={{ height: "300px" }}
                >
                  <Doughnut data={intData} options={intDataOptions} />
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default Dashboard;
