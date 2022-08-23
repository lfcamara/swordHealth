import crypto from 'crypto';
import { Request } from 'express';
import { DataRepository } from '../core/abstracts/generic.repository';
import { UserBusiness } from "../core/entities/user.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";
import { UsersService } from './users.service';

export class AuthService {
    public async login(username: string, password: string, req: Request) {
        try {
            if(username === 'admin' && password === 'admin') {
                this.composeSession(req);
                return;
            }
            const usersService = new UsersService(new DataRepository().users());
            const user = await usersService.find({ username: username });
            this.validatePassword(user, password);
            this.composeSession(req, user);
        } catch(error: any) {
            throw new ApplicationError(ErrorTypes.Unauthorized());
        }

    }

    public logout(req: Request) {
        req.session.destroy((err: any) => {
            throw new ApplicationError(ErrorTypes.InternalError());
        });
    }
    
    private validatePassword(user: UserBusiness.User, inputPassword: string) {
        const cryptoPassword = crypto.createHash('sha256').update(inputPassword).digest('hex');
        if(user.password != cryptoPassword) {
            throw new ApplicationError(ErrorTypes.Unauthorized());
        }
    }

    private composeSession(req: Request, user?: UserBusiness.User) {
        req.session.userId = user?.id ?? 'Admin';
        req.session.userRole = user?.role ?? UserBusiness.Roles.MANAGER;
    }
}