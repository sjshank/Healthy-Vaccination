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
import { ISessionType } from "../../models/session.interface";
import SpinnerComponent from "../../generic/Spinner";
import _ from "lodash";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import * as AppConstant from "../../constants/appConstant";
import { useToasts } from "react-toast-notifications";
import VaccinationSessionComponent from "../../components/VaccinationSession";
import FilterComponent from "../Filter";
import { VaccinationFilterContext } from "../../context/VaccinationFilter";
import BadgeComponent from "../../generic/Badge";
import NavigateComponent from "../../components/Navigation";
import { usePageLoadAction } from "../../utils/CustomHooks";
import WithPageViewTracking from "../../HOC/PageViewTracking";

const SearchByPinComponent = (props: any) => {
  const filterContext = useContext(VaccinationFilterContext);
  const { vaccinationFilterState, resetFilter } = filterContext;
  const { addToast } = useToasts();
  const [pincode, setPincode] = useState<string>("");
  const disableFlagRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const vaccinationSessions = useRef<ISessionType[]>([]);
  const [filteredVaccinationSessions, setVaccinationSessions] = useState<
    ISessionType[]
  >([]);
  const history = useHistory();
  usePageLoadAction(disableFlagRef, resetFilter, "pincodeInput");

  useEffect(() => {
    setVaccinationSessions(
      _.orderBy(
        [
          ...populateFilteredRecords(
            vaccinationFilterState,
            vaccinationSessions.current
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

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const handleBackAction = () => {
    resetFilter();
    history.goBack();
  };

  const searchRecords = (evt: any, pCode: string = "") => {
    ReactGA.event({
      category: "Data-Load",
      action: "SearchByPin-SearchRecords",
      label: "pincode",
      value: parseInt(pCode),
    });
    if (
      (evt["type"] === "keyup" && evt.keyCode !== 13) ||
      !pCode ||
      pCode.length < 6
    ) {
      evt.preventDefault();
      return false;
    }
    document.getElementById("searchByPinBtn")?.focus();
    setIsLoading(true);
    SearchAPI.searchRecordsByPin(
      `pincode=${pCode}&date=${getTodayDateFormatted()}`
    )
      .then((data) => {
        resetFilter();
        const _sessions: ISessionType[] = data["sessions"];
        _sessions.forEach((session) => {
          session["isSessionAvailable"] = session["available_capacity"] !== 0;
        });
        vaccinationSessions.current = _.orderBy(
          [..._sessions],
          ["isSessionAvailable"],
          ["desc"]
        );
        setVaccinationSessions(
          _.orderBy([..._sessions], ["isSessionAvailable"], ["desc"])
        );
        setIsLoading(false);
        setLimit(_sessions.length > 0 ? 10 : 0);
      })
      .catch((err) => {
        ReactGA.exception({
          description: 'An error ocurred - SearchByPin-SearchRecords',
          fatal: true
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
    setVaccinationSessions([]);
    vaccinationSessions.current = [];
    setLimit(1);
    resetFilter();
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

  const renderRecordsBar = () => {
    return (
      <TotalRecordsBarComponent
        numberOfRecords={filteredVaccinationSessions.length}
      />
    );
  };

  const renderSessions = () => {
    // const SessionComp = lazy(() => import("../../components/VaccinationSession"));
    return filteredVaccinationSessions.slice(0, limit).map((session) => {
      return (
        <div
          className="slds-size_12-of-12 slds-medium-size_6-of-12 slds-large-size_5-of-12 slds-p-horizontal_x-small slds-p-vertical_medium"
          key={`session.center_id${session.session_id}`}
        >
          <VaccinationSessionComponent session={session} />
        </div>
      );
    });
  };

  const renderBackAndLoadMoreSection = () => {
    if (filteredVaccinationSessions.length > 10) {
      return (
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_12-of-12">
          <div className="slds-text-align_center">
            {/* <ButtonComponent label="Home" clickEvent={handleBackAction} /> */}
            <LoadMoreComponent
              records={filteredVaccinationSessions}
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
            label="Search By District"
            variant="link"
            customClass="slds-float_right"
            url="searchByDistrict"
          />
        </div>
        <div className="slds-size_12-of-12 slds-medium-size_5-of-12 slds-large-size_5-of-12">
          <div className="slds-form-element__control">
            <Input
              type="text"
              id="pincodeInput"
              name="pincodeInput"
              label="Search By Pin"
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
          <div className="slds-text-align_center slds-m-top_small">
            <ButtonComponent label="Home" clickEvent={handleBackAction} />
            <ButtonComponent label="Reset" clickEvent={resetAction} />
            <ButtonComponent
              buttonId="searchByPinBtn"
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
        {filteredVaccinationSessions.length > 0 && (
          <>
            {renderRecordsBar()}
            {renderSessions()}
            {renderBackAndLoadMoreSection()}
          </>
        )}
        {limit === 0 && (
          <div
            className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12"
            id="errorBox"
          >
            <ScopedNotificationComponent
              text={`No vaccination session is available.`}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default WithPageViewTracking(SearchByPinComponent);
