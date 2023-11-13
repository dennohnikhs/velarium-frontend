import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { exportToExcel } from "utils/excel";
import { exportToPDF } from "utils/pdf";
import { useTranslate } from "utils/useTranslation";

const ExportButtons = ({
  data,
  is_table = true,
  file_name = "exported-file.pdf",
}) => {
  const handleExportExcel = () => {
    exportToExcel(data);
  };

  const handleExportPDF = () => {
    exportToPDF({ data, is_table, file_name, translate });
  };
  const translate = useTranslate();

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{ px: 2, color: "#f40f02", height: "fit-content" }}
        onClick={handleExportPDF}
      >
        <Icon icon="uiw:file-pdf" fontSize={20} style={{ marginRight: 4 }} />
        {translate("common", "exports.to_pdf")}
      </Button>
      <Button
        variant="outlined"
        color="success"
        size="small"
        sx={{ px: 2, color: "#008000", height: "fit-content" }}
        onClick={handleExportExcel}
      >
        <Icon icon="uiw:file-excel" fontSize={20} style={{ marginRight: 4 }} />
        {translate("common", "exports.to_excel")}
      </Button>
    </Stack>
  );
};

export default ExportButtons;
