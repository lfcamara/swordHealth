import { DataSource } from "typeorm";
import { TaskBusiness } from "./entities/taks.entity";
import { UserBusiness } from "./entities/user.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "swordhealth",
    synchronize: true,
    entities: [
        TaskBusiness.Task,
        UserBusiness.User
    ]
});