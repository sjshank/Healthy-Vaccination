import { IBeneficiary } from "../models/dashboard.interface";
import _ from "lodash";

export const getDataSourceAndLengendsMapped = (
  dataObject: any,
  colors: string[],
  values: string[],
  names: string[]
) => {
  const DataArray =
    names &&
    values &&
    values.map((val, ind) => {
      return {
        name: names[ind],
        color: colors[ind],
        y: dataObject[val],
      };
    });

  return Object.freeze(DataArray);
};

const _pad2 = (n: any) => (n < 10 ? "0" : "") + n;

export const getTodayDateFormatted = () => {
  const date = new Date();
  const month = _pad2(date.getMonth() + 1); //months (0-11)
  const day = _pad2(date.getDate()); //day (1-31)
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
};

export const populateStateList = (data: IBeneficiary[]) => {
  return data.map((d: IBeneficiary) => {
    return _.pick(d, ["state_name", "state_id"]);
  });
};

export const toShortFormat = (unFormattedDate: any) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(unFormattedDate);
  const day = d.getDate();

  const monthIndex = d.getMonth();
  const monthName = monthNames[monthIndex];

  const year = d.getFullYear();

  return `${day} ${monthName.toUpperCase()} ${year}`;
};
