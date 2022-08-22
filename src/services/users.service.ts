import { IRepository } from "../core/abstracts/generic.repository";
import { UserBusiness } from "../core/entities/user.entity";
import crypto from 'crypto';
import { ApplicationError, ErrorTypes } from "../core/errors";

export class UsersService {
    public constructor(private usersRepository: IRepository<UserBusiness.User>) {}
    
    public async create(input: UserBusiness.ICreate): Promise<UserBusiness.User> {
        const alreadyExists = await this.checkIfUserAlreadyExists(input.username);
        if(!alreadyExists){
            const newUser = UserBusiness.User.compose(input);
            return this.usersRepository.create(newUser);
        } else {
            throw new ApplicationError(ErrorTypes.Forbidden());
        }
    }

    public async findAll() {
        return this.usersRepository.findAll();
    }

    public async find(filters: any) {
        return this.usersRepository.find(filters);
    }

    public async update(userId: number, input: UserBusiness.IUpdate): Promise<UserBusiness.User> {
        if(input.password) input.password = crypto.createHash('sha256').update(input.password).digest('hex');
        await this.usersRepository.update(userId, input);
        const updatedUser = await this.find({ id: userId });
        delete updatedUser.password

        return updatedUser;
    }

    public async delete(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    private async checkIfUserAlreadyExists(username: string): Promise<boolean> {
        try {
            await this.find({ username: username });
            return true;
        } catch (error: any) {
            return false;
        }   
    }
}