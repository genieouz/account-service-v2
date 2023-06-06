import { BadRequestException } from "@nestjs/common";
import { isMongoId } from "class-validator";
import { ObjectId } from "mongodb";

export const validOrFailMongoId = (id: string) => {
  if (!isMongoId(id)) {
    throw new BadRequestException(null, "You must provide valid id");
  }
};

export const toObjectID = (id: string | ObjectId): ObjectId => {
  return typeof id === "string" ? new ObjectId(id) : id;
};

export * from "./axios";
