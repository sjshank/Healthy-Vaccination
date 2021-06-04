import React from "react";
import Button from "@salesforce/design-system-react/components/button";
import styles from "./styles.module.less";

type ButtonProps = {
  label: string;
  variant?: any;
  disable?: boolean;
  customClass?: string;
  clickEvent?: (
    event?: React.MouseEvent<HTMLInputElement>,
    param?: any
  ) => void;
  buttonId?: string;
};

const ButtonComponent = ({
  label,
  variant,
  disable,
  clickEvent,
  customClass,
  buttonId,
}: ButtonProps) => {
  return (
    <Button
      id={buttonId}
      label={label}
      variant={variant}
      disabled={disable}
      responsive
      className={`${styles.buttonClass} ${customClass}`}
      onClick={clickEvent}
    />
  );
};

export default ButtonComponent;
