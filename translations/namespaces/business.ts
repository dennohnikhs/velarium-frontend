const business = {
  title: "Line Of Business",
  columns: {
    name: "Name",
    description: "Description",
  },
  addLine: "Add Line of Business",
  dialog: {
    add_title: "Add Line of business",
    update_title: "Edit Line of business",
    fields: {
      name: "Name",
      description: "Description",
    },
  },
};

export type BusinessNameSpace = typeof business;
export default business;
