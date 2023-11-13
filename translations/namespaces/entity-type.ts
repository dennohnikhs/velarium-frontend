const entityType = {
    title: "Entity Types",
    columns: {
        name: "Name",
        description: "Description"
    },
    addType: "Add entity type",
    dialog: {
        add_title: "Add entity type",
        update_title: "Edit entity type",
        fields: {
            name: "Name",
            description: "Description"
        }
    }
}

export type EntityTypeNameSpace = typeof entityType
export default entityType