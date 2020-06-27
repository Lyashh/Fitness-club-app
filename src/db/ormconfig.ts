import { ConnectionOptions } from "typeorm";
import doenv from "dotenv";

doenv.config();

const config: ConnectionOptions = {
  type: "postgres",
  //url: "postgresql://admin:admin@db:5432/tutorial",
  host: process.env.DOCKER_POSTGRES_HOST,
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
