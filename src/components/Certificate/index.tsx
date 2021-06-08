import React, { useState, useRef } from "react";
import ReactGA from "react-ga";
import UserAuthenticateComponent from "../../components/UserAuthenticate";
import OTPConfirmComponent from "../../components/OTPConfirm";
import { AuthAPI } from "../../services/authAPI";
import { CertificateAPI } from "../../services/certificateAPI";
import SpinnerComponent from "../../generic/Spinner";
import { sha256 } from "js-sha256";
import { useToasts } from "react-toast-notifications";
import * as AppConstant from "../../constants/appConstant";
import DownloadCertificateComponent from "./Download";

type CertificateProps = {
  closeAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
};

const CertificateComponent = ({ closeAction }: CertificateProps) => {
  const { addToast } = useToasts();
  const [generateOTP, setGenerateOTP] = useState<boolean>(true);
  const [confirmOTP, setConfirmOTP] = useState<boolean>(false);
  const [downloadCertificate, setDownloadCertificate] =
    useState<boolean>(false);
  const isLoading = useRef<boolean>(false);
  const mobileNumber = useRef<string>("");

  const generateOTPHandler = (
    mNumber: number = 1111111111,
    e?: React.MouseEvent<HTMLInputElement>
  ) => {
    ReactGA.event({
      category: "Data-Load",
      action: "generateOTP",
      label: "mobileNumberEntered",
    });
    isLoading.current = true;
    mobileNumber.current = mNumber.toString();
    AuthAPI.retrieveOTP({ mobile: mobileNumber.current })
      .then((data) => {
        isLoading.current = false;
        addToast(
          AppConstant.OTP_SENT_SUCCESS_MSG.concat(
            mobileNumber.current.slice(mobileNumber.current.length - 4)
          ),
          {
            appearance: "success",
          }
        );
        sessionStorage.setItem("txnId", data["txnId"]);
        setGenerateOTP(false);
        setConfirmOTP(true);
      })
      .catch((err) => {
        isLoading.current = false;
        addToast(AppConstant.OTP_ALREADY_SENT_ERROR_MSG, {
          appearance: "error",
        });
        console.log("ERRRRRRRRRR");
      })
      .finally(() => (isLoading.current = false));
  };

  const confirmOTPHandler = (
    otpNumber: number = 1234,
    e?: React.MouseEvent<HTMLInputElement>
  ) => {
    ReactGA.event({
      category: "Data-Load",
      action: "confirmOTP",
      label: "otpEntered",
    });
    isLoading.current = true;
    AuthAPI.verifyOTP({
      otp: sha256(otpNumber.toString()),
      txnId: sessionStorage.getItem("txnId"),
    })
      .then((data) => {
        isLoading.current = false;
        sessionStorage.setItem("userToken", data["token"]);
        setConfirmOTP(false);
        setDownloadCertificate(true);
      })
      .catch((err) => {
        isLoading.current = false;
        addToast(AppConstant.INVALID_OTP_ERROR_MSG, {
          appearance: "error",
        });
        console.log("ERRRRRRRRRR", err);
      })
      .finally(() => (isLoading.current = false));
  };

  const backActionHandler = () => {
    setConfirmOTP(false);
    setDownloadCertificate(false);
    setGenerateOTP(true);
  };

  const downloadCertificateHandler = (
    refId: string,
    e?: React.MouseEvent<HTMLInputElement>
  ) => {
    ReactGA.event({
      category: "Data-Load",
      action: "downloadCertificat",
      label: "certificateDownloaded",
    });
    isLoading.current = true;
    CertificateAPI.retrieveCertificate(`beneficiary_reference_id=${refId}`, {
      token: sessionStorage.getItem("userToken"),
    })
      .then((data) => {
        isLoading.current = false;
        console.log(data);
      })
      .catch((err) => {
        isLoading.current = false;
        if (
          err &&
          err["response"] &&
          err["response"]["data"]["errorCode"] === "CERT013"
        ) {
          addToast(err["response"]["data"]["error"], {
            appearance: "error",
          });
        } else {
          addToast(AppConstant.BENEFICIARY_REF_ID_ERROR_MSG, {
            appearance: "error",
          });
        }
      })
      .finally(() => (isLoading.current = false));
  };

  return (
    <div>
      {isLoading.current && (
        <div>
          <SpinnerComponent
            size="large"
            variant="base"
            label="Loading data..."
          />
        </div>
      )}
      {generateOTP && (
        <UserAuthenticateComponent
          closeAction={closeAction}
          getOTPGenerated={generateOTPHandler}
        />
      )}
      {confirmOTP && (
        <OTPConfirmComponent
          submitButtonName="Verify OTP"
          backAction={backActionHandler}
          closeAction={closeAction}
          getOTPConfirm={confirmOTPHandler}
        />
      )}
      {downloadCertificate && (
        <DownloadCertificateComponent
          backAction={backActionHandler}
          closeAction={closeAction}
          downloadCertificateAction={downloadCertificateHandler}
        />
      )}
    </div>
  );
};

export default CertificateComponent;
