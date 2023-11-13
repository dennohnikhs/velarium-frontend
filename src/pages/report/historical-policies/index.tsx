import { HistoricalPolicies } from "@models/master";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "api/api";
import ExportButtons from "components/Export";
import Page from "components/Page";
import PolicyReportFilterForm from "features/master/forms/policy-report-filter";
import useAuth from "hooks/useAuth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetHistoricalPolicies } from "store/actions/master/historical-policies";
import { selecthistoricalPolicies } from "store/selectors/master/historical-policies";
import { formatDate } from "utils/formatDate";
import serverSideTranslations from "utils/serversideTranslations";
import { useTranslate } from "utils/useTranslation";

type ExampleProps = {
  risk_id: string;
  entity_id: string;
};

const _columns = (): GridColDef<HistoricalPolicies>[] => {
  const translate = useTranslate();

  return [
    {
      field: "risk_id",
      headerName: translate("policy", "columns.risk_id"),
      flex: 1,
    },
    {
      field: "cert_number",
      headerName: translate("policy", "columns.cert_number"),
      flex: 1,
    },
    {
      field: "policy_holder",
      headerName: translate("policy", "columns.policy_holder"),
      flex: 1,
    },
    {
      field: "policy_number",
      headerName: translate("policy", "columns.policy_number"),
      flex: 1,
    },
    {
      field: "insurance",
      headerName: translate("policy", "columns.insurance_name"),
      flex: 2,
      renderCell: (params) => {
        return params.row.insurance?.name;
      },
    },
    {
      field: "intermediary",
      headerName: translate("policy", "columns.intermediary_name"),
      flex: 1,
      renderCell: (params) => {
        return params.row.intermediary?.name;
      },
    },
    {
      field: "policy_date_from",
      headerName: translate("policy", "columns.start_date"),
      flex: 1,
      valueGetter: ({ value }) => formatDate(value),
    },
    {
      field: "policy_date_to",
      headerName: translate("policy", "columns.end_date"),
      flex: 1,
      valueGetter: ({ value }) => formatDate(value),
    },
    {
      field: "status",
      headerName: translate("policy", "columns.status"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];
};

const PolicyAccordionComponent: React.FC<ExampleProps> = ({
  risk_id,
  entity_id,
}) => {
  // const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    if (risk_id && entity_id) {
      // to-do figure why dispatch is making multiple api calls
      // dispatch(reduxGetHistoricalPolicies({ entity_id, risk_id }));
      const data = await api
        .get("/policy-information/historical/", {
          params: { entity_id, risk_id },
        })
        .then((res) => res.data);
      setData(data);
    }
  }, [risk_id, entity_id]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ExportButtons
        data={data.map((policy) => ({
          risk_id: policy.risk_id,
          cert_number: policy.cert_number,
          policy_holder: policy.policy_holder,
          policy_number: policy.policy_number,
          insurance: policy.insurance?.name,
          intermediary: policy.intermediary?.name,
          policy_date_from: formatDate(policy.policy_date_from),
          policy_date_to: formatDate(policy.policy_date_to),
          status: policy.status,
          cancellation_reason: policy.cancellation_reason?.reason,
          extra_info: policy.extra_info,
        }))}
        is_table={false}
        file_name="vehicle_report.pdf"
      />
      <Paper>
        <DataGrid
          autoHeight
          {...{
            rows: data,
            // loading: data.loading,
            columns: [..._columns()],
          }}
        />
      </Paper>
    </>
  );
};

const HistoricalPoliciesPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const historicalPolicies = useSelector(selecthistoricalPolicies);
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const entity_id = user.entity[0]?.id;

  useEffect(() => {
    if (!historicalPolicies.loading)
      dispatch(reduxGetHistoricalPolicies({ entity_id }));
  }, []);

  const handleChange = (id) => () => {
    setExpanded((prevExpanded) => (prevExpanded === id ? null : id));
  };

  return (
    <>
      <PolicyReportFilterForm />
      <Paper sx={{ mt: 3 }}>
        {historicalPolicies.data.map(({ risk_id, id }) => (
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={id}
            expanded={expanded === id}
            onChange={handleChange(id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{risk_id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PolicyAccordionComponent {...{ entity_id, risk_id }} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </>
  );
};

HistoricalPoliciesPage.getLayout = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useTranslate();
  return (
    <DashboardLayout>
      <Page title={translate("policy", "historical_policy.title")}>{page}</Page>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["policy"])),
    },
  };
};

export default HistoricalPoliciesPage;
