import { IRepository } from "../core/abstracts/generic.repository";
import { UserBusiness } from "../core/entities/user.entity";
import crypto from 'crypto';
import { ApplicationError, ErrorTypes } from "../core/errors";

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

    public async login(username: string, password: string) {
        const user = await this.find({ username: username });
        const checked = this.validatePassword(user, password);
    }

    private validatePassword(user: UserBusiness.User, inputPassword: string) {
        const cryptoPassword = crypto.createHash('sha256').update(inputPassword).digest('hex');
        if(user.password != cryptoPassword) {
            throw new ApplicationError(ErrorTypes.Unauthorized());
        }
    }
}