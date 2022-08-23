import { IRepository } from "../../core/abstracts/generic.repository"
import { TaskBusiness } from "../../core/entities/taks.entity"
import { UserBusiness } from "../../core/entities/user.entity"
import { TasksService } from "../tasks.service"
import { UsersService } from "../users.service"

describe("Ensure Tasks Service works", () => {
    let tasksRepository: IRepository<TaskBusiness.Task>
    let usersRepository: IRepository<UserBusiness.User>
    let tasksService: TasksService;
    let usersService: UsersService;
    
    beforeEach(() => {
        tasksRepository = <IRepository<TaskBusiness.Task>><unknown>({
            findAll: jest.fn().mockResolvedValue(MOCK_TASKS_LIST),
            find: jest.fn().mockResolvedValue(MOCK_TASK),
            update: jest.fn().mockResolvedValue(MOCK_UPDATED_TASK),
            delete: jest.fn().mockResolvedValue(MOCK_DELETE_RETURN),
            create: jest.fn().mockResolvedValue(MOCK_TASK)
        });

        usersRepository = <IRepository<UserBusiness.User>><unknown>({
            find: jest.fn().mockResolvedValue(MOCK_TECH_USER)
        })

        usersService = new UsersService(usersRepository);
        tasksService = new TasksService(tasksRepository, usersService);
    })
    it("should return all tasks", async() => {
        const result = await tasksService.findAll()

        expect(result).toBe(MOCK_TASKS_LIST);
    });

    it("should return an error if no tasks were found", async() => {
        tasksRepository.findAll = jest.fn().mockResolvedValue([]);

        try {
            await tasksService.findAll()
        } catch (error: any) {
            expect(error.status).toBe(404);
        }
    })

    it("should return an especific task", async() => {
        const result = await tasksService.find({id: 1});

        expect(result).toBe(MOCK_TASK);
    });

    it("should update a task", async() => {
        tasksRepository.find = jest.fn().mockResolvedValue(MOCK_UPDATED_TASK);

        const spyCheckUser = jest.spyOn(tasksService, "checkIfIsSameUser");
        const spyUpdate = jest.spyOn(tasksRepository, "update");
        const spyFind = jest.spyOn(tasksRepository, "find");

        const result = await tasksService.update(1, UPDATE_INPUT);

        expect(spyCheckUser).toHaveBeenCalled();
        expect(spyUpdate).toHaveBeenCalled();
        expect(result).toBe(MOCK_UPDATED_TASK);
        expect(spyFind).toBeCalledTimes(2);
    });

    it("should not update a task from another user", async() => {
        const spyCheckUser = jest.spyOn(tasksService, "checkIfIsSameUser");
        const spyUpdate = jest.spyOn(tasksRepository, "update");

        try {
            await tasksService.update(2, UPDATE_INPUT);
        } catch (error) {
            expect(error.status).toBe(403);
            expect(spyCheckUser).toHaveBeenCalled();
            expect(spyUpdate).not.toHaveBeenCalled();
        }       
    });

    it("should delete a task", async() => {
        await expect(tasksService.delete(2)).resolves.not.toThrow();
    });

    it("should create a new task", async() => {
        const spyEntity = jest.spyOn(TaskBusiness.Task, "compose");

        const result = await tasksService.create(TASK_INPUT);

        expect(spyEntity).toHaveBeenCalled();
        expect(result).toBe(MOCK_TASK);
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

const MOCK_TASKS_LIST: TaskBusiness.Task[] = [
    {
        id: 1,
        summary: "First Task",
        status: TaskBusiness.Status.DONE,
        user: MOCK_TECH_USER,
        createdAt: new Date(),
        updatedAt: new Date() 
    },
    {
        id: 2,
        summary: "Second Task",
        status: TaskBusiness.Status.TODO,
        user: MOCK_TECH_USER,
        createdAt: new Date(),
        updatedAt: new Date() 
    },
]

const MOCK_TASK: TaskBusiness.Task = {
    id: 1,
    summary: "First Task",
    status: TaskBusiness.Status.TODO,
    user: MOCK_TECH_USER,
    createdAt: new Date(),
    updatedAt: new Date() 
}

const MOCK_UPDATED_TASK: TaskBusiness.Task = {
    id: 1,
    summary: "Update Task",
    status: TaskBusiness.Status.DONE,
    user: MOCK_TECH_USER,
    createdAt: new Date(),
    updatedAt: new Date() 
}

const TASK_INPUT: TaskBusiness.ICreate = {
    userId: 1,
    summary: "First Task" 
}

const UPDATE_INPUT: TaskBusiness.IUpdate = {
    id: 1,
    summary: "Update Task",
    status: TaskBusiness.Status.DONE
}

const MOCK_DELETE_RETURN = {
    affected: 1
}