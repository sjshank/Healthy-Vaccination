import React from "react";
import { RiWechatFill } from "react-icons/ri";
import { IVaccinationSession } from "../../models/dashboard.interface";
import AccordionComponent from "../../generic/Accordion";
import SessionDetailViewComponent from "../SessionDetailView/indes";
import CardLayout from "../../HOC/CardLayout";

type SessionProps = {
  sessions?: IVaccinationSession[];
};

const VaccinationSessionOverviewComponent = (
  { sessions = [] }: SessionProps,
  props: any
) => {
  const accordionPanelDataList = sessions.map((sessionData, index) => {
    return {
      id: sessionData.session_date,
      summary:
        "Status as of " + new Date(sessionData.session_date).toDateString(),
      ...sessionData,
    };
  });

  return (
    <CardLayout headerTitle="Recent Vaccination Sessions">
      <RiWechatFill size="2em" />
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <AccordionComponent
          accordionId="vaccinationSession"
          dataSource={accordionPanelDataList?.slice(-10).reverse()}
        >
          <SessionDetailViewComponent />
        </AccordionComponent>
      </div>
    </CardLayout>
  );
};

export default VaccinationSessionOverviewComponent;
