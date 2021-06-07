import React from "react";
import ScopedNotification from "@salesforce/design-system-react/components/scoped-notification";

const BaseNotificationComponent = (props:any) => {
  return (
    <ScopedNotification theme="dark">
      <p>{props.children}</p>
    </ScopedNotification>
  );
};

export default BaseNotificationComponent;
