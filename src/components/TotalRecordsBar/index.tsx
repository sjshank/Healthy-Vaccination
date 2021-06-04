import React from "react";
import styles from "./styles.module.less";

const TotalRecordsBarComponent = (props: any) => {
  return (
    <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_12-of-12">
      <div className="slds-text-font_monospace slds-text-align_center slds-m-left_small">
        <span
          className={styles.totalRecordsCls}
        >{`Total ${props.numberOfRecords} records found.`}</span>
      </div>
    </div>
  );
};

export default TotalRecordsBarComponent;
