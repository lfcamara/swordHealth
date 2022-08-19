import express from 'express';
import helloRouter from './routes/HelloRouter';


class App {
    public express: express.Application;
    public router: express.Router;

    public constructor() {
        this.express = express();
        this.router = express.Router();

        this.routes();
    }

    private routes() {
        this.router.use('/hello', helloRouter);
        this.express.use(this.router);
    }
}

export default new App().express;