import React from "react";
import { AiOutlineStop } from "react-icons/ai";

const ScopedNotificationComponent = (props: any) => {
  return (
    <div
      className="slds-scoped-notification slds-media slds-media_center slds-theme_error"
      role="status"
    >
      <div className="slds-media__figure">
        <AiOutlineStop size="1.5em" color="#fff" />
      </div>
      <div className="slds-media__body">
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default ScopedNotificationComponent;
