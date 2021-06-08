import React from "react";
import EachFilterPill from "./Pill";
import styles from "./styles.module.less";

type FilterProps = {
  title: string;
  type: string;
  badgeList: any[];
  customClass?: string;
  getFilterCriteria?: (event?: any, filterObject?: any) => void;
};

const FilterComponent = ({
  title,
  type,
  badgeList,
  customClass,
  getFilterCriteria,
}: FilterProps) => {
  return (
    <div
      className={`slds-text-align_left slds-list_horizontal ${styles.filterSection} ${customClass}`}
    >
      <h4 className="slds-text-heading_small slds-text-color_weak fontWeight500 slds-m-left_x-small slds-m-top_xx-small">
        {title}:
      </h4>
      <ul className="slds-list_horizontal slds-m-left_xx-small">
        {badgeList.map((b, ind) => {
          return (
            <EachFilterPill
              key={`${b?.content} - ${b?.id}`}
              getFilterCriteria={getFilterCriteria}
              badge={b}
              type={type}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default FilterComponent;
