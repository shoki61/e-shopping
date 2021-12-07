import axios, { AxiosError, AxiosResponse } from 'axios';

import { translate } from 'util/translate';
import { AppNotification } from 'components';

const errorHandler = (error: Error | unknown) => {
  const message = (error as AxiosError).response?.data?.message;
  console.log(translate(message));
  AppNotification.error(translate(message));
  return { error };
};

export class Request {
  static baseURL: string;
  static accessToken: string;

  static async get(URL: string) {
    try {
      const { data } = await axios.get(this.baseURL + URL);
      return { data };
    } catch (err) {
      return errorHandler(err);
    }
  }

  static async post(URL = '', params = {}) {
    try {
      const { data } = await axios.post<{ data: any }>(this.baseURL + URL, params);
      return { data };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
