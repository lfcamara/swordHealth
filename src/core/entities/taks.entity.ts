import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export namespace Task {
    export enum Status {
        TODO = 'To Do',
        DONE = 'Done'
    }

    export interface ICreate {
        ownerId: number;
        summary: string;
    }

    export interface IUpdate {
        summary?: string;
        status?: Task.Status;
    }
    @Entity()
    export class Model {
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
        status: Task.Status = Task.Status.TODO

        @CreateDateColumn({
            name: 'created_at'
        })
        createdAt: Date

        @UpdateDateColumn({ 
            name: 'updated_at'
        })
        updatedAt: Date

        private constructor() {}

        public static compose(props: Task.ICreate): Task.Model {
            let newTask = new Task.Model();
            newTask.summary = props.summary;
            newTask.ownerId = props.ownerId;
            return newTask;
        }
    }
}