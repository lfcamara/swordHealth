import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const authService = new AuthService();
            await authService.login(username, password, req);
            res.status(200).json({ message: "Login Successful" });
        } catch (error: any) {
            res.status(error.status || 500).json(error || { message: "Internal Server Error"});
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            const authService = new AuthService();
            authService.logout(req);
            
            res.status(200).json({ message: "Logout Successful "});
        } catch(error: any) {
            res.status(error.status).json(error);
        } 
    }
}