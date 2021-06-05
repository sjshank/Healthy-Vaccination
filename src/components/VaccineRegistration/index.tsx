import React from "react";
import { FaCashRegister } from "react-icons/fa";
import { IVaccinationRegistered } from "../../models/dashboard.interface";
import AccordionComponent from "../../generic/Accordion";
import RegistrationDetailViewComponent from "../RegistrationDetailView";
import _ from "lodash";
import CardLayout from "../../HOC/CardLayout";

type RegistrationProps = {
  registrations?: IVaccinationRegistered[];
};

const VaccineRegistrationComponent = (
  { registrations = [] }: RegistrationProps,
  props: any
) => {
  const accordionPanelDataList = registrations.map((registeredData, index) => {
    return {
      id: registeredData.reg_date,
      summary:
        "Registration as of " +
        new Date(registeredData.reg_date).toDateString(),
      ...registeredData,
    };
  });

  return (
    <CardLayout headerTitle="Recent Vaccination Registration">
      <FaCashRegister size="2em" />
      <div style={{ overflow: "auto", height: "300px" }}>
        <AccordionComponent
          accordionId="vaccineRegistration"
          dataSource={accordionPanelDataList?.slice(-10).reverse()}
        >
          <RegistrationDetailViewComponent />
        </AccordionComponent>
      </div>
    </CardLayout>
  );
};

export default VaccineRegistrationComponent;
