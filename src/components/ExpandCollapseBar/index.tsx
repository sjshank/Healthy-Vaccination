import React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import ButtonComponent from "../../generic/Button";
import styles from "./styles.module.less";

const ExpandCollapseBarComponent = (props: any) => {
  const { isExpandAll, handleExpandCollapseAll } = props;
  return (
    <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_10-of-12 slds-text-align_right">
      {!isExpandAll && (
        <div className="slds-m-right_small">
          <ButtonComponent
            label="Expand All"
            variant="link"
            clickEvent={handleExpandCollapseAll}
            customClass={styles.expandCollapseCls}
          />
          &nbsp;
          <FaPlusCircle size="2em" onClick={handleExpandCollapseAll} />
        </div>
      )}
      {isExpandAll && (
        <div onClick={handleExpandCollapseAll} className="slds-m-right_small">
          <ButtonComponent
            label="Collapse All"
            variant="link"
            clickEvent={handleExpandCollapseAll}
            customClass={styles.expandCollapseCls}
          />
          &nbsp;
          <FaMinusCircle size="2em" onClick={handleExpandCollapseAll} />
        </div>
      )}
    </div>
  );
};

export default ExpandCollapseBarComponent;
