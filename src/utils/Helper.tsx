import { IBeneficiary } from "../models/dashboard.interface";
import _ from "lodash";
import { ISelectedFilter } from "../context/VaccinationFilter/state.d";
import { ISessionType } from "../models/session.interface";
import { ICenterType } from "../models/center.interface";

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

export const populateVaccineNames = (center: ICenterType) => {
  return [
    ...new Set(center.sessions?.map((item) => item["vaccine"].toLowerCase())),
  ];
};

export const populateAgeCriteria = (center: ICenterType) => {
  return [
    ...new Set(
      center.sessions?.map((item) =>
        item["min_age_limit"]?.toString()?.concat("+")
      )
    ),
  ];
};

export const populateAge = (center: ICenterType) => {
  return [...new Set(center.sessions?.map((item) => item["min_age_limit"]))];
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

type InitialStateType = {
  selectedFilters: ISelectedFilter[];
};

export const populateFilteredRecords = (
  filterState: InitialStateType,
  records: ISessionType[] | ICenterType[]
) => {
  const _selectedFilters = [...filterState.selectedFilters];
  const _vaccineFilterSet = new Set<string>();
  const _ageFilterSet = new Set<number>();
  _selectedFilters?.forEach((f: ISelectedFilter) => {
    if (f?.type === "vaccine") {
      _vaccineFilterSet.add(f?.value);
    } else if (f?.type === "age") {
      _ageFilterSet.add(parseInt(f?.value));
    }
  });
  const _vaccineBasedFilterRecords =
    [..._vaccineFilterSet]?.length > 0
      ? _.filter([...records], function (o: any) {
          if (o.vaccine) {
            return (
              [..._vaccineFilterSet]?.indexOf(o.vaccine?.toLowerCase()) > -1
            );
          }
          if (Array.isArray(o.sessions)) {
            const _vaccines = populateVaccineNames(o);
            return _.isEqual(
              _.intersection([..._vaccineFilterSet], _vaccines),
              _vaccines
            );
          }
        })
      : [...records];
  const _ageLimitBasedFilterRecords =
    [..._ageFilterSet]?.length > 0
      ? _.filter(_vaccineBasedFilterRecords, function (o: any) {
          if (o.vaccine) {
            return [..._ageFilterSet]?.indexOf(o.min_age_limit) > -1;
          }
          if (Array.isArray(o.sessions)) {
            const _ageList = populateAge(o);
            return _.isEqual(
              _.intersection([..._ageFilterSet], _ageList),
              _ageList
            );
          }
        })
      : [..._vaccineBasedFilterRecords];
  return [..._ageLimitBasedFilterRecords];
};
