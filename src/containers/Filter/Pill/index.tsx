import React, { useContext, useEffect, useState } from "react";
import { VaccinationFilterContext } from "../../../context/VaccinationFilter";
import BadgeComponent from "../../../generic/Badge";
import styles from "./styles.module.less";
import _ from "lodash";

const EachFilterPill = (props: any) => {
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const filterContext = useContext(VaccinationFilterContext);
  const { vaccinationFilterState, setUserFilter } = filterContext;
  const selectedFilters = [...vaccinationFilterState.selectedFilters];

  useEffect(() => {
    const _index = _.findIndex(selectedFilters, ["key", props.badge?.content]);
    setSelectedFilter({
      [props.badge?.id]: _index > -1,
    });
  }, [vaccinationFilterState]);

  const filterSelectHandler = (e: any, b: any) => {
    setSelectedFilter({
      [b.id]: !selectedFilter[b.id],
    });
    setUserFilter(
      { key: b.content, value: b.id, type: props.type },
      !selectedFilter[b.id]
    );
  };
  return (
    <li className="slds-m-right_xx-small">
      <BadgeComponent
        content={props.badge?.content}
        customClass={`${
          selectedFilter[props.badge?.id]
            ? styles.filterBadgeSelected
            : styles.filterBadgeCls
        }`}
        clickEvent={(e) => filterSelectHandler(e, props.badge)}
      />
    </li>
  );
};

export default EachFilterPill;
