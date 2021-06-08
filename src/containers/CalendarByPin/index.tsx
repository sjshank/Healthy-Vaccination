import React, { useEffect, useState, useRef, lazy, useContext } from "react";
import ReactGA from "react-ga";
import Input from "@salesforce/design-system-react/components/input";
import styles from "./styles.module.less";
import ButtonComponent from "../../generic/Button";
import { useHistory } from "react-router-dom";
import { SearchAPI } from "../../services/searchAPI";
import {
  getTodayDateFormatted,
  populateFilteredRecords,
} from "../../utils/Helper";
import { ICenterType } from "../../models/center.interface";
import SpinnerComponent from "../../generic/Spinner";
import _ from "lodash";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
import ExpandCollapseBarComponent from "../../components/ExpandCollapseBar";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import * as AppConstant from "../../constants/appConstant";
import { useToasts } from "react-toast-notifications";
import VaccinationCenterComponent from "../../components/VaccinationCenter";
import FilterComponent from "../Filter";
import { VaccinationFilterContext } from "../../context/VaccinationFilter";
import NavigateComponent from "../../components/Navigation";
import { usePageLoadAction } from "../../utils/CustomHooks";
import WithPageViewTracking from "../../HOC/PageViewTracking";

const CalendarByPinComponent = (props: any) => {
  const filterContext = useContext(VaccinationFilterContext);
  const { vaccinationFilterState, resetFilter } = filterContext;
  const { addToast } = useToasts();
  const [pincode, setPincode] = useState<string>("");
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);
  const disableFlagRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const history = useHistory();
  const vaccinationCenters = useRef<ICenterType[]>([]);
  const [filteredVaccinationCenters, setVaccinationCenters] = useState<
    ICenterType[]
  >([]);
  usePageLoadAction(disableFlagRef, resetFilter, "pincodeInput");

  useEffect(() => {
    setVaccinationCenters(
      _.orderBy(
        [
          ...populateFilteredRecords(
            vaccinationFilterState,
            vaccinationCenters.current
          ),
        ],
        ["isSessionAvailable"],
        ["desc"]
      )
    );
  }, [vaccinationFilterState]);

  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setPincode(e.currentTarget.value);
    if (/^[0-9]\d{5}$/.test(e.currentTarget.value)) {
      disableFlagRef.current = false;
    } else {
      disableFlagRef.current = true;
    }
  };

  const searchRecords = (evt: any, pCode: string = "") => {
    ReactGA.event({
      category: "Data-Load",
      action: "CalendarByPin-SearchRecords",
      label: "pincode",
      value: parseInt(pCode),
    });
    setIsExpandAll(false);
    if (
      (evt["type"] === "keyup" && evt.keyCode !== 13) ||
      !pCode ||
      pCode.length < 6
    ) {
      evt.preventDefault();
      return false;
    }
    setIsLoading(true);
    document.getElementById("calendarByPinBtn")?.focus();
    SearchAPI.searchRecordsCalendarByPin(
      `pincode=${pCode}&date=${getTodayDateFormatted()}`
    )
      .then((data) => {
        resetFilter();
        const _centers: ICenterType[] = data["centers"];
        _centers.forEach((center) => {
          center["isSessionAvailable"] = center.sessions.some(
            (item) => item["available_capacity"] !== 0
          );
        });
        vaccinationCenters.current = _.orderBy(
          [..._centers],
          ["isSessionAvailable"],
          ["desc"]
        );
        setVaccinationCenters(
          _.orderBy([..._centers], ["isSessionAvailable"], ["desc"])
        );
        setIsLoading(false);
        setLimit(_centers.length > 0 ? 10 : 0);
      })
      .catch((err) => {
        ReactGA.event({
          category: "Error",
          action: "CalendarByPin-SearchRecords",
        });
        setIsLoading(false);
        addToast(AppConstant.GENERIC_ERROR, {
          appearance: "error",
        });
        console.error("ERRRRRRRR", err);
      });
  };

  const resetAction = () => {
    setPincode("");
    disableFlagRef.current = true;
    setVaccinationCenters([]);
    vaccinationCenters.current = [];
    setLimit(1);
    resetFilter();
  };

  const handleBackAction = () => {
    resetFilter();
    history.push("/");
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const handleExpandCollapseAll = () => {
    setIsLoading(true);
    setIsExpandAll(!isExpandAll);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const renderFilters = () => {
    return (
      <>
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12">
          <FilterComponent
            title="Filter by Vaccine"
            type="vaccine"
            badgeList={AppConstant.VACCINE_LIST_BADGE}
            customClass="slds-float_right"
          />
        </div>
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12">
          <FilterComponent
            title="Filter by Age"
            type="age"
            badgeList={AppConstant.AGE_LIST_BADGE}
            customClass="slds-float_left"
          />
        </div>
      </>
    );
  };

  const renderExpandCollapseBar = () => {
    return (
      <>
        <TotalRecordsBarComponent
          numberOfRecords={filteredVaccinationCenters.length}
        />
        <ExpandCollapseBarComponent
          isExpandAll={isExpandAll}
          handleExpandCollapseAll={handleExpandCollapseAll}
        />
      </>
    );
  };

  const renderCenters = () => {
    return filteredVaccinationCenters.slice(0, limit).map((center) => {
      return (
        <div
          className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_10-of-12 slds-p-horizontal_x-small slds-p-vertical_medium"
          key={`${center.center_id}-${center.pincode}`}
        >
          <VaccinationCenterComponent center={center} expandAll={isExpandAll} />
        </div>
      );
    });
  };

  const renderBackAndLoadMoreSection = () => {
    if (filteredVaccinationCenters.length > 10) {
      return (
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_12-of-12">
          <div className="slds-text-align_center">
            {/* <ButtonComponent label="Home" clickEvent={handleBackAction} /> */}
            <LoadMoreComponent
              records={filteredVaccinationCenters}
              limit={limit}
              handleLoadMore={handleLoadMore}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <div
        className="slds-grid slds-wrap slds-m-around_large"
        style={{ justifyContent: "center" }}
      >
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_12-of-12 slds-clearfix slds-p-bottom_xx-small">
          <NavigateComponent
            label="Back"
            variant="link"
            customClass="slds-float_left"
            url=""
          />
          <NavigateComponent
            label="Search Next 7 Days By District"
            variant="link"
            customClass="slds-float_right"
            url="calendarByDistrict"
          />
        </div>
        <div className="slds-size_12-of-12 slds-medium-size_5-of-12 slds-large-size_5-of-12">
          <div className="slds-form-element__control">
            <Input
              type="text"
              id="pincodeInput"
              name="pincodeInput"
              label="Search 7 Days Availability By Pin"
              required
              value={pincode}
              placeholder="Enter 6 digit pincode"
              inlineHelpText="ex: 1234xx"
              maxLength="6"
              minLength="6"
              className={styles.pincodeInputBox}
              onChange={(e) => changeHandler(e)}
              onKeyUp={(e) => searchRecords(e, pincode)}
            />
          </div>
          <div className="slds-m-top_medium slds-m-bottom_medium slds-text-align_center">
            <ButtonComponent label="Home" clickEvent={handleBackAction} />
            <ButtonComponent label="Reset" clickEvent={resetAction} />
            <ButtonComponent
              buttonId="calendarByPinBtn"
              label="Search"
              disable={disableFlagRef.current}
              variant="brand"
              clickEvent={(e) => searchRecords(e, pincode)}
            />
          </div>
        </div>
      </div>
      <div
        className="slds-grid slds-wrap slds-m-around_large"
        style={{ justifyContent: "center" }}
      >
        {isLoading && (
          <div>
            <SpinnerComponent
              size="large"
              variant="base"
              label="Loading data..."
            />
          </div>
        )}
        {renderFilters()}
        {filteredVaccinationCenters.length > 0 && (
          <>
            {renderExpandCollapseBar()}
            {renderCenters()}
            {renderBackAndLoadMoreSection()}
          </>
        )}
        {limit === 0 && (
          <div
            className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12"
            id="errorBox"
          >
            <ScopedNotificationComponent
              text={`No vaccination center is available.`}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default WithPageViewTracking(CalendarByPinComponent);
