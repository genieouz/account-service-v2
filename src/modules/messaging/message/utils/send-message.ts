import axios from "axios";
import { SendMessageInput } from "../dto/create-message.input";

import { SMS_ACCOUNT_USERNAME, SMS_PASSWORD, SMS_URL_API } from "src/environments";

const username = SMS_ACCOUNT_USERNAME;
const providerURL = SMS_URL_API;
const password = SMS_PASSWORD;

interface IResponse {
  status: number;
  statusText: string;
}

export const sendMessageHttp = async (input: SendMessageInput) => {
  const { to, text, sender } = input;
  const urlParams = new URLSearchParams([
    ["username", username],
    ["password", password],
    ["msisdn", to],
    ["msg", text],
    ["sender", sender]
  ]);
  const params = urlParams.toString();
  const url = `${providerURL}?${params}`;
  const result = await axios.post<string>(url);

  return {
    status: result.status,
    statusText: result.statusText
  };
};
