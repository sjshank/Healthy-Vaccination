import React, { useEffect, useState, useRef, lazy, useContext } from "react";
import styles from "./styles.module.less";
import ButtonComponent from "../../generic/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "@salesforce/design-system-react/components/menu-dropdown";
import DropdownTrigger from "@salesforce/design-system-react/components/menu-dropdown/button-trigger";
import Button from "@salesforce/design-system-react/components/button/";
import { SearchAPI } from "../../services/searchAPI";
import {
  getTodayDateFormatted,
  populateFilteredRecords,
} from "../../utils/Helper";
import SpinnerComponent from "../../generic/Spinner";
import { ISessionType } from "../../models/session.interface";
import _ from "lodash";
import * as AppConstant from "../../constants/appConstant";
import "./styles.css";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import { useFetchDistrictJson } from "../../utils/CustomHooks";
import { useToasts } from "react-toast-notifications";
import VaccinationSessionComponent from "../../components/VaccinationSession";
import FilterComponent from "../Filter";
import { VaccinationFilterContext } from "../../context/VaccinationFilter";
import BaseNotificationComponent from "../../generic/BaseNotification";

type StateObject = {
  label: string;
  value: number;
};

type DistrictObject = {
  label: string;
  value: number;
};

type CSVObject = {
  district_id: number;
  district_name: string;
  state_id: number;
};

const SearchByDistrictComponent = (props: any) => {
  const { addToast } = useToasts();
  const filterContext = useContext(VaccinationFilterContext);
  const { vaccinationFilterState, resetFilter } = filterContext;
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictObject>();
  const disableFlagRef = useRef<boolean>(true);
  const [districtList, setDistrictList] = useState<Array<DistrictObject | any>>(
    []
  );
  const [stateLabel, setStateLabel] = useState<string>("Select State");
  const [districtLabel, setDistrictLabel] = useState<string>("Select District");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const vaccinationSessions = useRef<ISessionType[]>([]);
  const [filteredVaccinationSessions, setVaccinationSessions] = useState<
    ISessionType[]
  >([]);
  const history = useHistory();
  const districtJSON = useFetchDistrictJson();
  useEffect(() => {
    disableFlagRef.current = true;
    document.getElementById("stateBtn")?.focus();
  }, []);

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

  const searchRecords = (selectedValue?: DistrictObject) => {
    setIsLoading(true);
    SearchAPI.searchRecordsByDistrict(
      `district_id=${selectedValue?.value}&date=${getTodayDateFormatted()}`
    )
      .then((data) => {
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
        setIsLoading(false);
        addToast(AppConstant.GENERIC_ERROR, {
          appearance: "error",
        });
        console.error("ERRRRRRRR", err);
      });
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const resetAction = () => {
    setSelectedDistrict(undefined);
    disableFlagRef.current = true;
    setDistrictLabel("Select District");
    setStateLabel("Select State");
    setDistrictList([]);
    setVaccinationSessions([]);
    vaccinationSessions.current = [];
    setLimit(1);
    resetFilter();
  };

  const handleBackAction = () => {
    resetFilter();
    history.goBack();
  };

  const handleStateSelect = (sValue: StateObject) => {
    setStateLabel(sValue.label);
    setDistrictLabel("Select District");
    setSelectedDistrict(undefined);
    disableFlagRef.current = true;
    const districts: DistrictObject[] = [];
    districtJSON.map((district: CSVObject) => {
      if (district.state_id === sValue.value) {
        districts.push({
          label: district.district_name,
          value: district.district_id,
        });
      }
    });
    setDistrictList([...districts]);
  };

  const handleDistrictSelect = (sValue: DistrictObject) => {
    setDistrictLabel(sValue.label);
    setSelectedDistrict(sValue);
    disableFlagRef.current = sValue.label ? false : true;
  };

  const renderFilters = () => {
    return (
      <>
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12">
          <FilterComponent
            title="Filter by Vaccine"
            type="vaccine"
            badgeList={AppConstant.VACCINE_LIST_BADGE}
          />
        </div>
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12 ">
          <FilterComponent
            title="Filter by Age"
            type="age"
            badgeList={AppConstant.AGE_LIST_BADGE}
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
            <ButtonComponent label="Back" clickEvent={handleBackAction} />
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
        className="slds-grid slds-wrap slds-m-around_medium"
        style={{ justifyContent: "center" }}
      >
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_8-of-12">
          <div className="districtDropdwonSection">
            <label className="slds-form-element__label searchByDistrictLbl">
              <abbr className="slds-required" title="required">
                *
              </abbr>
              Search By District
            </label>
            <Dropdown
              align="left"
              options={[...AppConstant.STATE_LIST]}
              onSelect={(sValue: StateObject) => handleStateSelect(sValue)}
            >
              <DropdownTrigger>
                <Button label={stateLabel} id="stateBtn" />
              </DropdownTrigger>
            </Dropdown>
            <Dropdown
              align="left"
              options={districtList}
              onSelect={(sValue: DistrictObject) =>
                handleDistrictSelect(sValue)
              }
            >
              <DropdownTrigger>
                <Button label={districtLabel} />
              </DropdownTrigger>
            </Dropdown>
          </div>
          <div className="slds-m-top_medium slds-m-bottom_medium slds-text-align_center">
            <ButtonComponent label="Back" clickEvent={handleBackAction} />
            <ButtonComponent label="Reset" clickEvent={resetAction} />
            <ButtonComponent
              label="Search"
              disable={disableFlagRef.current}
              variant="brand"
              clickEvent={(e) => searchRecords(selectedDistrict)}
            />
          </div>
        </div>
      </div>
      <div
        className="slds-grid slds-wrap slds-m-around_medium"
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
            className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12 slds-m-around_medium"
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

export default SearchByDistrictComponent;
