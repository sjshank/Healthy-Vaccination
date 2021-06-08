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
import _ from "lodash";
import * as AppConstant from "../../constants/appConstant";
import "./styles.css";
import { ICenterType } from "../../models/center.interface";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
import ExpandCollapseBarComponent from "../../components/ExpandCollapseBar";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import { useFetchDistrictJson, usePageLoadAction } from "../../utils/CustomHooks";
import { useToasts } from "react-toast-notifications";
import VaccinationCenterComponent from "../../components/VaccinationCenter";
import FilterComponent from "../Filter";
import { VaccinationFilterContext } from "../../context/VaccinationFilter";
import NavigateComponent from "../../components/Navigation";

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

const CalendarByDistrictComponent = (props: any) => {
  const filterContext = useContext(VaccinationFilterContext);
  const { vaccinationFilterState, resetFilter } = filterContext;
  const { addToast } = useToasts();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictObject>();
  const disableFlagRef = useRef<boolean>(true);
  const [districtList, setDistrictList] = useState<Array<DistrictObject | any>>(
    []
  );
  const [stateLabel, setStateLabel] = useState<string>("Select State");
  const [districtLabel, setDistrictLabel] = useState<string>("Select District");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(1);
  const vaccinationCenters = useRef<ICenterType[]>([]);
  const [filteredVaccinationCenters, setVaccinationCenters] = useState<
    ICenterType[]
  >([]);
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);
  const history = useHistory();
  const districtJSON = useFetchDistrictJson();
  usePageLoadAction(disableFlagRef, resetFilter, "stateBtn");

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

  const searchRecords = (selectedValue?: DistrictObject) => {
    setIsLoading(true);
    SearchAPI.searchRecordsCalendarByDistrict(
      `district_id=${selectedValue?.value}&date=${getTodayDateFormatted()}`
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

  const handleBackAction = () => {
    resetFilter();
    history.push("/");
  };

  const resetAction = () => {
    setSelectedDistrict(undefined);
    disableFlagRef.current = true;
    setDistrictLabel("Select District");
    setStateLabel("Select State");
    setDistrictList([]);
    setVaccinationCenters([]);
    vaccinationCenters.current = [];
    setLimit(1);
    resetFilter();
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
            label="Search By Pin"
            variant="link"
            customClass="slds-float_right"
            url="searchByPin"
          />
        </div>
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
            <ButtonComponent label="Home" clickEvent={handleBackAction} />
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

export default CalendarByDistrictComponent;
