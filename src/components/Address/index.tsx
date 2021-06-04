import React from "react";

const AddressComponent = (props: any) => {
  const { record } = props;
  const ele = record?.address?.concat(
    ", " + record.block_name + ", ",
    record.district_name + ", ",
    record.state_name + " ",
    record.pincode.toString()
  );
  return <span>{ele}</span>;
};

export default AddressComponent;
