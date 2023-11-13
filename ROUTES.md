# Project Routes - Frontend

## 1. Entity Management

### a) Entity

    Root: `/entities/`
            "/"         - Entities List
            "/create/"  - Create entity
            "/:id/""    - Entity Profile

### b) Entity User Management

    Root: `/entities/:id/users/
            "/"         - List of users under the entity
                        - Button & modal to create a user
            "/:id/"     - User Profile

### c) Entity Roles

    Root: `entities/:id/roles/`
            "/"         - List of roles owned by the entity
            "/create/"  - Creating a role
                        - Assigning permissions to the role
            "/:id/"     - Editing permissions of a single role

## 2. User Management

### a) Permissions

### b) Roles
