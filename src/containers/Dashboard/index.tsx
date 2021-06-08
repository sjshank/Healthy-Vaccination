import React, { useEffect, useRef, useState } from "react";
import CardComponent from "../../components/Card";
import VaccinationByAgeComponent from "../../components/VaccinationByAge";
import VaccinationByCategoryComponent from "../../components/VaccinationByCategory";
import VaccinationByStateComponent from "../../components/VaccinationByStates";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import { RiFirstAidKitFill } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { ImOffice } from "react-icons/im";
import * as AppConstant from "../../constants/appConstant";
import { DashboardType } from "../../models/dashboard.interface";
import { DashboardAPI } from "../../services/dashboardAPI";
import SpinnerComponent from "../../generic/Spinner";
import VaccinationSessionOverviewComponent from "../../components/VaccinationSessionOverview";
import VaccineRegistrationComponent from "../../components/VaccineRegistration";
import VaccinationAvailabilityComponent from "../../components/VaccinationAvailability";
import VaccineAppointmentCertification from "../VaccineAppointmentCertification";
import styles from "./styles.module.less";
import { useToasts } from "react-toast-notifications";

const DashBoardComponent = () => {
  const isLoading = useRef(true);
  const { addToast } = useToasts();
  const [dashboardData, setDashboardData] = useState<DashboardType>();
  const [vaccinationSiteState, setVaccinationSite] = useState({
    ...AppConstant.DASHBOARD_CONFIG.vaccinationSites,
  });
  const [vaccinationRegistrationState, setVaccinationRegistration] = useState({
    ...AppConstant.DASHBOARD_CONFIG.vaccinationRegistration,
  });
  const [vaccinationDosesState, setVaccinationDoses] = useState({
    ...AppConstant.DASHBOARD_CONFIG.vaccinationDoses,
  });
  const [vaccinationSessionsState, setVaccinationSessionsState] = useState({
    ...AppConstant.DASHBOARD_CONFIG.vaccinationSessions,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    DashboardAPI.getDashBoardData()
      .then((data) => {
        isLoading.current = false;
        //set dashboard data
        setDashboardData(data);
        //set vaccination site data
        setVaccinationSite({
          ...vaccinationSiteState,
          total: data.topBlock.sites.total,
          subTitleOne_Value: data.topBlock.sites.govt,
          subTitleTwo_Value: data.topBlock.sites.pvt,
        });
        //set vaccination registration data
        setVaccinationRegistration({
          ...vaccinationRegistrationState,
          total: data.topBlock.registration.total,
          subTitleOne_Value: data.topBlock.registration.cit_18_45,
          subTitleTwo_Value: data.topBlock.registration.cit_45_above,
        });
        //set vaccination doses data
        setVaccinationDoses({
          ...vaccinationDosesState,
          total: data.topBlock.vaccination.total_doses,
          subTitleOne_Value: data.topBlock.vaccination.tot_dose_1,
          subTitleTwo_Value: data.topBlock.vaccination.tot_dose_2,
        });
        //set vaccination sessions data
        setVaccinationSessionsState({
          ...vaccinationSessionsState,
          total: data.topBlock.sessions.total,
          subTitleOne_Value: data.topBlock.sessions.govt,
          subTitleTwo_Value: data.topBlock.sessions.pvt,
        });
      })
      .catch((err) => {
        isLoading.current = false;
        addToast(AppConstant.GENERIC_ERROR, {
          appearance: "error",
        });
        console.log("ERRRRRRRRRR", err);
      });
    return () => {};
  }, []);

  const disclaimerContent = () => {
    return (
      <div className="slds-grid slds-wrap ">
        <div className="slds-size_12-of-12 slds-text-align_right">
          <sup>*</sup>
          <span
            className="slds-text-body_small slds-text-color_weak slds-m-right_small"
            style={{ textDecoration: "underline" }}
          >
            It's not a GOI official website.
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading.current && (
        <div>
          <SpinnerComponent
            size="large"
            variant="base"
            label="Loading data..."
          />
        </div>
      )}
      {!isLoading.current && (
        <div>
          <div className="slds-grid slds-wrap ">
            <div className="slds-col slds-size_12-of-12 slds-p-horizontal_x-small slds-p-vertical_small slds-text-align_center">
              <BsFillInfoCircleFill size="1em" />
              <small className="slds-m-left_xx-small">
                Co-WIN Public APIs allow any third-party application to access
                certain un-restricted information, that can be shared with its
                users. This is limited only to read access in Co-WIN.
              </small>
            </div>
            <div
              className={`slds-col slds-size_12-of-12 slds-p-horizontal_x-small slds-p-vertical_small slds-text-align_right ${styles.appointmentCertBtnSection}`}
            >
              <VaccineAppointmentCertification />
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-p-horizontal_x-small slds-p-vertical_small">
              <CardComponent {...vaccinationSiteState}>
                <ImOffice size="2em" />
              </CardComponent>
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-p-horizontal_x-small slds-p-vertical_small">
              <CardComponent {...vaccinationSessionsState}>
                <FaBusinessTime size="2em" />
              </CardComponent>
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-p-horizontal_x-small slds-p-vertical_small">
              <CardComponent {...vaccinationRegistrationState}>
                <TiGroup size="2em" />
              </CardComponent>
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-p-horizontal_x-small slds-p-vertical_small">
              <CardComponent {...vaccinationDosesState}>
                <RiFirstAidKitFill size="2em" />
              </CardComponent>
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-p-horizontal_x-small slds-m-vertical_medium">
              <VaccinationByCategoryComponent
                vaccionationDose={dashboardData?.topBlock?.vaccination}
              />
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_6-of-12  slds-large-size_3-of-12 slds-p-horizontal_x-small slds-m-vertical_medium">
              <VaccinationByAgeComponent
                age={dashboardData?.vaccinationByAge}
              />
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_12-of-12  slds-large-size_6-of-12 slds-p-horizontal_x-small slds-m-vertical_medium">
              <VaccinationByStateComponent
                beneficiaries={dashboardData?.getBeneficiariesGroupBy}
              />
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_12-of-12  slds-large-size_6-of-12 slds-p-horizontal_x-small slds-m-vertical_medium">
              <VaccinationSessionOverviewComponent
                sessions={dashboardData?.last5daySessionStatus}
              />
            </div>
            <div className="slds-size_12-of-12  slds-medium-size_12-of-12  slds-large-size_6-of-12 slds-p-horizontal_x-small slds-m-vertical_medium">
              <VaccineRegistrationComponent
                registrations={dashboardData?.last7DaysRegistration}
              />
            </div>
            <div className="slds-col slds-size_12-of-12 slds-p-horizontal_x-small slds-m-vertical_medium slds-text-align_center">
              <VaccinationAvailabilityComponent />
            </div>
          </div>
          {/* {disclaimerContent()} */}
        </div>
      )}
    </>
  );
};

export default DashBoardComponent;
