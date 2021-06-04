import React from "react";
import { RiHospitalFill } from "react-icons/ri";
import BadgeComponent from "../../generic/Badge";
import AddressComponent from "../Address";
import styles from "./styles.module.less";

const AccordionBoxHeaderComponent = (props: any) => {
  const { record, iconColor } = props;
  return (
    <h5
      title={record.name?.toLowerCase()}
      className={`${styles.centerTitle} centerTitle slds-list_horizontal slds-text-heading_small slds-truncate`}
    >
      <RiHospitalFill
        size="1.5em"
        className={styles.customIcon}
        color={iconColor}
      />
      <ul className="slds-list_vertical slds-m-left_xx-small">
        <li className={styles.headerTitle}>
          {record.name?.toLowerCase()}
          <BadgeComponent
            content={
              record.isSessionAvailable
                ? "Session Available"
                : "Session Unavailable"
            }
            color={record.isSessionAvailable ? "success" : "inverse"}
            customClass={`${
              record.isSessionAvailable
                ? styles.vaccineAvailabilityBadge
                : styles.vaccineUnavailabilityBadge
            }`}
          />
        </li>
        <li className={styles.subTitleLi}>
          <small className={`${styles.subTitle} slds-text-font_monospace`}>
            <AddressComponent record={record} />
          </small>
        </li>
      </ul>
    </h5>
  );
};

export default AccordionBoxHeaderComponent;
