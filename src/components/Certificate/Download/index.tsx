import React, { useState, useRef, useEffect } from "react";
import Input from "@salesforce/design-system-react/components/input";
import ButtonComponent from "../../../generic/Button";

type DownloadCertProps = {
  backAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
  closeAction?: (event?: React.MouseEvent<HTMLInputElement>) => void;
  downloadCertificateAction: (
    ref: string,
    event?: React.MouseEvent<HTMLInputElement>
  ) => void;
};

const DownloadCertificateComponent = ({
  backAction,
  closeAction,
  downloadCertificateAction,
}: DownloadCertProps) => {
  const [referenceId, setReferenceId] = useState<string>("");
  const disableFlagRef = useRef<boolean>(false);

  useEffect(() => {
    document.getElementById("referenceIdInput")?.focus();
  }, []);

  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setReferenceId(e.currentTarget.value ? e.currentTarget.value : "");
    if (/^[0-9]\d{14}$/.test(e.currentTarget.value)) {
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
          id="referenceIdInput"
          name="referenceIdInput"
          label="Beneficiary Reference Id"
          required
          value={referenceId}
          placeholder="Enter your valid 14 digit reference Id"
          inlineHelpText="ex: 1234567890xxx"
          maxLength="15"
          minLength="15"
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
            label="Download Certificate"
            disable={disableFlagRef.current}
            variant="brand"
            clickEvent={(e) => downloadCertificateAction(referenceId, e)}
          />
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

export default DownloadCertificateComponent;
