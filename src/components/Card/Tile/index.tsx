import React from "react";
import NumberFormat from "react-number-format";

type TitleProps = {
  label: string;
  value: number;
};

const TileComponent = (props: TitleProps) => {
  return (
    <>
      <h4 className="slds-text-body_regular slds-text-color_weak">
        {props.label}
      </h4>
      <h6 className="slds-text-heading_small fontWeight500">
        <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} />
      </h6>
    </>
  );
};

export default TileComponent;
