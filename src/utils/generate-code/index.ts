import { EMessage } from "src/common/typeDefs";
import { PAD_LENGTH } from "src/environments";

export function generateUid(type: EMessage, completeCode: string, increment: number = 1) {
  let code = {
    [EMessage.Sms]: () => `PP-SMS-${incrementCode(getLastValueCodeString(completeCode), increment)}`,
    [EMessage.Mail]: () => `PP-ML-${incrementCode(getLastValueCodeString(completeCode), increment)}`
  };
  return code[type]();
}

const getLastValueCodeString = (completeCode: string) => {
  const code = completeCode.split("-");
  return code ? code[code?.length - 1] : "";
};

const incrementCode = (lastValueString: string, increment: number = 1) => {
  let arr = [];

  const numberOfCodeAfterInc = `${parseInt(lastValueString, 10) + increment}`;
  arr.length = PAD_LENGTH - numberOfCodeAfterInc.length;
  return `${arr.join("0")}${numberOfCodeAfterInc}`;
};
