import React, { useEffect, useState, useRef, lazy } from "react";
import Input from "@salesforce/design-system-react/components/input";
import styles from "./styles.module.less";
import ButtonComponent from "../../generic/Button";
import { useHistory } from "react-router-dom";
import { SearchAPI } from "../../services/searchAPI";
import { getTodayDateFormatted } from "../../utils/Helper";
import { ICenterType } from "../../models/center.interface";
import SpinnerComponent from "../../generic/Spinner";
import _ from "lodash";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
import ExpandCollapseBarComponent from "../../components/ExpandCollapseBar";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import * as AppConstant from "../../constants/appConstant";
import { useToasts } from "react-toast-notifications";

const CalendarByPinComponent = (props: any) => {
  const { addToast } = useToasts();
  const [pincode, setPincode] = useState<string>("");
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);
  const disableFlagRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const history = useHistory();
  const [vaccinationCenters, setVaccinationCenters] = useState<ICenterType[]>(
    []
  );

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

  const searchRecords = (evt: any, pCode: string = "") => {
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
        const _centers: ICenterType[] = data["centers"];
        _centers.forEach((center) => {
          center["isSessionAvailable"] = center.sessions.some(
            (item) => item["available_capacity"] !== 0
          );
        });
        setVaccinationCenters(
          _.orderBy([..._centers], ["isSessionAvailable"], ["desc"])
        );
        setIsLoading(false);
        setLimit(_centers.length > 0 ? 10 : 0);
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
    setVaccinationCenters([]);
    setLimit(1);
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

  const renderExpandCollapseBar = () => {
    return (
      <>
        <TotalRecordsBarComponent numberOfRecords={vaccinationCenters.length} />
        <ExpandCollapseBarComponent
          isExpandAll={isExpandAll}
          handleExpandCollapseAll={handleExpandCollapseAll}
        />
      </>
    );
  };

  const renderCenters = () => {
    const CenterComp = lazy(() => import("../../components/VaccinationCenter"));
    return vaccinationCenters.slice(0, limit).map((center) => {
      return (
        <div
          className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_10-of-12 slds-p-horizontal_x-small slds-p-vertical_medium"
          key={`${center.center_id}-${center.pincode}`}
        >
          <CenterComp center={center} expandAll={isExpandAll} />
        </div>
      );
    });
  };

  const renderBackAndLoadMoreSection = () => {
    if (vaccinationCenters.length > 10) {
      return (
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_12-of-12">
          <div className="slds-text-align_center">
            <ButtonComponent label="Back" clickEvent={() => history.goBack()} />
            <LoadMoreComponent
              records={vaccinationCenters}
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
            <ButtonComponent label="Back" clickEvent={() => history.goBack()} />
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
        {vaccinationCenters.length > 0 && (
          <>
            {renderExpandCollapseBar()}
            {renderCenters()}
            {renderBackAndLoadMoreSection()}
          </>
        )}
        {limit === 0 && (
          <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12" id="errorBox">
            <ScopedNotificationComponent
              text={`No vaccination center is available.`}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CalendarByPinComponent;
