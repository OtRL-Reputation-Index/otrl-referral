export type Employee = {
  id: string;
  pk: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  phoneNum: string;
  email: string;
  rui: number;
  numReferrals: number;
};

export type Employer = {
  id: string;
  pk: string;
  companyName: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  phoneNum: string;
  email: string;
};

export type Referral = {
  id: string;
  employeeId: string;
  employerId: string;
  message: string;
  signature: string;
  submittedAt: Date;
  survey: Survey;
};

export type Survey = {
  sWorkTime: number;
  sPressure: number;
  sEthic: number;
  sComplaints: number;
  sRespect: number;
  sReliable: number;
  sTaskTime: number;
  sTaskComplete: number;
  sTaskCommunicate: number;
  sFullTime: number;
  sExperience: number;
};

export interface EmployeeInfo {
  id: string;
  pk: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
}

export interface EmployeeUpdate {
  id: string;
  newRui: number;
  newNumReferrals: number;
  lastUpdated: Date;
}

export interface EmployeeInfoGet {
  employeePk: string;
}
export interface EmployeeGet {
  employeeId: string;
}

export interface EmployerGet {
  employerPk: string;
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
}
