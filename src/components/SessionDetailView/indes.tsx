import React from "react";
import TileComponent from "../Card/Tile";

type DetailViewProps = {
  item?: any;
};

const SessionDetailViewComponent = ({ item }: DetailViewProps) => {
  return (
    <>
      <div className="slds-list_horizontal slds-m-left_large">
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Total" value={item.total} />
        </div>
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Planned" value={item.planned} />
        </div>
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Ongoing" value={item.ongoing} />
        </div>
        <div className="slds-list_vertical slds-m-right_large">
          <TileComponent label="Completed" value={item.completed} />
        </div>
      </div>
    </>
  );
};

export default SessionDetailViewComponent;
