import React from "react";
import TileComponent from "../Card/Tile";

type DetailViewProps = {
  item?: any;
};

const RegistrationDetailViewComponent = ({ item }: DetailViewProps) => {
  return (
    <>
      <div className="slds-list_horizontal slds-m-left_large">
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Total" value={item.total} />
        </div>
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Male" value={item.male} />
        </div>
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Female" value={item.female} />
        </div>
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Others" value={item.others} />
        </div>
      </div>
    </>
  );
};

export default RegistrationDetailViewComponent;
