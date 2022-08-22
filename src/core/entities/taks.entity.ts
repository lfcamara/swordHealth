import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserBusiness } from "./user.entity";

export namespace TaskBusiness {
    export enum Status {
        TODO = 'To Do',
        DONE = 'Done'
    }

    export interface ICreate {
        userId: number;
        summary: string;
        user? :UserBusiness.User
    }

    export interface IUpdate {
        id: number
        summary?: string;
        status?: TaskBusiness.Status;
    }
    @Entity()
    export class Task {
        @PrimaryGeneratedColumn()
        id: number;

        @ManyToOne(() => UserBusiness.User, (user) => user.tasks, {
            cascade: true,
        })
        user: UserBusiness.User

        @Column({
            length: 2500
        })
        summary: string

        @Column()
        status: TaskBusiness.Status = TaskBusiness.Status.TODO

        @CreateDateColumn({
            name: 'created_at'
        })
        createdAt: Date

        @UpdateDateColumn({ 
            name: 'updated_at'
        })
        updatedAt: Date

        private constructor() {}

        public static compose(props: TaskBusiness.ICreate): TaskBusiness.Task {
            let newTask = new TaskBusiness.Task();
            newTask.summary = props.summary;
            newTask.user = props.user;
            return newTask;
        }
    }
}