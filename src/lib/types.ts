export type Employee = {
  id: Number;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  phoneNum: string;
  pk: string;
  numReferrals: Number;
  rui: Number;
};

export interface EmployeeUpdate {
  id: Number;
  newRui: Number;
  newNumReferrals: Number;
}
