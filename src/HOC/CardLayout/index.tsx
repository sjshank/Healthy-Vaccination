import React from "react";
import VaccinationHeaderComponent from "../../components/VaccinationHeader";

type CardLayoutProps = {
  children: React.ReactNode[];
  headerTitle: string;
};

const CardLayout = ({ children, headerTitle }: CardLayoutProps) => {
  return (
    <article className="slds-card slds-p-around_small cardShadowCls">
      <VaccinationHeaderComponent title={headerTitle}>
        {children[0]}
      </VaccinationHeaderComponent>
      {children[1]}
    </article>
  );
};

export default CardLayout;
