import { TaskStatus } from "../entities/taks.entity";

export interface CreateTaskDTO {
    ownerId: number;
    summary: string;
    status?: TaskStatus
}