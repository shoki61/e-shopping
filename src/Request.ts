import axios, { AxiosError } from 'axios';

import { translate } from 'util/translate';
import { AppNotification } from 'components';

const errorHandler = (error: Error | unknown) => {
  const message = (error as AxiosError).response?.data?.message;
  console.log(translate(message));
  console.log(message);
  AppNotification.error(translate(message));
  return { error };
};

export class Request {
  static baseURL: string;
  static accessToken: string;

  static async get(URL: string) {
    const res = await axios.get(this.baseURL + URL);
    if (res.data) {
      return res.data;
    }
    return res;
  }

  static async post(URL = '', params = {}) {
    try {
      const { data } = await axios.post(this.baseURL + URL, params);
      return data;
    } catch (err) {
      return errorHandler(err);
    }
  }
}
