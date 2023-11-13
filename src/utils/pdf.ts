import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

(jsPDF as any).autoTable = autoTable;

const img = "/images/VT-logo-trimmed.png";

export const exportToPDF = ({
  data,
  is_table,
  file_name = "exported-file.pdf",
  translate,
}) => {
  const doc = new jsPDF();

  const logo = new Image();
  logo.src = img;

  logo.onload = function () {
    const logoWidth = 50;
    const logoHeight = (logoWidth * logo.height) / logo.width;
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.addImage(
      logo,
      "PNG",
      (pageWidth - logoWidth) / 2,
      10,
      logoWidth,
      logoHeight
    );

    const tableStartY = logoHeight + 20;

    if (is_table) {
      const checkStatus = (status: string) => {
        switch (status) {
          case "ACTIVE":
            return translate("policy", "policy_status.active").toUpperCase();
          case "CANCELLED":
            return translate("policy", "policy_status.cancelled").toUpperCase();
          case "INVALID":
            return translate("policy", "policy_status.inactive").toUpperCase();
          case "EXPIRED":
            return translate("policy", "policy_status.expired").toUpperCase();
          case "UNINSURED":
            return translate("policy", "policy_status.uninsured").toUpperCase();
          default:
            break;
        }
      };

      const tableData = data.map((item, index) => [
        index + 1,
        item.risk_id,
        item.cert_number,
        item.policy_holder,
        item.policy_number,
        item.insurance,
        item.intermediary,
        item.policy_date_from,
        item.policy_date_to,
        checkStatus(item.status),
      ]);

      const headStyles = {
        fillColor: [192, 223, 187],
        textColor: 0,
        fontStyle: "bold",
        halign: "center",
      };

      (doc as any).autoTable({
        head: [
          [
            "#",
            translate("policy", "columns.risk_id"),
            translate("policy", "columns.cert_number"),
            translate("policy", "columns.policy_holder"),
            translate("policy", "columns.policy_number"),
            translate("policy", "columns.insurance_name"),
            translate("policy", "columns.intermediary_name"),
            translate("policy", "columns.start_date"),
            translate("policy", "columns.end_date"),
            translate("policy", "columns.status"),
          ],
        ],
        body: tableData,
        startY: tableStartY,
        headStyles: headStyles,
      });
    } else {
      const policyStartY = 50;

      const riskId = data.length > 0 ? data[0].risk_id : "No Risk ID";

      doc.setFont("helvetica", "bold");

      doc.setFontSize(18);
      doc.text(riskId, pageWidth / 2, policyStartY - 5, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");

      data.forEach((policy, index) => {
        const yPosition = policyStartY + index * 100;

        doc.setLineWidth(0.5);
        doc.rect(20, yPosition + 10, 170, 90);

        doc.setFontSize(12);
        doc.text(
          `${translate("policy", "columns.insurance_name")}: ${
            policy.insurance
          }`,
          25,
          yPosition + 15,
          {
            align: "left",
          }
        );
        doc.text(
          `Policy Dates: ${policy.policy_date_from} to ${policy.policy_date_to}`,
          25,
          yPosition + 25,
          { align: "left" }
        );
        doc.text(
          `${translate("policy", "columns.intermediary_name")}: ${
            policy.intermediary ? policy.intermediary : "N/A"
          }`,
          25,
          yPosition + 35,
          { align: "left" }
        );

        // Left column
        doc.setFontSize(12);
        doc.text(
          `${translate("policy", "columns.policy_number")}: ${
            policy.policy_number
          }`,
          25,
          yPosition + 55
        );
        doc.text(
          `${translate("policy", "columns.policy_holder")}: ${
            policy.policy_holder
          }`,
          25,
          yPosition + 65
        );
        doc.text(
          `${translate("policy", "columns.status")}: ${policy.status}`,
          25,
          yPosition + 75
        );
        doc.text(
          `${translate("policy", "dialog.fields.vehicle_model")}: ${
            policy.extra_info.vehicle_model
          }`,
          25,
          yPosition + 85
        );

        doc.text(
          `${translate("policy", "dialog.fields.chasis_number")}: ${
            policy.extra_info.chasis_number
          }`,
          105,
          yPosition + 55
        );
        doc.text(
          `${translate("policy", "dialog.fields.ownership_type")}: ${
            policy.extra_info.ownership_type
          }`,
          105,
          yPosition + 65
        );
        doc.text(
          `${translate("policy", "dialog.fields.vehicle_make")}: ${
            policy.extra_info.vehicle_make
          } ${policy.extra_info.vehicle_make}`,
          105,
          yPosition + 75
        );
        doc.text(
          `${translate("policy", "dialog.fields.vehicle_color")}: ${
            policy.extra_info.vehicle_color
          }`,
          105,
          yPosition + 85
        );

        doc.text(
          `Cancellation Reason: ${policy.cancellation_reason || "N/A"}`,
          25,
          yPosition + 95
        );
      });
    }

    doc.save(file_name);
  };
};
