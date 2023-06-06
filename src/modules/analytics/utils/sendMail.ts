import { Logger } from "@nestjs/common";
import { unlink } from "fs";
import { google } from "googleapis";
import { createTransport } from "nodemailer";
import { ACCOUNTS_TASKS_EXPORT } from "src/constants";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, NODE_ENV } from "src/environments";
import { format } from ".";

const OAuth2 = google.auth.OAuth2;

const clientId = GOOGLE_CLIENT_ID;
const clientSecret = GOOGLE_CLIENT_SECRET;
const refreshToken = GOOGLE_REFRESH_TOKEN;

const OAuthClient = new OAuth2(clientId, clientSecret);
OAuthClient.setCredentials({ refresh_token: refreshToken });

export const sendMailWithFile = async (title: string, filename: string, path: string) => {
  try {
    const accessToken = (await OAuthClient.getAccessToken()).token;
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
};
