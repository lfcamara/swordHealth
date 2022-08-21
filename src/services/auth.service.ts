import crypto from 'crypto';
import { Request } from 'express';
import { DataRepository } from '../core/abstracts/generic.repository';
import { UserBusiness } from "../core/entities/user.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";
import { UsersService } from './users.service';

export class AuthService {
    public async login(username: string, password: string, req: Request) {
        const usersService = new UsersService(new DataRepository().users());
        const user = await usersService.find({ username: username });
        this.validatePassword(user, password);
        this.composeSession(req, user);
    }
    
    private validatePassword(user: UserBusiness.User, inputPassword: string) {
        const cryptoPassword = crypto.createHash('sha256').update(inputPassword).digest('hex');
        if(user.password != cryptoPassword) {
            throw new ApplicationError(ErrorTypes.Unauthorized());
        }
    }

    private composeSession(req: Request, user: UserBusiness.User) {
        req.session.user.id = user.id;
        req.session.user.role = user.role;
    }
}