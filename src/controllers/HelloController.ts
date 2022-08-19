import { Request, Response } from "express";

export class HelloController {
    public hello(req: Request, res: Response) {
        res.send('Hello World');
    }
}