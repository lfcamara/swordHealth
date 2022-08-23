import { IRepository } from "../../core/abstracts/generic.repository"
import { UserBusiness } from "../../core/entities/user.entity"
import { UsersService } from "../users.service";

describe("Ensure Users Service works", () => {
    let usersRepository: IRepository<UserBusiness.User>
    let usersService: UsersService;

    beforeEach(() => {
        usersRepository = <IRepository<UserBusiness.User>><unknown>({
            create: jest.fn().mockResolvedValue(MOCK_TECH_USER),
            findAll: jest.fn().mockResolvedValue(MOCK_USERS_LIST),
            find: jest.fn().mockResolvedValue(MOCK_TECH_USER),
            update: jest.fn().mockResolvedValue(MOCK_UPDATED_USER),
            delete: jest.fn().mockResolvedValue(MOCK_DELETE_RETURN)
        })

        usersService = new UsersService(usersRepository);
    })

    it("should return all users", async() => {
        usersService.find = jest.fn().mockResolvedValue(MOCK_TECH_USER);

        const result = await usersService.findAll()

        expect(result).toBe(MOCK_USERS_LIST);
    });
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

const MOCK_USERS_LIST: UserBusiness.User[] = [
    {
        id: 1,
        role: UserBusiness.Roles.TECH,
        username: "user1",
        password: "user1",
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        role: UserBusiness.Roles.TECH,
        username: "user2",
        password: "user2",
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
]



const MOCK_UPDATED_USER: UserBusiness.User = {
    id: 1,
    role: UserBusiness.Roles.TECH,
    username: "userUpdated",
    password: "user1",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date()
}

const MOCK_DELETE_RETURN = {
    affected: 1
}