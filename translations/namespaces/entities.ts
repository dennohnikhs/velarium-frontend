const entities = {
  title: "Entities",
  columns: {
    name: "Name",
    email: "Email",
    address: "Physical address",
    status: "Status",
  },
  addEntity: "Add entity",
  dialog: {
    entity: {
      title: "Add entity",
      fields: {
        name: "Name",
        email: "Email",
        address: "Physical address",
        type: "Entity type",
        business: "Line of business",
      },
    },
    admin: {
      title: "Add entity admin",
      fields: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
      },
    },
    stepper: {
      entity: "Add entity",
      admin: "Add entity admin",
    },
    button: "Submit",
  },
};

export type EntitiesNameSpace = typeof entities;
export default entities;
