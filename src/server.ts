import { createConnection } from "typeorm";

import config from "./db/ormconfig";
import App from "./app";

createConnection(config)
  .then(() => {
    console.log("Successful postgres connection");
    const server = App.getInstance;
    server.init();
  })
  .catch((err) => {
    console.log(
      "Postgres connection error. Please make sure Postgres is running. " + err
    );
    process.exit();
  });
