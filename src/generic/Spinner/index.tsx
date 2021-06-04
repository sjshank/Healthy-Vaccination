import React from "react";
import Spinner from "@salesforce/design-system-react/components/spinner";

type SpinnerProps = {
  size: any;
  variant: any;
  label: string;
};

const SpinnerComponent = ({ size, variant = "base", label }: SpinnerProps) => {
  return (
    <Spinner size={size} variant={variant} assistiveText={{ label: label }} />
  );
};

export default SpinnerComponent;
