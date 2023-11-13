const models = {
  title: "Vehicle Model",
  columns: {
    name: "Name",
    make: "Make",
  },
  addModel: "Add Vehicle Model",
  dialog: {
    add_title: "Add Vehicle Model",
    update_title: "Edit Vehicle Model",
    fields: {
      name: "Name",
      make_id: "Make",
    },
  },
};

export type ModelsNameSpace = typeof models;
export default models;