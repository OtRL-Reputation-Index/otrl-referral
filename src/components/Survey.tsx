import React from "react";

import { SubHeader } from "@/layout/SubHeader";
import { Employee, Employer, Submit } from "@/lib/types";

import { ExperienceElement } from "./ExperienceElement";
import { SurveyGridElement } from "./SurveyGridElement";

type SurveyProps = {
  employee: Employee | null;
  employer: Employer | null;
};

const Survey = ({ employee, employer }: SurveyProps) => {
  // TODO: Add useRefs for all fields of the survey
  // const [survey, setSurvey] = useState({
  //   sWorkTime: 3,
  //   sPressure: 3,
  //   sEthic: 3,
  //   sComplaints: 3,
  //   sRespect: 3,
  //   sReliable: 3,
  //   sTaskTime: 3,
  //   sTaskComplete: 3,
  //   sTaskCommunicate: 3,
  //   sFullTime: 3,
  //   sExperience: 3,
  // });

  const survey = {
    sWorkTime: 3,
    sPressure: 3,
    sEthic: 3,
    sComplaints: 3,
    sRespect: 3,
    sReliable: 3,
    sTaskTime: 3,
    sTaskComplete: 3,
    sTaskCommunicate: 3,
    sFullTime: 3,
    sExperience: 3,
  };

  const surveyQuestions = {
    sWorkTime: "Shows up to work on time",
    sPressure: "Behaves well under pressure",
    sEthic: "Has exceptional work ethic",
    sComplaints: "Does not receive complaints from coworkers",
    sRespect: "Is a well respected member of the workplace",
    sReliable: "Is a reliable individual in the workplace",
    sTaskTime: "Always completes tasks on time",
    sTaskComplete: "Always fully completes assigned tasks",
    sTaskCommunicate: "Has great communication skills",
  };

  const gridQuestions: JSX.Element[] = [];
  let i = 0;
  Object.keys(surveyQuestions).forEach((questionVariableName: string) => {
    gridQuestions.push(
      <SurveyGridElement
        questionTitle={
          surveyQuestions[questionVariableName as keyof typeof surveyQuestions]
        }
        questionVariableName={questionVariableName}
        survey={survey}
        i={i}
      />
    );
    i += 1;
  });
  console.log("Here");
  console.log(survey);
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
        sFullTime: 0,
        sExperience: 0,
        submittedAt: timeNow,
      },
    };

    // TODO: Submit referral
    console.log(survey);
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
          <form onSubmit={submitReferral}>
            <div className="grid grid-cols-8 grid-flow-row ">
              <div className="col-span-2 py-6 px-2">Employee...</div>
              <div className="col-span-2 col-start-3 py-6 px-2 ml-14 text-center">
                Strongly Disagree
              </div>
              <div className="col-span-2 col-start-7 py-6 px-2 ml-14 text-center">
                Strongly Agree
              </div>
              {gridQuestions}
            </div>
            <div className="flex gap-6 px-2 mt-8">
              <div>Are they a fulltime employee?</div>
              <div className="flex gap-2 items-center">
                <input
                  id="full-time-input"
                  name="full-time"
                  required
                  type="radio"
                  onClick={(e) => {
                    e.preventDefault();
                    // eslint-disable-next-line no-param-reassign
                    survey.sFullTime = 2;
                  }}
                  className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
                />

                <div className="text-sm font ">Yes</div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  id="full-time-input"
                  name="full-time"
                  required
                  type="radio"
                  onClick={(e) => {
                    e.preventDefault();
                    // eslint-disable-next-line no-param-reassign
                    survey.sFullTime = 1;
                  }}
                  className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
                />

                <div className="text-sm font ">No</div>
              </div>
            </div>
            <ExperienceElement survey={survey} />
            <div className="flex justify-end mt-16 mr-8">
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
