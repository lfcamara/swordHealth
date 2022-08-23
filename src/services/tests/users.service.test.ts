import { rejects } from "assert";
import { IRepository } from "../../core/abstracts/generic.repository"
import { TaskBusiness } from "../../core/entities/taks.entity";
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
    });

    it("should return all users", async() => {
        const result = await usersService.findAll(); 

        expect(result).toBe(MOCK_USERS_LIST);
    });

    it("should return an error if no users were found", async() => {
        usersRepository.findAll = jest.fn().mockResolvedValue([]);

        try {
            await usersService.findAll()
        } catch (error: any) {
            expect(error.status).toBe(404);
        }
    });

    it("should return an especific user", async() => {
        const result = await usersService.find({ id: 1 });

        expect(result).toBe(MOCK_TECH_USER);
    });

    it("should update an user", async() => {
        usersRepository.find = jest.fn().mockResolvedValue(MOCK_UPDATED_USER);

        const result = await usersService.update(1, { username: "userUpdated" });

        delete MOCK_UPDATED_USER.password;
        expect(result).toBe(MOCK_UPDATED_USER);
    });

    it("should delete an user", async() => {
        await expect(usersService.delete(2)).resolves.not.toThrow();
    });

    it("should not create an user that already exists", async() => {
        try {
            await usersService.create(INPUT_USER);
        } catch (error: any) {
            expect(error.status).toBe(403); 
        }    
    });

    it("should create an user", async() => {
        usersRepository.find = jest.fn().mockRejectedValue(null);
        usersRepository.create = jest.fn().mockResolvedValue(MOCK_NEW_USER)
        const spyEntity = jest.spyOn(UserBusiness.User, "compose");

        const result = await usersService.create(INPUT_USER);

        expect(spyEntity).toHaveBeenCalled();
        expect(result).toBe(MOCK_NEW_USER);
    })
})

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

const MOCK_TECH_USER: UserBusiness.User = {
    id: 1,
    role: UserBusiness.Roles.TECH,
    username: "user1",
    password: "user1",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date()
}

const MOCK_TASK: TaskBusiness.Task = {
    id: 1,
    summary: "First Task",
    status: TaskBusiness.Status.TODO,
    user: MOCK_TECH_USER,
    createdAt: new Date(),
    updatedAt: new Date() 
}

const INPUT_USER: UserBusiness.ICreate = {
    username: "user3",
    password: "user3"
}

const MOCK_NEW_USER: UserBusiness.User = {
    id: 3,
    role: UserBusiness.Roles.TECH,
    username: "user3",
    password: "user3",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date()
}