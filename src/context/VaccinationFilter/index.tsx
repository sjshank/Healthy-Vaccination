import React, { useReducer } from "react";
import { reducer } from "./reducer";
import { ISelectedFilter } from "./state.d";
import * as actionTypes from "./actionTypes";

/**
 *  Initial state of application
 */

type InitialStateType = {
  selectedFilters: ISelectedFilter[];
};

const Initial_State: InitialStateType = {
  selectedFilters: [] as ISelectedFilter[],
};

const VaccinationFilterContext = React.createContext({} as any);

const VaccinationFilterContextProvider = (props: any) => {
  const [vaccinationFilterState, dispatchVaccinationFilterAction] = useReducer(
    reducer,
    Initial_State
  );

  const setUserFilter = (filter: ISelectedFilter, isSelected: boolean) => {
    dispatchVaccinationFilterAction({
      type: actionTypes.SET_FILTER_CRITERIA,
      filter,
      isSelected,
    });
  };

  const clearAllFilter = () => {
    dispatchVaccinationFilterAction({
      type: actionTypes.CLEAR_ALL_FILTER_CRITERIA,
    });
  };

  return (
    // populate context provider
    <VaccinationFilterContext.Provider
      value={{
        vaccinationFilterState: vaccinationFilterState,
        setUserFilter: setUserFilter,
        resetFilter: clearAllFilter,
      }}
    >
      {props.children}
    </VaccinationFilterContext.Provider>
  );
};

export { VaccinationFilterContext, VaccinationFilterContextProvider };
