import React from "react";
import { withRouter } from "react-router-dom";
import BadgeComponent from "../../generic/Badge";
import { FaSearchLocation } from "react-icons/fa";
import CardLayout from "../../HOC/CardLayout";

const VaccinationAvailabilityComponent = (props: any) => {
  const clickHandler = (
    evt: React.MouseEvent<HTMLInputElement>,
    id: string
  ) => {
    props.history.push("/".concat(id));
  };

  //populate each badge
  const getEachBadgeContent = (id: string, content: string) => {
    return (
      <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-m-vertical_small">
        <BadgeComponent
          id={id}
          content={content}
          clickEvent={(e) => clickHandler(e, id)}
        />
      </div>
    );
  };

  return (
    <CardLayout headerTitle="Search Vaccination Availability">
      <FaSearchLocation size="2em" />
      <div
        className="slds-grid slds-wrap slds-m-top_medium"
        style={{ minHeight: "60px" }}
      >
        {getEachBadgeContent("searchByPin", "Search By Pin")}
        {getEachBadgeContent("searchByDistrict", "Search By District")}
        {getEachBadgeContent(
          "calendarByPin",
          "Next 7 Days Availability By Pin"
        )}
        {getEachBadgeContent(
          "calendarByDistrict",
          "Next 7 Days Availability By District"
        )}
      </div>
    </CardLayout>
  );
};

export default withRouter(VaccinationAvailabilityComponent);
