const account = {
  title: "Account Information",
  columns: {
    risk_id: "Risk ID",
    Account_holder: "Account holder",
    Account_number: "Account number",
    insurance_name: "Insurance",
    intermediary_name: "Intermediary",
    start_date: "Start date",
    end_date: "End date",
    status: "Status",
    cert_number: "Certificate No.",
  },
  btn_text: "Add Account information",
  dialog: {
    add_title: "Create Account information",
    update_title: "Update Account information",
    fields: {
      risk_id: "Risk ID",
      Account_holder: "Account holder",
      Account_number: "Account number",
      Account_start_date: "Account Start date",
      Account_end_date: "Account End date",
      line_of_business: "Line of business",
      insurance: "Insurance",
      Account_holder_email: "Account holder email",
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
  exiting_Account: {
    title: "Error",
    message:
      "An error occurred while validating the Account. The Account is still active",
    details: {
      title: "Existing Account Details",
      fields: {
        risk_id: "Risk ID",
        start_date: "Start Date",
        end_date: "End Date",
        insured_by: "Insured by",
      },
    },
  },
  account_status: {
    active: "active",
    cancelled: "cancelled",
    inactive: "inactive",
    expired: "expired",
    uninsured: "uninsured",
  },
  cancel_Account: {
    title: "Confirm Account cancellation",
    sub_title: "Are you sure you want to cancel this Account?",
    fields: {
      reason: "Reason",
      comment: "Comment (optional)",
    },
    btn: {
      cancel: "Cancel",
      proceed: "Proceed",
    },
  },
  filter_Account: {
    title: "Filter Accounts",
    report_title: "Filter reports",
    form: {
      entity: "Entity",
      risk: "Risk ID",
      cert: "Certificate No.",
      status: "Account Status",
      date_from: "Date From",
      date_to: "Date To",
      btn: {
        filter: "Filter",
        clear: "Clear",
      },
    },
  },
  historical_Account: {
    title: "Historical Accounts"
  }
};

export type AccountNamespace = typeof account;
export default account;
