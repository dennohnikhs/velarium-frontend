const policy = {
  title: "Policy Information",
  columns: {
    risk_id: "Risk ID",
    policy_holder: "Policy holder",
    policy_number: "Policy number",
    insurance_name: "Insurance",
    intermediary_name: "Intermediary",
    start_date: "Start date",
    end_date: "End date",
    status: "Status",
    cert_number: "Certificate No.",
  },
  btn_text: "Add policy information",
  dialog: {
    add_title: "Create policy information",
    update_title: "Update policy information",
    fields: {
      risk_id: "Risk ID",
      policy_holder: "Policy holder",
      policy_number: "Policy number",
      policy_start_date: "Policy Start date",
      policy_end_date: "Policy End date",
      line_of_business: "Line of business",
      insurance: "Insurance",
      policy_holder_email: "Policy holder email",
      chasis_number: "Chassis number",
      vehicle_make: "Vehicle make",
      vehicle_model: "Vehicle model",
      ownership_type: "Ownership type",
      cover_type: "Cover type",
      vehicle_color: "Vehicle color",
      paint_type: "Paint type",
      ownership_type_options: {
        private: "Private",
        public: "Public",
      },
      cover_type_options: {
        comprehensive_private: "Comprehensive private",
        comprehensive_public: "Comprehensive public",
        third_party_private: "Third party private",
        third_party_public: "Third party public",
        motor_commercial: "Motor commercial",
        motorcycle: "Motorcycle",
      },
      validate: "Validate",
      submit: "Submit",
      update: "Update",
      status_tooltip_text: "Click to toggle status",
    },
  },
  exiting_policy: {
    title: "Error",
    message:
      "An error occurred while validating the policy. The policy is still active",
    details: {
      title: "Existing Policy Details",
      fields: {
        risk_id: "Risk ID",
        start_date: "Start Date",
        end_date: "End Date",
        insured_by: "Insured by",
      },
    },
  },
  policy_status: {
    active: "active",
    cancelled: "cancelled",
    inactive: "inactive",
    expired: "expired",
    uninsured: "uninsured",
  },
  cancel_policy: {
    title: "Confirm policy cancellation",
    sub_title: "Are you sure you want to cancel this policy?",
    fields: {
      reason: "Reason",
      comment: "Comment (optional)",
    },
    btn: {
      cancel: "Cancel",
      proceed: "Proceed",
    },
  },
  filter_policy: {
    title: "Filter policies",
    report_title: "Filter reports",
    form: {
      entity: "Entity",
      risk: "Risk ID",
      cert: "Certificate No.",
      status: "Policy Status",
      date_from: "Date From",
      date_to: "Date To",
      btn: {
        filter: "Filter",
        clear: "Clear",
      },
    },
  },
  historical_policy: {
    title: "Historical Policies"
  }
};

export type PolicyNamespace = typeof policy;
export default policy;
