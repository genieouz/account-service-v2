import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isArray } from "class-validator";
import { unlink } from "fs";
import { OAuth2Client } from "google-auth-library";
import { createTransport } from "nodemailer";
import { ACCOUNTS_TASKS_EXPORT } from "src/constants";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, NODE_ENV } from "src/environments";
import { FindParcelsAnalyticDataDto, TasksExportInputQueries } from "../dto/index";
import { ParcelExportFields } from "../enum";
import { AnalyticsRepository } from "../repository";
import { AnalyticsData } from "../schema";
import { exportDateFormat, format, generatecsv, HeaderByType } from "../utils";

export const clientId = GOOGLE_CLIENT_ID;
export const clientSecret = GOOGLE_CLIENT_SECRET;
export const refreshToken = GOOGLE_REFRESH_TOKEN;
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsRepository) private repository: AnalyticsRepository,
    @Inject("OAuthClient") private readonly OAuthClient: OAuth2Client
  ) {}

  public async findParcelsData({ parcels, isCron = false }: FindParcelsAnalyticDataDto) {
    const dataForAnalytics = await this.repository
      .aggregateEntity([
        { $match: { "Parcel UID": { $in: parcels } } },
        {
          $addFields: {
            Platform: {
              $cond: { if: { $eq: ["$Parcel Created By.source", "STAFF"] }, then: "Paps Ops", else: "MyPaps" }
            }
          }
        },
        {
          $project: {
            _id: false,
            index: false,
            "Parcel Created By": false
          }
        }
      ])
      .toArray();
    const transformed = dataForAnalytics.map((record): AnalyticsData => {
      return {
        ...record,
        [ParcelExportFields.clientStorage]: isArray(record["Client Storage Option"])
          ? (record["Client Storage Option"] as string[]).join("-")
          : "N/A",
        [ParcelExportFields.lastOpsUpdate]: exportDateFormat(record["Parcel Last OPS Update"]),
        [ParcelExportFields.lastUpdatePapserDate]: exportDateFormat(record["Last Update Papser Date"]),
        [ParcelExportFields.creation]: exportDateFormat(record["Parcel Creation Date"]),
        [ParcelExportFields.orderCreation]: exportDateFormat(record["Order Creation Date"]),
        [ParcelExportFields.runsheetCreationDate]: exportDateFormat(record["Runsheet Creation Date"]),
        [ParcelExportFields.receiverAtHub]: exportDateFormat(record["Parcel Receiver At Hub"]),
        [ParcelExportFields.lastHandedoverDateTime]: exportDateFormat(record["Parcel Last HandedOver Date Time"])
      };
    });
    if (isCron) {
      const { data } = await generatecsv(Object.values(ParcelExportFields), transformed, "Parcel");
      if (data) await this.sendMailWithAttachments(data.title, data.filename, data.path);
      return null;
    }
    return JSON.stringify(transformed);
  }

  public async tasksExport(input: TasksExportInputQueries[]) {
    await Promise.all(
      input.map(async ({ type, data, title }) => {
        const { data: success } = await generatecsv(HeaderByType[type], JSON.parse(data) as any[], title);
        if (success) await this.sendMailWithAttachments(success.title, success.filename, success.path);
        return null;
      })
    );
  }

  async sendMailWithAttachments(title: string, filename: string, path: string) {
    try {
      const accessToken = (await this.OAuthClient.getAccessToken()).token;
      const transporter = createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "abdoulayendiaye@paps-app.com", // @TODO Change Email (Use paps mail)
          clientId,
          clientSecret,
          refreshToken,
          accessToken
        }
      });
      const html = `
          <div><h3> PAPS : File ${filename}</h3></div>
          <div>In attached file:</div>
      `;
      const accounts = ACCOUNTS_TASKS_EXPORT.filter(({ env }) => env === NODE_ENV);
      const mails = accounts.map((account) => account.emails).flat();
      if (mails.length) {
        try {
          const result = await transporter.sendMail({
            html,
            from: "kilifalaye@gmail.com", // @TODO Change mail
            to: mails.join(","),
            subject: `${title} [${format()}]`,
            attachments: [{ filename, path }]
          });
          Logger.log(`Email send ${result.response}`);
          unlink(path, (err) => {
            if (err) Logger.error(err);
          });
        } catch (error) {
          Logger.error(error, "Nodemailer");
        }
      } else {
        unlink(path, (err) => {
          if (err) Logger.error(err);
        });
      }
    } catch (error) {
      Logger.error(error, "Send Mail With Attached File");
    }
  }
}
