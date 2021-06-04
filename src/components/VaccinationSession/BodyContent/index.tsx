import React from "react";
import _ from "lodash";
import { MdEventAvailable, ImLocation2 } from "react-icons/all";
import { ISessionType } from "../../../models/session.interface";
import styles from "./styles.module.less";
import ButtonComponent from "../../../generic/Button";
import SlotsComponent from "../../Slots";
import AddressComponent from "../../Address";

type BodyProps = {
  session: ISessionType;
};

const SessionBodyContent = ({ session }: BodyProps) => {
  const badgeClickHandler = () => {
    if (session.available_capacity > 0) {
      window.open("https://selfregistration.cowin.gov.in/");
    }
  };
  return (
    <div className={`${styles.content} content`}>
      <div className="slds-list_horizontal">
        <ImLocation2
          size="1.5em"
          style={{ minWidth: "1.5em" }}
          className="slds-m-top_xxx-small slds-m-right_small"
        />
        <p
          className={`${styles.address} address slds-text-title slds-text-font_monospace`}
        >
          <AddressComponent record={session} />
        </p>
      </div>
      <div className="slds-list_horizontal slds-m-top_small">
        <MdEventAvailable
          size="1.5em"
          style={{ minWidth: "1.5em" }}
          className="slds-m-top_xx-small slds-m-right_small"
        />
        <p
          className={`${styles.address} address slds-text-title slds-text-font_monospace`}
        >
          <SlotsComponent
            slots={session.slots}
            cName={session.available_capacity === 0 ? "disabledBadgeCls" : ""}
            onClickEvent={badgeClickHandler}
          />
        </p>
      </div>
      {session.available_capacity > 0 && (
        <div className="slds-list_horizontal slds-m-top_small">
          <ButtonComponent
            label="Book Appointment"
            variant="link"
            customClass={`${styles.appointmentClass} appointmentClass`}
            clickEvent={() =>
              window.open("https://selfregistration.cowin.gov.in/")
            }
          />
        </div>
      )}
    </div>
  );
};

export default SessionBodyContent;
