import { NextFunction, Request, Response } from "express";
import { UserBusiness } from "../core/entities/user.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";

export class AuthMiddleware {
    static checkAuthentication(req: Request, res: Response, next: NextFunction) {
        if(req.sessionID && req.session.userId) next();
        else {
            const error = new ApplicationError(ErrorTypes.Unauthorized());
            res.status(error.status).json(error);
        }
    }

    static checkPermissions(req: Request, res: Response, next: NextFunction) {
        if(req.session.userRole == UserBusiness.Roles.MANAGER) {
            return next();
        }
        if(req.session.userId == req.params.id && req.method !== 'DELETE') return next();
        else {
            const error = new ApplicationError(ErrorTypes.Forbidden());
            res.status(error.status).json(error);   
        }
    }
}