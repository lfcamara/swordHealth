import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateTaskDTO } from "../dtos/create-task.dto";

export enum TaskStatus {
    TODO = 'To Do',
    DOING = 'Doing',
    DONE = 'Done'
}

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //TODO: Relation with user
    @Column({
        name: 'owner_id'
    })
    ownerId: number

    @Column({
        length: 2500
    })
    summary: string

    @Column()
    status: TaskStatus = TaskStatus.TODO

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date

    @UpdateDateColumn({ 
        name: 'updated_at'
    })
    updatedAt: Date

    private constructor() {
        super();
    }

    public static compose(props: CreateTaskDTO): Task {
        let newTask = new Task();
        newTask.summary = props.summary;
        newTask.ownerId = props.ownerId;
        return newTask;
    }
}