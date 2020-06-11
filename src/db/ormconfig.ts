import { ConnectionOptions } from "typeorm";
import doenv from "dotenv";
import Program from "./entity/program.entity";

doenv.config();

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/**/*.entity.js"],
  cli: {
    entitiesDir: "src/db/entity/",
    migrationsDir: "src/db/migrations/",
  },
  synchronize: true,
};

export = config;
