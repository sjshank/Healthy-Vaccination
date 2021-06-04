import React, { useState, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/all";
import BadgeComponent from "../../generic/Badge";
import { ICenterType } from "../../models/center.interface";
import styles from "./styles.module.less";
import _ from "lodash";
import CenterBodyContent from "./BodyContent";
import AccordionBoxHeaderComponent from "../AccordionBoxHeader";

type CenterProps = {
  center: ICenterType;
  expandAll: boolean;
};

const Badges = (center: ICenterType) => {
  const populateVaccineNames = (center: ICenterType) => {
    return [...new Set(center.sessions?.map((item) => item["vaccine"]))];
  };

  const populateAgeCriteria = (center: ICenterType) => {
    return [...new Set(center.sessions?.map((item) => item["min_age_limit"]?.toString()?.concat("+")))];
  };

  const _vaccines = populateVaccineNames(center);
  const _minAgeList = populateAgeCriteria(center);
  const renderBadge = (content: any, color: any, cName: any, id: any) => {
    return (
      <BadgeComponent
        content={content}
        color={color}
        customClass={styles[cName]}
        id={id}
      />
    );
  };
  return (
    <>
      {_vaccines.map((v) => {
        return (
          <span key={v}>
            {renderBadge(_.capitalize(v), "warning", "vaccineBadge", v)}
          </span>
        );
      })}
      {renderBadge(
        _.capitalize(center.fee_type),
        "warning",
        "vaccineBadge",
        center.fee_type
      )}
      {_minAgeList.map((age) => {
        return (
          <span key={age}>
            {renderBadge(_.capitalize(age), "warning", "vaccineBadge", age)}
          </span>
        );
      })}
    </>
  );
};

const VaccinationCenterComponent = ({
  center,
  expandAll = false,
}: CenterProps) => {
  const [isExpanded, setisExpanded] = useState<boolean>(expandAll);
  const [iconColor, setIconColor] = useState<string>("rgb(1, 118, 211)");

  useEffect(() => {
    setisExpanded(expandAll);
    const _color = expandAll ? "#fff" : "rgb(1, 118, 211)";
    setIconColor(_color);
  }, [expandAll]);

  const handleMouseOver = () => {
    setIconColor("#fff");
  };
  const handleMouseLeave = () => {
    setIconColor("rgb(1, 118, 211)");
    const _color = isExpanded ? "#fff" : "rgb(1, 118, 211)";
    setIconColor(_color);
  };

  const handleExpandCollapseAction = () => {
    setisExpanded((prvIsExpanded) => !prvIsExpanded);
    const _color = !isExpanded ? "#fff" : "rgb(1, 118, 211)";
    setIconColor(_color);
  };

  return (
    <div
      className={`${styles.accordionBox} ${isExpanded ? styles.isOpened : ""}`}
      onMouseOver={handleMouseOver}
      onMouseEnter={handleMouseOver}
      onMouseOut={handleMouseLeave}
    >
      <div
        className={styles.accordionBoxHeader}
        onClick={handleExpandCollapseAction}
      >
        <div className={`${styles.headerDiv} slds-float_left`}>
          <AccordionBoxHeaderComponent record={center} iconColor={iconColor} />
        </div>
        <div className={`slds-float_right ${styles.expandIcon}`}>
          {!isExpanded && <FaPlusCircle size="2em" color={iconColor} />}
          {isExpanded && <FaMinusCircle size="2em" color={iconColor} />}
        </div>
        <div className="slds-clearfix slds-m-bottom_small"></div>
        {/* <div className="slds-list_horizontal slds-m-around_xx-small slds-m-left_none">
          {Badges(center)}
        </div> */}
      </div>
      <div
        className="slds-list_horizontal slds-m-around_small slds-m-top_none"
        // style={{ position: "absolute", bottom: 0 }}
      >
        {Badges(center)}
      </div>
      {isExpanded && <CenterBodyContent center={center} />}
    </div>
  );
};

export default VaccinationCenterComponent;
