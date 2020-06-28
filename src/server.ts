import { createConnection } from "typeorm";

import config from "./db/ormconfig";
import App from "./app";
import seed from "./db/seed";

const connectAndStart = () => {
  return createConnection(config).then(async (connection) => {
    console.log("Successful postgres connection");
    await connection.dropDatabase();
    await connection.synchronize();
    await seed();
    const server = App.getInstance;
    server.init();
  });
};

const connectTry = async (retries: any = 6) => {
  await new Promise((resp) => setTimeout(resp, 5000));
  while (retries) {
    try {
      await connectAndStart();
      break;
    } catch (error) {
      retries -= 1;
      console.log(`Connection Error. Retries left: ${retries}`);
      console.log({ error });
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
connectTry(6);
