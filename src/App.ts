import express from 'express';
import { AppDataSource } from './core/data-source';
import helloRouter from './routes/HelloRouter';
import tasksRouter from './routes/tasks.router';
import userRouter from './routes/users.router';

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
        AppDataSource.initialize().then(() => {
            console.log("App connected to database");
        }).catch((error) => {
            console.error("Error connecting to database. Details:", error);
        })
    }

    private routes() {
        this.router.use('/hello', helloRouter);
        this.router.use('/tasks', tasksRouter);
        this.router.use('/users', userRouter);
        this.express.use(this.router);
    }
}

export default new App().express;