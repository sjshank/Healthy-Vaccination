import React, { useState } from "react";
import _ from "lodash";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { ISessionType } from "../../models/session.interface";
import styles from "./styles.module.less";
import "./styles.css";
import HighlightsComponent from "../Highlights";
import SessionBodyContent from "./BodyContent";
import AccordionBoxHeaderComponent from "../AccordionBoxHeader";

type SessionProps = {
  session: ISessionType;
};

const VaccinationSessionComponent = ({ session }: SessionProps) => {
  const [isExpanded, setisExpanded] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<string>("rgb(1, 118, 211)");

  const handleMouseOver = () => {
    setIconColor("#fff");
    setisExpanded(true);
  };
  const handleMouseLeave = () => {
    setIconColor("rgb(1, 118, 211)");
    setisExpanded(false);
  };

  return (
    <div
      className={`${styles.accordionBox} accordionBox vaccinationSessionBox`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseLeave}
    >
      <div className={`${styles.accordionBoxHeader} accordionBoxHeader`}>
        <div className={`${styles.headerDiv} slds-float_left`}>
          <AccordionBoxHeaderComponent record={session} iconColor={iconColor} />
        </div>
        <div className="slds-float_right">
          {!isExpanded && <IoIosArrowDropup size="2em" color={iconColor} />}
          {isExpanded && <IoIosArrowDropdown size="2em" color={iconColor} />}
        </div>
        <div className="slds-clearfix slds-m-bottom_small"></div>
        <div
          className={`slds-list_horizontal slds-m-around_xx-small slds-m-left_none ${styles.highlightSectionBar}`}
        >
          <HighlightsComponent record={session} />
        </div>
      </div>
      <SessionBodyContent session={session} />
    </div>
  );
};

export default VaccinationSessionComponent;
