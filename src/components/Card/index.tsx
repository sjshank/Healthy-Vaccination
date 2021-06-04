import React from "react";
import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import TileComponent from "./Tile";
import styles from './styles.module.less';

type CardProps = {
  title: string;
  total: number;
  subTitleOne_Label: string;
  subTitleTwo_Label: string;
  subTitleOne_Value: number;
  subTitleTwo_Value: number;
  children: React.ReactNode;
};

const CardComponent = (cardDetails: CardProps) => {
  return (
    <IconSettings iconPath="/assets/icons">
      <article className={`${styles.cardCls} slds-card slds-p-around_small`}>
        <div className="slds-list_horizontal">
          <div>{cardDetails.children}</div>
          <div className="slds-p-left_small">
            <div className="slds-list_vertical">
              <TileComponent
                label={cardDetails.title}
                value={cardDetails.total}
              />
            </div>
            <div className="slds-list_horizontal  slds-p-top_small">
              <div className="slds-list_vertical">
                <TileComponent
                  label={cardDetails.subTitleOne_Label}
                  value={cardDetails.subTitleOne_Value}
                />
              </div>
              <div className="slds-list_vertical slds-p-left_small">
                <TileComponent
                  label={cardDetails.subTitleTwo_Label}
                  value={cardDetails.subTitleTwo_Value}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </IconSettings>
  );
};

export default CardComponent;
