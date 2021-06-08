import React from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../../generic/Button";

type NavigateProps = {
  label: string;
  variant?: string;
  url: string;
  clickEvent?: (event?: React.MouseEvent<HTMLInputElement>, url?: any) => void;
  customClass: string;
};

const NavigateComponent = ({
  label,
  variant,
  clickEvent,
  url,
  customClass,
}: NavigateProps) => {
  const history = useHistory();
  const hanldeNavigateEvent = () => {
    if (label?.toLowerCase() === "back") {
      history.goBack();
    } else {
      history.push("/".concat(url));
    }
  };

  return (
    <div className={customClass}>
      <ButtonComponent
        label={label}
        variant={variant}
        clickEvent={hanldeNavigateEvent}
      />
    </div>
  );
};

export default NavigateComponent;
