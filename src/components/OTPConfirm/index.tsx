import React, { useState, useRef, useEffect } from "react";
import Input from "@salesforce/design-system-react/components/input";
import ButtonComponent from "../../generic/Button";

type OTPConfirmProps = {
  backAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
  closeAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
  getOTPConfirm: (
    otpNumber: number,
    event?: React.MouseEvent<HTMLInputElement>
  ) => void;
  submitButtonName: string;
};

const OTPConfirmComponent = ({
  backAction,
  closeAction,
  getOTPConfirm,
  submitButtonName = "Submit",
}: OTPConfirmProps) => {
  const [otpNumber, setotpNumber] = useState<string>("");
  const disableFlagRef = useRef<boolean>(true);

  useEffect(() => {
    document.getElementById("otpNumberInput")?.focus();
  }, []);

  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setotpNumber(e.currentTarget.value ? e.currentTarget.value : "");
    if (/^[0-9]\d{5}$/.test(e.currentTarget.value)) {
      disableFlagRef.current = false;
    } else {
      disableFlagRef.current = true;
    }
  };
  return (
    <div className="slds-form-element slds-m-around_large">
      <div className="slds-form-element__control">
        <Input
          type="text"
          id="otpNumberInput"
          name="otpNumberInput"
          label="OTP Verification"
          required
          value={otpNumber}
          placeholder="Enter 6 digit OTP"
          maxLength="6"
          minLength="6"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="clearfix">
        <div className="slds-m-top_medium slds-m-bottom_medium slds-float_left">
          <ButtonComponent label="Back" clickEvent={backAction} />
        </div>
        <div className="slds-m-top_medium slds-m-bottom_medium slds-float_right">
          <ButtonComponent label="Cancel" clickEvent={closeAction} />
          <ButtonComponent
            label={submitButtonName}
            disable={disableFlagRef.current}
            variant="brand"
            clickEvent={(e) => getOTPConfirm(parseInt(otpNumber), e)}
          />
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

export default OTPConfirmComponent;
