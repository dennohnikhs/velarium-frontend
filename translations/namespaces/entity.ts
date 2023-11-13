const entity = {
    title: "Entities",
    columns: {
        name: "Name",
        email: "Email",
        address: "Physical address",
        status: "Status"
    },
    addButton: "Add entity",
    dialog: {
        add_title: "Add entity",
        add_entity_user: "Add entity admin",
        update_title: "Edit entity",
        fields: {
            name: "Name",
            email: "Email",
            address: "Physical address",
            type: "Entity type",
            business: "Line of business"
        },
        entity_user: {
            firstname: "Firstname",
            lastname: "Lastname",
            email: "Email"
        },
        submitButton: "Submit"
    }
}

export type EntityNameSpace = typeof entity
export default entity