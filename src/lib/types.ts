export type Employee = {
  id: string;
  pk: string;
  companyName: string | undefined;
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

export type SelectCompanyName = {
  label: string;
  value: string;
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

export interface EmployerQuery {
  partialEmployer: string;
}

export interface MessageGet {
  message: string;
}

export interface ReferralGet {
  employer_id: string;
  employee_id: string;
}

export interface PrevReferral {
  score: number;
}

export interface SignatureVerify {
  pk: string;
  message: string;
  signature: string;
}

export interface BlockChainPost {
  employerPk: string;
  employeePk: string;
  message: string;
  digitalSignature: string;
  ruiScore: number;
}
export interface Submit {
  employerPk: string;
  employeePk: string;
  referral: Referral;
}

export interface ReferralPost {
  referral: Referral;
  surveyScore: number;
}
