const groups = {
    title: "User Groups",
    columns: {
        name: "Name",
        description: "Description"
    },
    addGroup: "Create Group",
    stepper: {
        info: "Info",
        permission: "Permissions"
    },
    dialog: {
        add_title: "Create Group",
        update_title: "Update Group",
        back_button: "Back",
        next_button: "Next",
        fields: {
            name: "Name",
            description: "Description"
        }
    },
    edit: {
        name: "Groups"
    },
    view: {
        title: "Group Members",
        sub_title: "List of users under",
        columns: {
            name: "Name",
            username: "Username"
        },
        addMember: "Add Member",
        dialog: {
            add_title: "Add Group member",
            fields: {
                name: "User"
            }
        }
    }
}

export type GroupsNameSpace = typeof groups
export default groups