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
  const btnCls = variant !== "link" ? styles.buttonClass : "";
  return (
    <Button
      id={buttonId}
      label={label}
      variant={variant}
      disabled={disable}
      responsive
      className={`${btnCls} ${customClass}`}
      onClick={clickEvent}
    />
  );
};

export default ButtonComponent;
