import { Employee, EmployeeUpdate, Submit } from "@/lib/types";
import { weights } from "@/pages/api/weights";

import { fetchEmployee, updateEmployee } from "./db/employee";
import { postReferral } from "./db/referral";

const submitReferral = async ({ referral }: Submit): Promise<boolean> => {
  let ruiScore = 0;
  let newRUIscore = 0;

  const employee: Employee | undefined = await fetchEmployee({
    employeeId: referral.employeeId,
  });

  if (!employee) {
    return false;
  }

  Object.keys(referral.survey).forEach((question: string) => {
    ruiScore +=
      referral.survey[question as keyof typeof referral.survey] *
      weights[question as keyof typeof weights];
  });

  ruiScore /= Object.keys(referral.survey).length;

  newRUIscore =
    (employee.rui * employee.numReferrals + ruiScore) /
    (employee.numReferrals + 1);

  if (!(await postReferral(referral))) {
    return false;
  }
  const params: EmployeeUpdate = {
    id: referral.employeeId,
    newRui: newRUIscore,
    newNumReferrals: employee.numReferrals + 1,
    lastUpdated: referral.submittedAt,
  };

  if (!(await updateEmployee(params))) {
    return false;
  }

  return true;
};

export { submitReferral };
