import { Repository } from "typeorm";
import { IRepository } from "../core/abstracts/generic.repository";
import { AppDataSource } from "../core/data-source";

export class EntityRepository<T> implements IRepository<T> {
    private repository: Repository<T>

    public constructor(private entity: any) {
        this.repository = AppDataSource.getRepository(entity);
    }
    async create(item: T): Promise<T> {
        return this.repository.save(item);
    }

    async findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async find(id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async update(input: any) {
        return this.repository
            .createQueryBuilder()
            .update()
            .set(input)
            .where({id : input.id})
            .execute()
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}