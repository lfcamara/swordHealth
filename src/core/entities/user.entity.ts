import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export namespace UserBusiness {
    export enum Roles {
        MANAGER = 'Manager',
        TECH = 'Tech'
    }

    export interface ICreateOrUpdate {
        name: string,
        role: UserBusiness.Roles
    }

    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string

        @Column()
        role: UserBusiness.Roles

        @CreateDateColumn({
            name: 'created_at'
        })
        createdAt: Date

        @UpdateDateColumn({ 
            name: 'updated_at'
        })
        updatedAt: Date

        private constructor() {}

        public static compose(props: UserBusiness.ICreateOrUpdate): UserBusiness.User {
            let newUser = new UserBusiness.User();
            newUser.name = props.name;
            newUser.role = props.role;
            return newUser;
        }
    }  
}