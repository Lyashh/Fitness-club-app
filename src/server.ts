import { createConnection } from "typeorm";

import config from "./db/ormconfig";
import App from "./app";

const connectAndStart = () => {
  return createConnection(config).then(() => {
    console.log("Successful postgres connection");
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
