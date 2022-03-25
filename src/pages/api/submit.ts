import { BlockChainPost, Employee, EmployeeUpdate, Submit } from "@/lib/types";
import { weights } from "@/pages/api/weights";

import { postBlockchain } from "./blockchain/post";
import { fetchEmployee, updateEmployee } from "./db/employee";
import { fetchPrevReferral, postReferral } from "./db/referral";

const submitReferral = async ({
  referral,
  employeePk,
  employerPk,
}: Submit): Promise<boolean> => {
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

  // Check if a referral already exists
  const prevReferral = await fetchPrevReferral({
    employee_id: referral.employeeId,
    employer_id: referral.employerId,
  });

  if (prevReferral) {
    newRUIscore =
      (employee.rui * employee.numReferrals - prevReferral.score + ruiScore) /
      employee.numReferrals;
  } else {
    newRUIscore =
      (employee.rui * employee.numReferrals + ruiScore) /
      (employee.numReferrals + 1);
  }

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
  const blockChainParams: BlockChainPost = {
    employeePk,
    employerPk,
    ruiScore,
    digitalSignature: referral.signature,
    message: referral.message,
  };
  if (!(await postBlockchain(blockChainParams))) {
    return false;
  }

  return true;
};

export { submitReferral };
