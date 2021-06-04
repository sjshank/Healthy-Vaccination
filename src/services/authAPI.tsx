import axios, { AxiosResponse } from "axios";
import { setupInterceptorsTo } from "../utils/Interceptors";
import * as AppConstant from "../constants/appConstant";

const instance = setupInterceptorsTo(
  axios.create({
    baseURL: AppConstant.PUBLIC_APIS.authBaseUrl,
    timeout: 15000,
  })
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  getOTP: (url: string, param: any) =>
    instance.post(url, param).then(responseBody),
  confirmOTP: (url: string, param: any) =>
    instance.post(url, param).then(responseBody),
};

export const AuthAPI = {
  retrieveOTP: (param: any): Promise<any> =>
    requests.getOTP("generateOTP", param),
  verifyOTP: (param: any): Promise<any> =>
    requests.confirmOTP("confirmOTP", param),
};
