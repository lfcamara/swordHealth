import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export namespace TaskBusiness {
    export enum Status {
        TODO = 'To Do',
        DONE = 'Done'
    }

    export interface ICreate {
        ownerId: number;
        summary: string;
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
            newTask.ownerId = props.ownerId;
            return newTask;
        }
    }
}