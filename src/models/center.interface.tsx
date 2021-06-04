export interface ICenterType {
  center_id: number;
  name: string;
  address: string;
  state_name: string;
  district_name: string;
  block_name: string;
  pincode: number;
  lat: number;
  long: number;
  from: string;
  to: string;
  fee_type: string;
  sessions: Array<ISession>;
  isSessionAvailable?: boolean;
}

interface ISession {
  session_id: string;
  date: string;
  min_age_limit: number;
  slots: string[];
  vaccine: string;
  fee: string;
  available_capacity_dose1: number;
  available_capacity_dose2: number;
  available_capacity: number;
}

// interface ISessionAddress {
//   address: string;
//   state_name: string;
//   district_name: string;
//   block_name: string;
//   pincode: number;
//   lat: number;
//   long: number;
// }

// interface IVaccineDetails {
//   vaccine: string;
//   fee: string;
//   available_capacity_dose1: number;
//   available_capacity_dose2: number;
//   available_capacity: number;
// }
