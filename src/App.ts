import express from 'express';
import { DataSource } from 'typeorm';
import { Task } from './core/entities/taks.entity';
import helloRouter from './routes/HelloRouter';
import tasksRouter from './routes/tasks.router';

class App {
    public express: express.Application;
    public router: express.Router;

    public constructor() {
        this.express = express();
        this.router = express.Router();

        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
    }

    private database() {
        const AppDataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "mysql",
            database: "swordhealth",
            synchronize: true,
            entities: [
                Task
            ]
        });

        AppDataSource.initialize().then(() => {
            console.log("App connected to database");
        }).catch((error) => {
            console.error("Error connecting to database. Details:", error);
        })
    }

    private routes() {
        this.router.use('/hello', helloRouter);
        this.router.use('/tasks', tasksRouter);
        this.express.use(this.router);
    }
}

export default new App().express;