import axios, { AxiosResponse } from "axios";
import { setupInterceptorsTo } from "../utils/Interceptors";
import * as AppConstant from "../constants/appConstant";

const instance = setupInterceptorsTo(
  axios.create({
    baseURL: AppConstant.PUBLIC_APIS.searchBaseUrl,
    timeout: 15000,
  })
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  findByPin: (url: string) => instance.get(url).then(responseBody),
  findByDistrict: (url: string) => instance.get(url).then(responseBody),
};

export const SearchAPI = {
  searchRecordsByPin: (queryParam: string): Promise<any> =>
    requests.findByPin("findByPin?".concat(queryParam)),
  searchRecordsByDistrict: (queryParam: string): Promise<any> =>
    requests.findByDistrict("findByDistrict?".concat(queryParam)),
  searchRecordsCalendarByPin: (queryParam: string): Promise<any> =>
    requests.findByPin("calendarByPin?".concat(queryParam)),
  searchRecordsCalendarByDistrict: (queryParam: string): Promise<any> =>
    requests.findByDistrict("calendarByDistrict?".concat(queryParam)),
};
