import React from "react";
import ScopedNotification from "@salesforce/design-system-react/components/scoped-notification";
import { ImInfo } from "react-icons/im";

// import UserAuthenticateComponent from "../../components/UserAuthenticate";
// import OTPConfirmComponent from "../../components/OTPConfirm";
// import { AuthAPI } from "../../services/authAPI";
// import SpinnerComponent from "../../generic/Spinner";
// import { sha256 } from "js-sha256";
// import { useToasts } from "react-toast-notifications";
// import * as AppConstant from "../../constants/appConstant";

// type AppointmentProps = {
//   closeAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
// };

const AppointmentComponent = () => {
  // const { addToast } = useToasts();
  // const [generateOTP, setGenerateOTP] = useState<boolean>(true);
  // const [confirmOTP, setConfirmOTP] = useState<boolean>(false);
  // const isLoading = useRef<boolean>(false);
  // const mobileNumber = useRef<string>("");

  // const generateOTPHandler = (
  //   mNumber: number = 1111111111,
  //   e?: React.MouseEvent<HTMLInputElement>
  // ) => {
  //   isLoading.current = true;
  //   mobileNumber.current = mNumber.toString();
  //   AuthAPI.retrieveOTP({ mobile: mobileNumber.current })
  //     .then((data) => {
  //       isLoading.current = false;
  //       addToast(
  //         AppConstant.OTP_SENT_SUCCESS_MSG.concat(
  //           mobileNumber.current.slice(mobileNumber.current.length - 4)
  //         ),
  //         {
  //           appearance: "success",
  //         }
  //       );
  //       sessionStorage.setItem("txnId", data["txnId"]);
  //       setGenerateOTP(false);
  //       setConfirmOTP(true);
  //     })
  //     .catch((err) => {
  //       isLoading.current = false;
  //       addToast(AppConstant.OTP_ALREADY_SENT_ERROR_MSG, {
  //         appearance: "error",
  //       });
  //       console.log("ERRRRRRRRRR");
  //     })
  //     .finally(() => (isLoading.current = false));
  // };

  // const confirmOTPHandler = (
  //   otpNumber: number = 1234,
  //   e?: React.MouseEvent<HTMLInputElement>
  // ) => {
  //   isLoading.current = true;
  //   AuthAPI.verifyOTP({
  //     otp: sha256(otpNumber.toString()),
  //     txnId: sessionStorage.getItem("txnId"),
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       isLoading.current = false;
  //       // setConfirmOTP(false);
  //     })
  //     .catch((err) => {
  //       isLoading.current = false;
  //       console.log("ERRRRRRRRRR");
  //     })
  //     .finally(() => (isLoading.current = false));
  // };

  // const backActionHandler = () => {
  //   setConfirmOTP(false);
  //   setGenerateOTP(true);
  // };

  return (
    // <div>
    //   {isLoading.current && (
    //     <div>
    //       <SpinnerComponent
    //         size="large"
    //         variant="base"
    //         label="Loading data..."
    //       />
    //     </div>
    //   )}
    //   {generateOTP && (
    //     <UserAuthenticateComponent
    //       closeAction={closeAction}
    //       getOTPGenerated={generateOTPHandler}
    //     />
    //   )}
    //   {confirmOTP && (
    //     <OTPConfirmComponent
    //       backAction={backActionHandler}
    //       closeAction={closeAction}
    //       getOTPConfirm={confirmOTPHandler}
    //     />
    //   )}
    // </div>

    <section className="slds-p-around_large">
      <ScopedNotification theme="dark" icon={null}>
        <p>
          <ImInfo size="1.3em" color="#fff" className="slds-m-right_xx-small" />
          To register & book vaccination appointment, please visit GOI official
          website from here&nbsp;
          <a href="https://selfregistration.cowin.gov.in/" target="_blank">
            CO-WIN
          </a>
        </p>
      </ScopedNotification>
    </section>
  );
};

export default AppointmentComponent;
