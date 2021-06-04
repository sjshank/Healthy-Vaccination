import React from "react";
import VaccinationHeaderComponent from "../VaccinationHeader";
import { GiDuration } from "react-icons/all";
import ChartComponent from "../../generic/Chart";
import { IVaccinationAge } from "../../models/dashboard.interface";
import * as AppConstant from "../../constants/appConstant";
import { getDataSourceAndLengendsMapped } from "../../utils/Helper";
import CardLayout from "../../HOC/CardLayout";

type AgeProps = { age?: IVaccinationAge };

const VaccinationByAgeComponent = ({ age }: AgeProps) => {
  const ageDataSource = getDataSourceAndLengendsMapped(
    age,
    ["rgb(144, 237, 125)", "#7cb5ec", "#ff7b54"],
    ["vac_18_45", "vac_45_60", "above_60"],
    ["18-45", "45-60", "60+"]
  );
  return (
    <CardLayout headerTitle="Vaccination By Age">
      <GiDuration size="2em" />
      <ChartComponent
        type="pie"
        dataSource={ageDataSource}
        plot={AppConstant.PIE_PLOT_OPTIONS}
        seriesName="Vaccination"
      />
    </CardLayout>
  );
};

export default VaccinationByAgeComponent;
