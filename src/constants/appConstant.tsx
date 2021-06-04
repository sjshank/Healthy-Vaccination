export const DASHBOARD_CONFIG = Object.freeze({
  vaccinationSites: {
    title: "Centers Driving Vaccination",
    total: 0,
    subTitleOne_Label: "Government",
    subTitleTwo_Label: "Private",
    subTitleOne_Value: 0,
    subTitleTwo_Value: 0,
  },
  vaccinationRegistration: {
    title: "Total Registrations",
    total: 0,
    subTitleOne_Label: "Age 18-44",
    subTitleTwo_Label: "Age 45+",
    subTitleOne_Value: 0,
    subTitleTwo_Value: 0,
  },
  vaccinationDoses: {
    title: "Total Vaccination Doses",
    total: 0,
    subTitleOne_Label: "Dose 1",
    subTitleTwo_Label: "Dose 2",
    subTitleOne_Value: 0,
    subTitleTwo_Value: 0,
  },
  vaccinationSessions: {
    title: "Total Vaccination Sessions",
    total: 0,
    subTitleOne_Label: "Government",
    subTitleTwo_Label: "Private",
    subTitleOne_Value: 0,
    subTitleTwo_Value: 0,
  },
});

export const PUBLIC_APIS = Object.freeze({
  dashboardBaseUrl: "https://api.cowin.gov.in/api/v1/reports/v2/",
  authBaseUrl: "https://cdn-api.co-vin.in/api/v2/auth/public/",
  searchBaseUrl:
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/",
  certificateBaseUrl:
    "https://cdn-api.co-vin.in/api/v2/registration/certificate/public/",
});

export const SEMI_DONUT_PLOT_OPTIONS = Object.freeze({
  pie: {
    allowPointSelect: true,
    cursor: "pointer",
    dataLabels: {
      enabled: true,
      distance: -60,
    },
    size: "90%",
    showInLegend: true,
  },
});

export const PIE_PLOT_OPTIONS = Object.freeze({
  pie: {
    allowPointSelect: true,
    cursor: "pointer",
    dataLabels: {
      enabled: true,
      distance: -60,
    },
    size: "90%",
    showInLegend: true,
  },
});

export const TOAST_OPTIONS = Object.freeze({
  autoDismiss: true,
  autoDismissTimeout: 5000,
  PlacementType: "top-center",
  Placement: "top-center",
  transitionState: "entering",
});

export const OTP_SENT_SUCCESS_MSG = "An OTP has been sent to XXX XXX ";
export const OTP_ALREADY_SENT_ERROR_MSG =
  "OTP already sent. Please wait for sometime to regenerate.";
export const INVALID_OTP_ERROR_MSG = "You have entered invalid otp.";
export const BENEFICIARY_REF_ID_ERROR_MSG =
  "Beneficiary Reference Id does not exists. Please enter a valid reference Id.";

export const GENERIC_ERROR =
  "Something went wrong ! Please try agin after sometime.";

export const STATE_LIST: Array<{ label: string; value: number }> = [
  { label: "Andaman and Nicobar Islands", value: 1 },
  { label: "Andhra Pradesh", value: 2 },
  { label: "Arunachal Pradesh", value: 3 },
  { label: "Assam", value: 4 },
  { label: "Bihar", value: 5 },
  { label: "Chandigarh", value: 6 },
  { label: "Chhattisgarh", value: 7 },
  { label: "Dadra and Nagar Haveli", value: 8 },
  { label: "Delhi", value: 9 },
  { label: "Goa", value: 10 },
  { label: "Gujarat", value: 11 },
  { label: "Haryana", value: 12 },
  { label: "Himachal Pradesh", value: 13 },
  { label: "Jammu and Kashmir", value: 14 },
  { label: "Jharkhand", value: 15 },
  { label: "Karnataka", value: 16 },
  { label: "Kerala", value: 17 },
  { label: "Ladakh", value: 18 },
  { label: "Lakshadweep", value: 19 },
  { label: "Madhya Pradesh", value: 20 },
  { label: "Maharashtra", value: 21 },
  { label: "Manipur", value: 22 },
  { label: "Meghalaya", value: 23 },
  { label: "Mizoram", value: 24 },
  { label: "Nagaland", value: 25 },
  { label: "Odisha", value: 26 },
  { label: "Puducherry", value: 27 },
  { label: "Punjab", value: 28 },
  { label: "Rajasthan", value: 29 },
  { label: "Sikkim", value: 30 },
  { label: "Tamil Nadu", value: 31 },
  { label: "Telangana", value: 32 },
  { label: "Tripura", value: 33 },
  { label: "Uttar Pradesh", value: 34 },
  { label: "Uttarakhand", value: 35 },
  { label: "West Bengal", value: 36 },
  { label: "Daman and Diu", value: 37 },
];
