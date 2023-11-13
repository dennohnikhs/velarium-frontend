const { default: configure } = require("./env/configure");
const { join } = require("path");

const ENV = process.env.ENV ?? "wip";
configure(ENV);

const PORT = process.env.PORT ?? 4210;

if (!["wip", "demo", "prod"].includes(ENV))
  throw "Cannot start server using the ENV provided.";
//

module.exports = {
  apps: [
    {
      autorestart: false,
      script: "yarn start",
      name: `MyCoin ${ENV}`,
      error_file: join(__dirname, "error.log"),
      env: {
        PORT,
        ENV,
      },
    },
  ],
};
