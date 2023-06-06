import { writeFile } from "fs/promises";
import { join } from "path";
import { ExportType } from "../enum";
import { MADFields, MSGFields, NTFields, TRFields } from "../interfaces";

interface SuccessGenerateCSV {
  title: string;
  filename: string;
  path: string;
}
interface IReturnCSV {
  error?: string;
  data: SuccessGenerateCSV;
}

export const exportDateFormat = (date: Date | string | null) => {
  try {
    if (date) {
      const isoDate = new Date(date).toISOString();
      const [day, time] = isoDate.split("T");
      const [hour, minute] = time.split(":");
      return `${day} ${hour}:${minute}`;
    }
    return "N/A";
  } catch (error) {
    return "N/A";
  }
};

export const format = (date: Date = new Date()) => {
  const [day] = date.toISOString().split("T");
  return day;
};

export const generatecsv = async (fields: any[], data: any[], title: string): Promise<IReturnCSV> => {
  const filename = `${title}-${format()}`;
  const filenameWithExtension = `${filename}.csv`;
  try {
    const replace = (key: any, value: any) => (!value ? "N/A" : value);
    const csv = data.map((row) => {
      return fields
        .map((field) => {
          return JSON.stringify(row[field], replace);
        })
        .join(",");
    });
    csv.unshift(fields.join(","));
    csv.join("\r\n");
    try {
      await writeFile(
        filenameWithExtension,
        csv.reduce((a, b) => `${a}\n${b}`)
      );
      return { data: { title, filename: filenameWithExtension, path: join(process.cwd(), filenameWithExtension) } };
    } catch (error) {
      return { error, data: null };
    }
  } catch (error) {
    return {
      error: error.message,
      data: null as any
    };
  }
};

export const HeaderByType: Record<ExportType, string[]> = {
  MSG: Object.values(MSGFields),
  NT: Object.values(NTFields),
  MAD: Object.values(MADFields),
  TR: Object.values(TRFields)
};
