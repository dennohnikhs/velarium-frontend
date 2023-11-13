const dotenv = require("dotenv");
let env = process.env.ENV || "dev";

module.exports = {
  default: function () {
    console.log('env:',env);
    // if (env === "dev") return dotenv.config();
    // if (!env) process.env["ENV"] = "dev";

    const path = __dirname + `/${env}.env`;
    const { parsed, error } = dotenv.config({
      path,
      debug: true,
      override: true,
    });

    if (!error) {
      for (const k in parsed) {
        process.env[k] = parsed[k];
      }
    }
  },
};
