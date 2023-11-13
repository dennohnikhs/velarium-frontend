# Environment Documentation

The following documentation explains the declaration of environment files on the `env/` folder.

## Folder Structure

    env
    ├── env/demo.env
    ├── env/prod.env
    ├── env/README.md
    └── env/wip.env

## Environment Definitions

1. `demo` - Environment declarations for demonstration environment.
2. `wip` - Environment declarations for the deployed-development environment for testing purposes.
3. `prod` - Environment declarations for the production environment.

## Usage

The .env files serve as an extension of the .env file in the project root. All the environment variables that might have already been declared on the .env file will be overridden unless specified on the nextjs config file.

## Running Build Command

`package.json` declares commands, setting the specific environment vars to be used.
With `yarn` or `npm`:

    yarn build:prod
    yarn build:wip
    yarn build:demo

## Note

Next js applies environment variables only during `build` and `dev`. The `start` command doesn't declare or accept explicit environment vars, except that which were declared before running the `build` command.

Should you want to change the environment variables, the `build` or `dev` command must be rerun.

**ALL** the `local` and `global` environment variables should be declared on the `.env` file on the project root.
