import React from "react";
import BadgeComponent from "../../generic/Badge";
import styles from "./styles.module.less";

const SlotsComponent = (props: any) => {
  return props.slots.map((slot: string) => {
    return (
      <BadgeComponent
        key={slot}
        id={slot}
        content={slot}
        clickEvent={props?.onClickEvent}
        customClass={`${styles.slotBadge} slotBadge ${styles[props.cName]}`}
      />
    );
  });
};

export default SlotsComponent;
