import React from "react";
import ButtonComponent from "../../generic/Button";
import styles from "./styles.module.less";

const LoadMoreComponent = (props: any) => {
  return (
    <ButtonComponent
      label="Load More"
      variant="brand"
      customClass={`${
        props.limit >= props.records?.length
          ? "slds-hide"
          : styles.showInlineFlex
      }`}
      clickEvent={props.handleLoadMore}
    />
  );
};

export default LoadMoreComponent;
