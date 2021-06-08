import { useEffect, useState } from "react";
import { ISelectedFilter } from "../context/VaccinationFilter/state.d";
import CSVJson from "../data/csvjson.json";
import { ISessionType } from "../models/session.interface";
import _ from "lodash";

type InitialStateType = {
  selectedFilters: ISelectedFilter[];
};

type CSVObject = {
  district_id: number;
  district_name: string;
  state_id: number;
};

export const useFetchDistrictJson = () => {
  const [jsonData, setJsonData] = useState<Array<CSVObject>>([]);

  useEffect(() => {
    setJsonData(CSVJson);
  }, []);

  return [...jsonData];
};

export const usePageLoadAction = (
  eleRef: React.MutableRefObject<boolean>,
  fName: Function,
  elementId: string
) => {
  useEffect(() => {
    fName();
    window.scrollTo(0, 0);
    eleRef.current = true;
    document.getElementById(elementId)?.focus();
  }, []);
};

export const useFilterRecords = (
  filterState: InitialStateType,
  records: ISessionType[]
) => {
  const [AgeLimitBasedFilterRecords, setAgeLimitBasedFilterRecords] = useState<
    Array<ISessionType>
  >([]);
  useEffect(() => {
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
        ? _.filter([...records], function (o: ISessionType) {
            return (
              [..._vaccineFilterSet]?.indexOf(o.vaccine?.toLowerCase()) > -1
            );
          })
        : [...records];
    const _ageLimitBasedFilterRecords =
      [..._ageFilterSet]?.length > 0
        ? _.filter(_vaccineBasedFilterRecords, function (o: ISessionType) {
            return [..._ageFilterSet]?.indexOf(o.min_age_limit) > -1;
          })
        : [..._vaccineBasedFilterRecords];
    setAgeLimitBasedFilterRecords(_ageLimitBasedFilterRecords);
  }, [filterState]);

  return [...AgeLimitBasedFilterRecords];
};
