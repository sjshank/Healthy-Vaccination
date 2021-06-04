import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type ChartProps = {
  chartTitleText?: string;
  type: any;
  dataSource: any;
  xAxisLabel?: object;
  keys?: string[];
  innerSize?: string;
  seriesName?: string;
  plot?: object;
};

const ChartComponent = (option: ChartProps) => {
  const options: Highcharts.Options = {
    plotOptions: option.plot ? option.plot : {},
    chart: {
      type: option.type,
    },
    title: {
      text: option.chartTitleText,
    },
    xAxis: option.xAxisLabel,
    series: [
      {
        keys: option.keys,
        colorByPoint: true,
        type: option.type,
        innerSize: option.innerSize,
        data: option.dataSource,
        name: option.seriesName,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartComponent;
