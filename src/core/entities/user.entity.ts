import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import crypto from "crypto";

export namespace UserBusiness {
    export enum Roles {
        MANAGER = 'Manager',
        TECH = 'Tech'
    }

    export interface ICreate {
        username: string,
        password: string,
        role?: UserBusiness.Roles
    }

    export interface IUpdate {
        username?: string,
        password?: string,
        role?: UserBusiness.Roles
    }

    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        username: string
        
        @Column()
        password: string

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

        public static compose(props: UserBusiness.ICreate): UserBusiness.User {
            let newUser = new UserBusiness.User();
            newUser.username = props.username;
            newUser.password = crypto.createHash('sha256').update(props.password).digest('hex');
            newUser.role = props.role ? props.role : UserBusiness.Roles.TECH;
            return newUser;
        }
    }  
}