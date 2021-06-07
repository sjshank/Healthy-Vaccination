import { ISelectedFilter } from "./state.d";

type InitialStateType = {
  selectedFilters: ISelectedFilter[];
};

export const populateFilterCriteria = (
  state: InitialStateType,
  action: any
) => {
  let { selectedFilters }: InitialStateType = { ...state };
  const _filterSet = new Set<ISelectedFilter>([...selectedFilters]);
  const userSelectedFilter: ISelectedFilter = action?.filter;
  const isFilterSelected: boolean = action.isSelected;
  if (isFilterSelected) {
    _filterSet.add(userSelectedFilter);
  } else {
    _filterSet.forEach((f: ISelectedFilter) => {
      if (f.value === userSelectedFilter?.value) {
        _filterSet.delete(f);
      }
    });
  }
  const _selectedFilters = Array.from(_filterSet);
  return {
    ...state,
    selectedFilters: _selectedFilters,
  };
};

export const clearAllFilter = (state: InitialStateType, action: any) => {
  let { selectedFilters }: InitialStateType = { ...state };
  selectedFilters = [];
  return {
    ...state,
    selectedFilters: selectedFilters,
  };
};
