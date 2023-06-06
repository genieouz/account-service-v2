import { Field, ID, InterfaceType, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "bson";
import { BeforeUpdate, Column, ObjectIdColumn } from "typeorm";

@InterfaceType()
export class ChangedBy {
  @Field((type) => ID)
  @Column()
  user_id: string;

  @Field()
  @Column()
  source: string;
}

@ObjectType()
export abstract class BaseSchema {
  @Field(() => ID, { description: "Identtify element ", nullable: true })
  @ObjectIdColumn()
  _id: ObjectId;

  @Field({ description: "Is deleted" })
  @Column()
  isDeleted: boolean;

  @Field({ description: "Created at" })
  @Column()
  createdAt: string;

  @Field({ description: "Updated at" })
  @Column()
  updatedAt: string;

  @Field((type) => ChangedBy, { description: "User who created the record" })
  @Column()
  createdBy: ChangedBy;

  @Field((type) => ChangedBy, { description: "User who changed the record" })
  @Column()
  editedBy: ChangedBy;

  constructor(partial?: Partial<BaseSchema>) {
    if (partial) {
      Object.assign(this, partial);
    }
    this.isDeleted = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  @BeforeUpdate()
  updateDate?() {
    this.updatedAt = new Date().toISOString();
  }
}
