import React from "react";
import Modal from "@salesforce/design-system-react/components/modal";
import "./styles.css";

type ModalProps = {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean;
  size?: any;
  closeAction?: () => void;
  footerButtons?: React.ReactNode[];
};

const ModalComponent = ({
  title = "Example",
  children,
  isOpen = false,
  size,
  closeAction,
  footerButtons = [],
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      footer={footerButtons}
      onRequestClose={closeAction}
      heading={title}
      size={size}
      containerClassName={
        footerButtons.length > 0 ? "showFooter" : "hideFooter"
      }
    >
      <section>{children}</section>
    </Modal>
  );
};

export default ModalComponent;
