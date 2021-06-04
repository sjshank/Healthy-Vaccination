import React from "react";

type HeaderProps = {
  title: string;
  children: React.ReactNode;
};

const VaccinationHeaderComponent = ({ children, title }: HeaderProps) => {
  return (
    <header className="slds-media slds-media_center slds-has-flexi-truncate">
      <div className="slds-media__body slds-list_horizontal">
        {children}
        <h2 className="slds-card__header-title slds-p-left_small">
          <span>{title}</span>
        </h2>
      </div>
    </header>
  );
};

export default VaccinationHeaderComponent;
