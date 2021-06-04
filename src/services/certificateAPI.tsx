import axios, { AxiosResponse } from "axios";
import { setupInterceptorsTo } from "../utils/Interceptors";
import * as AppConstant from "../constants/appConstant";

const instance = setupInterceptorsTo(
  axios.create({
    baseURL: AppConstant.PUBLIC_APIS.certificateBaseUrl,
    timeout: 15000,
  })
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  getCertificate: (url: string, param: any) => {
    const headerConfig = {
      headers: {
        accept: "application/pdf",
        Authorization: `Bearer ${param.token}`,
      },
    };
    return instance.get(url, headerConfig).then(responseBody);
  },
};

export const CertificateAPI = {
  retrieveCertificate: (queryParam: string, postParam: any): Promise<any> => {
    return requests.getCertificate("download?".concat(queryParam), postParam);
  },
};
