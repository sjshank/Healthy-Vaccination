export interface DashboardType {
  topBlock: ITopBlock;
  getBeneficiariesGroupBy: IBeneficiary[];
  vaccinationByAge: IVaccinationAge;
  last5daySessionStatus: IVaccinationSession[];
  last7DaysRegistration: IVaccinationRegistered[];
}

interface ITopBlock {
  sites: IVaccinationSite;
  sessions: IVaccinationSite;
  registration: IVaccinationRegistration;
  vaccination: IVaccinationDose;
}

export interface IVaccinationSite {
  total: number;
  govt: number;
  pvt: number;
}

export interface IVaccinationRegistration {
  total: number;
  cit_18_45: number;
  cit_45_above: number;
}

export interface IVaccinationDose {
  total: number;
  male: number;
  female: number;
  others: number;
  tot_dose_1: number;
  tot_dose_2: number;
  total_doses: number;
  covishield: number;
  covaxin: number;
  sputnik: number;
}

export interface IVaccinationAge {
  vac_18_45?: number;
  vac_45_60?: number;
  above_60?: number;
  total?: number;
}

export interface IBeneficiary {
  state_id: number;
  id: any;
  title: string;
  state_name: string;
  total: number;
  partial_vaccinated: number;
  totally_vaccinated: number;
  today: number;
}

export interface IVaccinationSession {
  session_date: string;
  total: number;
  planned: number;
  ongoing: number;
  completed: number;
}

export interface IVaccinationRegistered {
  reg_date: string;
  total: number;
  male: number;
  female: number;
  others: number;
}
