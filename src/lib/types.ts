export type Employee = {
  id: Number;
  pk: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  phoneNum: string;
  email: string;
  rui: Number;
  numReferrals: Number;
};

export type Employer = {
  id: Number;
  pk: string;
  companyName: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  phoneNum: string;
  email: string;
};

export type Referral = {
  id: Number;
  employeePk: string;
  employerPk: string;
  message: string;
  signature: string;
  sWorkTime: Number;
  sPressure: Number;
  sEthic: Number;
  sComplaints: Number;
  sRespect: Number;
  sReliable: Number;
  sTaskTime: Number;
  sTaskComplete: Number;
  sTaskCommunicate: Number;
  sTaskExperience: Number;
  submittedAt: Date;
};

export interface EmployeeUpdate {
  id: Number;
  newRui: Number;
  newNumReferrals: Number;
  lastUpdated: Date;
}

export interface EmployeeGet {
  employeePk: Number;
}

export interface EmployerGet {
  employerPk: Number;
}

export interface MessageGet {
  message: string;
}

export interface SignatureVerify {
  pk: string;
  message: string;
  signature: string;
}

export interface Submit {
  referral: Referral;
  employeeUpdate: EmployeeUpdate;
}
