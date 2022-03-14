import React from "react";

import { SubHeader } from "@/layout/SubHeader";
import { Employee, Employer, Submit } from "@/lib/types";

type SurveyProps = {
  employee: Employee | null;
  employer: Employer | null;
};

const Survey = ({ employee, employer }: SurveyProps) => {
  // TODO: Add useRefs for all fields of the survey

  const submitReferral = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const timeNow = new Date();
    // TODO: Fill out the object with correct parameters
    const param: Submit = {
      referral: {
        id: 0,
        employeePk: "",
        employerPk: "",
        message: "",
        signature: "",
        sWorkTime: 0,
        sPressure: 0,
        sEthic: 0,
        sComplaints: 0,
        sRespect: 0,
        sReliable: 0,
        sTaskTime: 0,
        sTaskComplete: 0,
        sTaskCommunicate: 0,
        sTaskExperience: 0,
        submittedAt: timeNow,
      },
      employeeUpdate: {
        id: 0,
        newRui: 0,
        newNumReferrals: 0,
        lastUpdated: timeNow,
      },
    };

    // TODO: Submit referral
    console.log(param);
    console.log(employee);
    console.log(employer);

    // TODO: Redirect to a confirmation page
  };

  return (
    <div className="font-body text-sm">
      <SubHeader subHeading="Survey" />
      <div className="mx-3">
        <div className="mt-8 font-bold text-center">
          Please fill out the follow survey about the employee.
        </div>
        <div className="mt-4">
          Employee...
          <form onSubmit={submitReferral}>
            {/* TODO: Implement the survery using tailwind grid and flex. 
            Learn more: https://tailwindcss.com/docs/flex-basis */}
            <div className="flex justify-center mt-16">
              <button
                type="submit"
                className=" font-heading text-2xl font-light text-white bg-otrl-light-blue hover:bg-otrl-blue rounded-sm transition ease-in-out m font- duration-400"
              >
                <div className="py-3 px-6">SUBMIT</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Survey };
