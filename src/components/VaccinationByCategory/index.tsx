import React, { useEffect } from "react";
import VaccinationHeaderComponent from "../VaccinationHeader";
import { VscGroupByRefType } from "react-icons/all";
import ChartComponent from "../../generic/Chart";
import { IVaccinationDose } from "../../models/dashboard.interface";
import * as AppConstant from "../../constants/appConstant";
import { getDataSourceAndLengendsMapped } from "../../utils/Helper";
import CardLayout from "../../HOC/CardLayout";

type CategoryProps = { vaccionationDose?: IVaccinationDose };

const VaccinationByCategoryComponent = ({
  vaccionationDose,
}: CategoryProps) => {
  const genderDataSource = getDataSourceAndLengendsMapped(
    vaccionationDose,
    ["#77acf1", "#f21170", "#ddffbc", "#29bb89", "#f7ea00"],
    ["male", "female", "others", "covishield", "covaxin"],
    ["Male", "Female", "Others", "Covishield", "Covaxin"]
  );

  return (
    <CardLayout headerTitle="Vaccination By Category">
      <VscGroupByRefType size="2em" />
      <ChartComponent
        type="pie"
        dataSource={genderDataSource}
        seriesName="Vaccination"
        plot={AppConstant.PIE_PLOT_OPTIONS}
      />
    </CardLayout>

  );
};

export default VaccinationByCategoryComponent;
