const mappings = {
  title: "Entity mappings",
  columns: {
    insurance_name: "Insurance",
    intermediary_name: "Intermediary",
    business: "Business",
  },
  attachIntermediaryButton: "Attach intermediary",
  dialog: {
    title: "Attach intermediary",
    fields: {
      intermediary: "Intermediary",
      line_of_business: "Line of business",
    },
    button: "Submit",
  },
};

export type MappingsNameSpace = typeof mappings;
export default mappings;
