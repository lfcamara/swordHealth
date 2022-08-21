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
        return this.repository.find();
    }

    async find(id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async update(input: any) {
        // TODO: Validar affected e lancar erro caso nenhuma linha tenha sido alterada
        const result = await this.repository.update(input.id, input);
        return result;
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}