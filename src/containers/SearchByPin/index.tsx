import React, { useEffect, useState, useRef, lazy } from "react";
import Input from "@salesforce/design-system-react/components/input";
import styles from "./styles.module.less";
import ButtonComponent from "../../generic/Button";
import { useHistory } from "react-router-dom";
import { SearchAPI } from "../../services/searchAPI";
import { getTodayDateFormatted } from "../../utils/Helper";
import { ISessionType } from "../../models/session.interface";
import SpinnerComponent from "../../generic/Spinner";
import _ from "lodash";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
// import LocationMap from "@salesforce/design-system-react/components/location-map";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import * as AppConstant from "../../constants/appConstant";
import { useToasts } from "react-toast-notifications";

const SearchByPinComponent = (props: any) => {
  const { addToast } = useToasts();
  const [pincode, setPincode] = useState<string>("");
  const disableFlagRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const [vaccinationSessions, setVaccinationSessions] = useState<
    ISessionType[]
  >([]);
  const history = useHistory();
  useEffect(() => {
    disableFlagRef.current = true;
    document.getElementById("pincodeInput")?.focus();
  }, []);

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

  const searchRecords = (evt: any, pCode: string = "") => {
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
        const _sessions: ISessionType[] = data["sessions"];
        _sessions.forEach((session) => {
          session["isSessionAvailable"] = session["available_capacity"] !== 0;
        });
        setVaccinationSessions(
          _.orderBy([..._sessions], ["isSessionAvailable"], ["desc"])
        );
        setIsLoading(false);
        setLimit(_sessions.length > 0 ? 10 : 0);
      })
      .catch((err) => {
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
    setLimit(1);
  };

  const renderRecordsBar = () => {
    return (
      <TotalRecordsBarComponent numberOfRecords={vaccinationSessions.length} />
    );
  };

  const renderSessions = () => {
    const SessionComp = lazy(() => import("../../components/VaccinationSession"));
    return vaccinationSessions.slice(0, limit).map((session) => {
      return (
        <div
          className="slds-size_12-of-12 slds-medium-size_6-of-12 slds-large-size_5-of-12 slds-p-horizontal_x-small slds-p-vertical_medium"
          key={`session.center_id${session.session_id}`}
        >
          <SessionComp session={session} />
        </div>
      );
    });
  };

  const renderBackAndLoadMoreSection = () => {
    if (vaccinationSessions.length > 10) {
      return (
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_12-of-12">
          <div className="slds-text-align_center">
            <ButtonComponent label="Back" clickEvent={() => history.goBack()} />
            <LoadMoreComponent
              records={vaccinationSessions}
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

  // const locations = [
  //   {
  //     id: "1",
  //     name: "Worldwide Corporate Headquarters",
  //     address: "The Landmark @ One Market, San Francisco, CA",
  //   },
  //   {
  //     id: "2",
  //     name: "salesforce.com inc Atlanta",
  //     address: "950 East Paces Ferry Road NE, Atlanta, GA",
  //   },
  // ];

  return (
    <React.Fragment>
      {/* <LocationMap
        defaultLocation={locations[0]}
        id="location-map-multiple-locations-example"
        googleAPIKey="AIzaSyApNWzGVaxq3TWXGbCvi9GL0CNR0oE8K14"
        labels={{ title: "Salesforce Locations In United States" }}
        locations={locations}
      /> */}
      <div
        className="slds-grid slds-wrap slds-m-around_large"
        style={{ justifyContent: "center" }}
      >
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
            <ButtonComponent label="Back" clickEvent={() => history.goBack()} />
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
        {vaccinationSessions.length > 0 && (
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

export default SearchByPinComponent;
