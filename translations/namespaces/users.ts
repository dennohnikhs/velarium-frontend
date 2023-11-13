const users = {
    title: "Users",
    columns: {
        name: "Name",
        username: "Username",
        email: "Email",
        status: "Status"
    },
    addUser: "Create User",
    dialog: {
        add_title: "Create user",
        update_title: "Update user",
        update_button: "Update",
        submit_button: "Submit",
        fields: {
            firstname: "First Name",
            lastname: "Last Name",
            email: "Email"
        }
    }
}

export type UsersNameSpace = typeof users
export default users