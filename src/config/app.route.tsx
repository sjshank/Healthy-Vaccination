import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import DashBoardComponent from "../containers/Dashboard";

const CalendarByPinComponent = lazy(
  () => import("../containers/CalendarByPin")
);
const SearchByDistrictComponent = lazy(
  () => import("../containers/SearchByDistrict")
);
const SearchByPinComponent = lazy(() => import("../containers/SearchByPin"));
const CalendarByDistrictComponent = lazy(
  () => import("../containers/CalendarByDistrict")
);

const Routes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="slds-text-align_center slds-m-around_large">
            Loading content...
          </div>
        }
      >
        <Route path="/" exact component={DashBoardComponent} />
        <Route path="/searchByPin" exact component={SearchByPinComponent} />
        <Route
          path="/searchByDistrict"
          exact
          component={SearchByDistrictComponent}
        />
        <Route path="/calendarByPin" exact component={CalendarByPinComponent} />
        <Route
          path="/calendarByDistrict"
          exact
          component={CalendarByDistrictComponent}
        />
      </Suspense>
    </Switch>
  );
};

export default Routes;
