import React, { useState, lazy, useRef, Suspense } from "react";
import ButtonComponent from "../../generic/Button";
import ModalComponent from "../../generic/Modal";
import SpinnerComponent from "../../generic/Spinner";

const VaccineAppointmentCertification = () => {
  const isLoading = useRef<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [compName, setCompName] = useState<React.ReactNode>(
    <SpinnerComponent size="small" variant="base" label="loading..." />
  );
  const [modalFooterButtons, setModalFooterButtons] = useState<
    React.ReactNode[]
  >([]);

  const registerAndBookAppointmentHandler = (
    e?: React.MouseEvent<HTMLInputElement>
  ) => {
    isLoading.current = true;
    setModalFooterButtons([
      <ButtonComponent label="Close" clickEvent={() => modalClosehandler()} />,
    ]);
    setTitle("Register And Book Appointment");
    const ApptmtComp = lazy(() => import("../Appointment"));
    setCompName(<ApptmtComp />);
    setisOpen(!isOpen);
    isLoading.current = false;
  };

  const downloadCertificate = (e?: React.MouseEvent<HTMLInputElement>) => {
    isLoading.current = true;
    setisOpen(!isOpen);
    setModalFooterButtons([]);
    setTitle("Authenticate And Download Your Certificate");
    const CertComp = lazy(() => import("../../components/Certificate"));
    setCompName(<CertComp closeAction={modalClosehandler} />);
    isLoading.current = false;
  };

  const modalClosehandler = () => {
    setisOpen(false);
  };

  return (
    <Suspense
      fallback={
        <div>
          <SpinnerComponent
            size="large"
            variant="base"
            label="Loading content..."
          />
        </div>
      }
    >
      <ButtonComponent
        label="Register & Book Appointment"
        variant="link"
        customClass="slds-m-vertical_xx-small slds-m-right_small modalLinkCls"
        clickEvent={(e) => registerAndBookAppointmentHandler(e)}
      />
      <ButtonComponent
        label="Download Certificate"
        variant="link"
        customClass="slds-m-vertical_xx-small slds-m-right_xx-small modalLinkCls"
        clickEvent={(e) => downloadCertificate(e)}
      />
      <ModalComponent
        title={title}
        isOpen={isOpen}
        closeAction={modalClosehandler}
        footerButtons={modalFooterButtons}
        size="small"
      >
        {compName}
      </ModalComponent>
    </Suspense>
  );
};

export default VaccineAppointmentCertification;
