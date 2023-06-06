import { BadRequestException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isMongoId } from "class-validator";
import { ObjectId } from "mongodb";
import { EMessage } from "src/common/typeDefs/index";
import { generateUid } from "src/utils/generate-code";
import { DeepPartial, MongoRepository, ObjectLiteral } from "typeorm";
import { BaseSchema } from "../schema";

export class AbstractService<E extends BaseSchema> {
  protected repo: MongoRepository<E>;
  constructor(@InjectRepository(MongoRepository) repo: MongoRepository<E>) {
    this.repo = repo;
  }

  public async create(payload: any): Promise<E> {
    const resource = this.repo.create(payload);

    return this.repo.save(resource as unknown as DeepPartial<E>);
  }

  async update(id: string, payload: any): Promise<E> {
    this.validOrFailId(id);

    const updated = await this.repo.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      { returnDocument: "before" }
    );
    if (!updated.ok) throw new UnprocessableEntityException(null, "Update operation failed");

    return updated.value as E;
  }

  async findOne(id: string): Promise<E> {
    return await this.repo.findOne({ where: { _id: id } });
  }

  async findById(id: string): Promise<E> {
    this.validOrFailId(id);

    const resource = await this.repo.findOne({ where: { id: new ObjectId(id), isDeleted: false } });

    if (!resource) throw new NotFoundException(null, "Ressource not found");

    return resource;
  }

  public async delete(id: string): Promise<E> {
    const resource = await this.findById(id);
    resource.isDeleted = true;

    const deleted = await this.repo.findOneAndUpdate(
      { _id: resource._id },
      { $set: { isDeleted: true } },
      { returnDocument: "before" }
    );
    if (!deleted.ok) throw new UnprocessableEntityException(null, "Deletion failed");
    return resource;
  }

  validOrFailId(id) {
    if (!isMongoId(id)) {
      throw new BadRequestException(null, "You must provide valid id");
    }
  }

  public async generateCode(type: EMessage): Promise<string> {
    const firstCode = {
      [EMessage.Mail]: "PP-EM-000001",
      [EMessage.Sms]: "PP-SMS-000001"
    };
    const data = (
      await this.repo.find({
        take: 1,
        select: ["uid"],
        order: { createdAt: "DESC", _id: "DESC" }
      } as any)
    )[0];
    return data ? generateUid(type, data["uid"]) : firstCode[type];
  }

  public async findOneByFields(payload: Partial<E>) {
    return this.repo.findOne({ where: payload });
  }

  public async findByFields(payload: ObjectLiteral, projection?: (keyof E)[]) {
    return this.repo.find({
      where: { ...payload },
      select: projection
    });
  }

  public async findByIds(ids: ObjectId[]) {
    return this.repo.findByIds(ids);
  }

  public async isExist(query: Partial<E>) {
    const isExist = await this.repo.findOne({ where: query });
    return !!isExist;
  }
}
