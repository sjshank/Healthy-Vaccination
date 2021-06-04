import React from "react";
import { RiPinDistanceLine } from "react-icons/all";
import DataTableColumn from "@salesforce/design-system-react/components/data-table/column";
import DatatableComponent from "../../generic/Datatable";
import { IBeneficiary } from "../../models/dashboard.interface";
import CardLayout from "../../HOC/CardLayout";

type StateProps = { beneficiaries?: IBeneficiary[] };

const VaccinationByStateComponent = ({ beneficiaries = [] }: StateProps) => {
  const columns = [
    <DataTableColumn
      key="state"
      label="State/UT"
      property="state_name"
    ></DataTableColumn>,

    <DataTableColumn key="today" label="Today" property="today" />,

    <DataTableColumn key="total" label="Total" property="total" />,
  ];

  const datatableList = beneficiaries.map((beneficiaryData, index) => {
    return {
      ...beneficiaryData,
      id: "".concat(beneficiaryData.id),
    };
  });

  return (
    <CardLayout headerTitle="Vaccination By State/UT">
      <RiPinDistanceLine size="2em" />
      <div style={{ overflow: "auto", height: "400px" }}>
        <DatatableComponent
          dataSource={datatableList}
          cols={columns}
          columnBordered={true}
          fixedHeader={true}
          fixedLayout={true}
          tableId="VaccinationByStateTable"
        />
      </div>
    </CardLayout>
  );
};

export default VaccinationByStateComponent;
