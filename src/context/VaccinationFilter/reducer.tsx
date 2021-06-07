import { ISelectedFilter } from "./state.d";
import * as helper from "./helper";
import * as actionTypes from "./actionTypes";

type InitialStateType = {
  selectedFilters: ISelectedFilter[];
};
export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case actionTypes.SET_FILTER_CRITERIA:
      return helper.populateFilterCriteria(state, action);
    case actionTypes.CLEAR_ALL_FILTER_CRITERIA:
      return helper.clearAllFilter(state, action);
    default:
      return state;
  }
};
