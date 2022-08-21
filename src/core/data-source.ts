import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "swordhealth",
    synchronize: true,
    entities: [
        "../entities/*.ts",
        "../../dist/src/entities/*.js"
    ]
})