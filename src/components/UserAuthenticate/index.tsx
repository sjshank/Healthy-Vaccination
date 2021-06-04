import React, { useState, useRef, useEffect } from "react";
import Input from "@salesforce/design-system-react/components/input";
import ButtonComponent from "../../generic/Button";

type UserAuthProps = {
  closeAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
  getOTPGenerated: (
    mNumber: number,
    event?: React.MouseEvent<HTMLInputElement>
  ) => void;
};

const UserAuthenticateComponent = ({
  closeAction,
  getOTPGenerated,
}: UserAuthProps) => {
  const [mobileNumber, setmobileNumber] = useState<string>("");
  const disableFlagRef = useRef<boolean>(true);
  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setmobileNumber(e.currentTarget.value ? e.currentTarget.value : "");
    if (/^[4-9]\d{9}$/.test(e.currentTarget.value)) {
      disableFlagRef.current = false;
    } else {
      disableFlagRef.current = true;
    }
  };

  useEffect(() => {
    disableFlagRef.current = true;
    document.getElementById("mobileNumberInput")?.focus();
  }, []);

  return (
    <div className="slds-form-element slds-m-around_large">
      <div className="slds-form-element__control">
        <Input
          type="text"
          id="mobileNumberInput"
          name="mobileNumberInput"
          label="Mobile Number"
          required
          value={mobileNumber}
          placeholder="Enter your valid 10 digit mobile number"
          inlineHelpText="ex: 9151111XXX"
          maxLength="10"
          minLength="10"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div className="slds-m-top_medium slds-m-bottom_medium slds-float_right">
        <ButtonComponent label="Cancel" clickEvent={closeAction} />
        <ButtonComponent
          label="Generate OTP"
          disable={disableFlagRef.current}
          variant="brand"
          clickEvent={(e) => getOTPGenerated(parseInt(mobileNumber), e)}
        />
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

export default UserAuthenticateComponent;
