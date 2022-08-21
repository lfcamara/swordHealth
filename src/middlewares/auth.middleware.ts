import { NextFunction, Request, Response } from "express";
import { UserBusiness } from "../core/entities/user.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";

export class AuthMiddleware {
    static checkAuthentication(req: Request, res: Response, next: NextFunction) {
        if(req.sessionID && req.session.user) next();
        else throw new ApplicationError(ErrorTypes.Unauthorized());
    }

    static checkPermissions(req: Request, res: Response, next: NextFunction) {
        if(req.session.user.role == UserBusiness.Roles.MANAGER) next();
        else throw new ApplicationError(ErrorTypes.Forbidden());
    }
}