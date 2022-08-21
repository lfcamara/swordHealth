import { DataSource } from "typeorm";
import { Task } from "./entities/taks.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "swordhealth",
    synchronize: true,
    entities: [
        Task.Model
    ]
});