import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const authService = new AuthService();
            await authService.login(username, password, req);
            res.status(204);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async logout(req: Request, res: Response) {
        req.session.destroy((err: any) => {
            res.send(500).json({ message: "Logout Error ", details: err});
        });
        
        res.send(200).json({ message: "Logout Successful "});   
    }
}