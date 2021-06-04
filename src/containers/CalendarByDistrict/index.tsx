import React, { useEffect, useState, useRef, lazy } from "react";
import styles from "./styles.module.less";
import ButtonComponent from "../../generic/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "@salesforce/design-system-react/components/menu-dropdown";
import DropdownTrigger from "@salesforce/design-system-react/components/menu-dropdown/button-trigger";
import Button from "@salesforce/design-system-react/components/button/";
import { SearchAPI } from "../../services/searchAPI";
import { getTodayDateFormatted } from "../../utils/Helper";
import SpinnerComponent from "../../generic/Spinner";
import _ from "lodash";
import * as AppConstant from "../../constants/appConstant";
import "./styles.css";
import { ICenterType } from "../../models/center.interface";
import TotalRecordsBarComponent from "../../components/TotalRecordsBar";
import ExpandCollapseBarComponent from "../../components/ExpandCollapseBar";
import LoadMoreComponent from "../../components/LoadMore";
import ScopedNotificationComponent from "../../generic/ScopedNotification";
import { useFetchDistrictJson } from "../../utils/CustomHooks";
import { useToasts } from "react-toast-notifications";

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
  const [vaccinationCenters, setVaccinationCenters] = useState<ICenterType[]>(
    []
  );
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);
  const history = useHistory();
  const districtJSON = useFetchDistrictJson();
  useEffect(() => {
    disableFlagRef.current = true;
    document.getElementById("stateBtn")?.focus();
  }, []);

  const searchRecords = (selectedValue?: DistrictObject) => {
    setIsLoading(true);
    SearchAPI.searchRecordsCalendarByDistrict(
      `district_id=${selectedValue?.value}&date=${getTodayDateFormatted()}`
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

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const resetAction = () => {
    setSelectedDistrict(undefined);
    disableFlagRef.current = true;
    setDistrictLabel("Select District");
    setStateLabel("Select State");
    setDistrictList([]);
    setVaccinationCenters([]);
    setLimit(1);
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
        <div className="slds-size_12-of-12 slds-medium-size_12-of-12 slds-large-size_5-of-12">
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
            <ButtonComponent label="Back" clickEvent={() => history.goBack()} />
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

export default CalendarByDistrictComponent;
