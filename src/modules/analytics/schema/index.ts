import { ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { ParcelExportFields } from "../enum/";

@Entity({
  name: "DataForAnalyticsV1",
  orderBy: {
    createdAt: "DESC"
  }
})
@ObjectType()
export class AnalyticsData {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  [ParcelExportFields.uid]: string;

  @Column()
  [ParcelExportFields.country]?: string;

  @Column()
  [ParcelExportFields.aging]?: number;

  @Column()
  [ParcelExportFields.deliveryDate]?: string;

  @Column()
  [ParcelExportFields.returnDate]?: string;

  @Column()
  [ParcelExportFields.lastOpsUpdate]?: Date | string;

  @Column()
  [ParcelExportFields.reconcilDate]?: string;

  @Column()
  [ParcelExportFields.reconcilAgent]?: string;

  @Column()
  [ParcelExportFields.lastUpdatePapserDate]?: Date | string;

  @Column()
  [ParcelExportFields.lastUpdatePapser]?: string;

  @Column()
  [ParcelExportFields.lastUpdatePapserPhone]?: string;

  @Column()
  [ParcelExportFields.collectionByCashierDate]?: string;

  @Column()
  [ParcelExportFields.lastOpsUpdateName]?: string;

  @Column()
  [ParcelExportFields.lastOpsUpdatePhone]?: string;

  @Column()
  [ParcelExportFields.slots]?: string;

  @Column()
  [ParcelExportFields.size]?: string;

  @Column()
  [ParcelExportFields.attempts]?: number;

  @Column()
  [ParcelExportFields.attemptsReal]?: number;

  @Column()
  [ParcelExportFields.creation]?: Date | string;

  @Column()
  [ParcelExportFields.scheduledAt]?: string;

  @Column()
  [ParcelExportFields.pickupDate]?: string;

  @Column()
  [ParcelExportFields.amountToCollect]?: number;

  @Column()
  [ParcelExportFields.status]?: string;

  @Column()
  [ParcelExportFields.lastReason]?: string;

  @Column()
  [ParcelExportFields.description]?: string;

  @Column()
  [ParcelExportFields.lastHandedoverDateTime]?: Date | string;

  @Column()
  [ParcelExportFields.pickupAssignement]?: string;

  @Column()
  [ParcelExportFields.tag]?: string;

  @Column()
  [ParcelExportFields.platform]?: string;

  // Client Fields

  @Column()
  [ParcelExportFields.clientCompanyName]?: string;

  @Column()
  [ParcelExportFields.clientPhoneNumber]?: string;

  @Column()
  [ParcelExportFields.clientAddress]?: string;

  @Column()
  [ParcelExportFields.clientCity]?: string;

  @Column()
  [ParcelExportFields.clientCountry]?: string;

  @Column()
  [ParcelExportFields.clientStorage]?: string[] | string;

  // Receivers Fields

  @Column()
  [ParcelExportFields.receiverName]?: string;

  @Column()
  [ParcelExportFields.receiverPhoneNumber]?: string;

  @Column()
  [ParcelExportFields.receiverAddress]?: string;

  @Column()
  [ParcelExportFields.receiverCity]?: string;

  @Column()
  [ParcelExportFields.receiverCountry]?: string;

  @Column()
  [ParcelExportFields.returnedTo]?: string;

  @Column()
  [ParcelExportFields.returnedPhone]?: string;

  @Column()
  [ParcelExportFields.returnedAdress]?: string;

  @Column()
  [ParcelExportFields.returnedCity]?: string;

  @Column()
  [ParcelExportFields.returnedCountry]?: string;

  // Driver Fields

  @Column()
  [ParcelExportFields.lastDriverName]?: string;

  @Column()
  [ParcelExportFields.lastDriverPhone]?: string;

  @Column()
  [ParcelExportFields.lastDriverUid]?: string;

  @Column()
  [ParcelExportFields.vehicleType]?: string;

  @Column()
  [ParcelExportFields.lastConveyorName]?: string;

  @Column()
  [ParcelExportFields.lastConveyorPhone]?: string;

  @Column()
  [ParcelExportFields.lastConveyorUid]?: string;

  @Column()
  [ParcelExportFields.lastPartner]?: string;

  // Orders Fields

  @Column()
  [ParcelExportFields.orderUid]?: string;

  @Column()
  [ParcelExportFields.orderNumberOfParcels]?: number;

  @Column()
  [ParcelExportFields.orderCreation]?: Date | string;

  @Column()
  [ParcelExportFields.orderSize]?: string;

  @Column()
  [ParcelExportFields.orderAmounToCollect]?: number;

  @Column()
  [ParcelExportFields.orderAmountCollected]?: string;

  @Column()
  [ParcelExportFields.orderStatus]?: string;

  // Runsheets Fields

  @Column()
  [ParcelExportFields.runsheetCreationDate]?: Date | string;

  @Column()
  [ParcelExportFields.runsheetUid]?: string;

  @Column()
  [ParcelExportFields.runsheetStatus]?: string;

  @Column()
  [ParcelExportFields.taskUidPickup]?: string;

  @Column()
  [ParcelExportFields.dateReceptionAtHub]?: string;

  @Column()
  [ParcelExportFields.receiverPhoneNumberAtHub]?: string;

  @Column()
  [ParcelExportFields.receiverAtHub]?: Date | string;
}
