import { DataSource } from "typeorm";
import { TaskBusiness } from "./entities/taks.entity";
import { UserBusiness } from "./entities/user.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "mysql",
    database: process.env.DB_DATABASE || "swordhealth",
    synchronize: true,
    logging: true,
    entities: [
        TaskBusiness.Task,
        UserBusiness.User
    ],
});