import axios, { AxiosResponse } from "axios";
import { setupInterceptorsTo } from "../utils/Interceptors";
import { DashboardType } from "../models/dashboard.interface";
import * as AppConstant from "../constants/appConstant";

const instance = setupInterceptorsTo(
  axios.create({
    baseURL: AppConstant.PUBLIC_APIS.dashboardBaseUrl,
    timeout: 15000,
  })
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  getReport: (url: string) => instance.get<DashboardType>(url).then(responseBody),
};

export const DashboardAPI = {
  getDashBoardData: (): Promise<DashboardType> =>
    requests.getReport("getPublicReports"),
};
