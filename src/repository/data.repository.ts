import { Repository } from "typeorm";
import { IRepository } from "../core/abstracts/generic.repository";
import { AppDataSource } from "../core/data-source";
import { ApplicationError, ErrorTypes } from "../core/errors";

export class EntityRepository<T> implements IRepository<T> {
    private repository: Repository<T>

    public constructor(private entity: any) {
        this.repository = AppDataSource.getRepository(entity);
    }

    async create(item: T): Promise<T> {
        try {
            return await this.repository.save(item);
        } catch (error: any) {
            throw new ApplicationError(ErrorTypes.InternalError());
        }   
    }

    async findAll(): Promise<T[]> {
        try {
            const result = await this.repository.find();
            if (result.length == 0) throw Error;

            return result;
        } catch (error: any) {
            throw new ApplicationError(ErrorTypes.NotFound());
        }
    }

    async find(filters: any): Promise<T> {
        try {
            const result = await this.repository
            .createQueryBuilder()
            .where(filters)
            .loadAllRelationIds()
            .getOneOrFail();
        
        return result;
        } catch (error) {
            throw new ApplicationError(ErrorTypes.NotFound());
        }
    }

    async update(userId: number, input: any): Promise<void> {
        const result = await this.repository.update(userId, input);
        if(result.affected == 0) {
            throw new ApplicationError(ErrorTypes.NotFound());
        }
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.delete(id);
        if(result.affected == 0) {
            throw new ApplicationError(ErrorTypes.NotFound());
        }
    }
}