import React from "react";
import Badge from "@salesforce/design-system-react/components/badge";
import styles from "./styles.module.less";

type BadgeProps = {
  id?: string;
  content: string | React.ReactNode;
  color?: any;
  customClass?:string;
  clickEvent?: (event?: any, id?: string) => void;
};

const BadgeComponent = ({
  id,
  content,
  color = "warning",
  clickEvent,
  customClass
}: BadgeProps) => {
  return (
    <span onClick={clickEvent}>
      <Badge
        id={id}
        color={color}
        content={content}
        className={`${styles.badgeClass} ${customClass}`}
      />
    </span>
  );
};

export default BadgeComponent;
