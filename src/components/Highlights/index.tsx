import React from "react";
import BadgeComponent from "../../generic/Badge";
import styles from "./styles.module.less";
import _ from "lodash";

const HighlightsComponent = (props: any) => {
  const { record } = props;
  const renderBadge = (content: any, color: any, cName: any, id: any) => {
    return (
      <BadgeComponent
        content={content}
        color={color}
        customClass={`${styles[cName]} vaccineBadge`}
        id={id}
      />
    );
  };
  return (
    <>
      {renderBadge(
        _.capitalize(record.vaccine),
        "warning",
        "vaccineBadge",
        record.vaccine
      )}
      {renderBadge(
        _.capitalize(record.fee_type),
        "warning",
        "vaccineBadge",
        record.fee_type
      )}
      {renderBadge(
        "Age ".concat(record.min_age_limit?.toString()).concat("+"),
        "warning",
        "vaccineBadge",
        record.session_id
      )}
      {record.available_capacity > 0 &&
        renderBadge(
          "Total Dose ".concat(
            _.capitalize(record.available_capacity.toString())
          ),
          "warning",
          "vaccineBadge",
          record.available_capacity.toString()
        )}
      {record.available_capacity > 0 &&
        renderBadge(
          "1st Dose ".concat(
            _.capitalize(record.available_capacity_dose1.toString())
          ),
          "warning",
          "vaccineBadge",
          record.available_capacity_dose2.toString()
        )}
      {record.available_capacity > 0 &&
        renderBadge(
          "2nd Dose ".concat(
            _.capitalize(record.available_capacity_dose2.toString())
          ),
          "warning",
          "vaccineBadge",
          record.available_capacity_dose2.toString()
        )}
    </>
  );
};

export default HighlightsComponent;
