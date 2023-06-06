import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

export const AxiosPostService = async <T>({
  url,
  body,
  token
}: {
  url: string;
  body: any;
  token?: string;
}): Promise<T> => {
  try {
    const { data } = await axios.post<T>(url, body, {
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    });
    return data;
  } catch (error) {
    const {
      data: { error: title, code, message }
    } = error.response;
    throw new HttpException(`${title + ": " + message ?? error}`, code ?? HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const AxiosGetService = async <T>({
  url,
  query,
  params,
  token
}: {
  url: string;
  query?: any;
  params?: any;
  token?: string;
}): Promise<T> => {
  try {
    const { data } = await axios.get<T>(url, {
      ...(query && { query }),
      ...(params && { params }),
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    });
    return data;
  } catch (error) {
    throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
