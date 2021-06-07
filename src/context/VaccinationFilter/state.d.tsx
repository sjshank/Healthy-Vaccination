export interface ISelectedFilter {
  key: string;
  value: string;
  type: string;
}

type VaccinationCenterContextType = {
  selectedFilters: ISelectedFilter[];
};
