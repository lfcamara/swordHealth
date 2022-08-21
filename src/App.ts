import express from 'express';
import session from 'express-session';
import { AppDataSource } from './core/data-source';
import { AuthMiddleware } from './middlewares/auth.middleware';
import authRouter from './routes/auth.router';
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
        this.express.use(session({
            name: 'swid',
            secret: 'swordhealth',
            resave: false,
            saveUninitialized: false
        }))
    }

    private database() {
        AppDataSource.initialize().then(() => {
            console.log("App connected to database");
        }).catch((error) => {
            console.error("Error connecting to database. Details:", error);
        })
    }

    private routes() {
        this.router.use('/auth', authRouter);
        this.router.use('/tasks', AuthMiddleware.checkAuthentication, tasksRouter);
        this.router.use('/users', AuthMiddleware.checkAuthentication, userRouter);
        this.express.use(this.router);
    }
}

export default new App().express;