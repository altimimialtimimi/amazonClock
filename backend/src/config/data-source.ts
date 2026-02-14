import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Product } from "../models/Product";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, "..", "..", "database.sqlite"),
    synchronize: true,
    logging: false,
    entities: [User, Product],
    migrations: [],
    subscribers: [],
});
