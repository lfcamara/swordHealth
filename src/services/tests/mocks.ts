import { IRepository } from "../../core/abstracts/generic.repository";
import { UserBusiness } from "../../core/entities/user.entity";
import { UsersService } from "../users.service";

export const usersRepository = <IRepository<UserBusiness.User>>(<unknown>{
    find: jest.fn()
})

export const usersService = <UsersService>(<unknown>{
    find: jest.fn()
})
const MOCK_TECH_USER: UserBusiness.User = {
    id: 1,
    role: UserBusiness.Roles.TECH,
    username: "user1",
    password: "user1",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date()
}