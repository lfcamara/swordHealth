import { IRepository } from "../core/abstracts/generic.repository";
import { UserBusiness } from "../core/entities/user.entity";
import crypto from 'crypto';
import { ApplicationError, ErrorTypes } from "../core/errors";
import { Request } from "express";
import { AuthService } from "./auth.service";

export class UsersService {
    public constructor(private usersRepository: IRepository<UserBusiness.User>) {}
    
    public async create(input: UserBusiness.ICreate): Promise<UserBusiness.User> {
        const newUser = UserBusiness.User.compose(input);
        return this.usersRepository.create(newUser);
    }

    public async findAll() {
        return this.usersRepository.findAll();
    }

    public async find(filters: any) {
        return this.usersRepository.find(filters);
    }

    public async update(input: UserBusiness.IUpdate): Promise<UserBusiness.User> {
        return this.usersRepository.update(input); 
    }

    public async delete(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}