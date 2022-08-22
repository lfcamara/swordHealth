import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
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
        this.subscribeEvents();
    }

    private middlewares() {
        this.express.use(helmet());
        this.express.use(express.json());
        this.express.use(session({
            name: 'swid',
            secret: 'swordhealth',
            resave: false,
            saveUninitialized: false
        }))
    }

    private database() {
        async function connect() {
            await AppDataSource.initialize();
        }

        function establishConnection() {
            connect().then(() => {
                console.log("App connected to database");
            }).catch((error) => {
                console.error("Error connecting to database. Details:", error);
                console.log('Retrying connection...');
                setTimeout(establishConnection, 5000);
            })
        }

        establishConnection();
    }

    private routes() {
        this.router.use('/auth', authRouter);
        this.router.use('/tasks', AuthMiddleware.checkAuthentication, tasksRouter);
        this.router.use('/users', AuthMiddleware.checkAuthentication, userRouter);
        this.express.use(this.router);
    }

    private subscribeEvents() {
	    process
            .on("unhandledRejection", (reason, p) => {
		        console.error(`Unhandled Rejection at ${JSON.stringify(p)}. Reason: ${reason}`);
		    })
		    .on("uncaughtException", (err, origin) => {
			    console.error("Uncaught Exception thrown", err);
			    console.error("Uncaught Exception Origin", origin);
		    });
	    console.info("App subscribed to Error Handler events");
    }
}

export default new App().express;