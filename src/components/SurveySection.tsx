import React, { useState } from "react";

import { SubHeader } from "@/layout/SubHeader";
import { EmployeeInfo, Employer, Submit, Survey } from "@/lib/types";
import { submitReferral } from "@/pages/api/submit";

import { ExperienceElement } from "./ExperienceElement";
import { SurveyGridElement } from "./SurveyGridElement";

type SurveySectionProps = {
  employeeInfo: EmployeeInfo | null;
  employer: Employer | null;
  signMsg: any;
  digitalSignature: any;
  setSubmit: any;
};

const SurveySection = ({
  employeeInfo,
  employer,
  signMsg,
  digitalSignature,
  setSubmit,
}: SurveySectionProps) => {
  const [exp, setExp] = useState(0);
  const [tried, setTried] = useState(false);
  const [survey] = useState<Survey>({
    sWorkTime: 3,
    sPressure: 3,
    sEthic: 3,
    sComplaints: 3,
    sRespect: 3,
    sReliable: 3,
    sTaskTime: 3,
    sTaskComplete: 3,
    sTaskCommunicate: 3,
    sFullTime: 2,
    sExperience: 0,
  });

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
        key={i}
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
  const trySubmitReferral = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!exp) {
      setTried(true);
      return;
    }

    const timeNow = new Date();
    const param: Submit = {
      referral: {
        id: Date.now() as unknown as string,
        employeeId: employeeInfo?.id ? employeeInfo?.id : "",
        employerId: employer?.id ? employer?.id : "",
        message: signMsg,
        signature: digitalSignature.current?.value
          ? digitalSignature.current?.value
          : "",
        survey: {
          sWorkTime: survey.sWorkTime,
          sPressure: survey.sPressure,
          sEthic: survey.sEthic,
          sComplaints: survey.sComplaints,
          sRespect: survey.sRespect,
          sReliable: survey.sReliable,
          sTaskTime: survey.sTaskTime,
          sTaskComplete: survey.sTaskComplete,
          sTaskCommunicate: survey.sTaskCommunicate,
          sFullTime: survey.sFullTime,
          sExperience: exp,
        },
        submittedAt: timeNow,
      },
    };

    const submitResult = await submitReferral(param);
    if (submitResult) {
      setSubmit(2);
    } else {
      setSubmit(1);
    }
  };

  return (
    <div className="font-body text-sm">
      <SubHeader subHeading="Survey" />
      <div className="mx-3">
        <div className="mt-8 font-bold text-center">
          Please fill out the follow survey about the employee.
        </div>
        <div className="mt-4">
          <form onSubmit={trySubmitReferral}>
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
                  defaultChecked
                  onClick={() => {
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
                  onClick={() => {
                    // eslint-disable-next-line no-param-reassign
                    survey.sFullTime = 1;
                  }}
                  className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
                />

                <div className="text-sm font ">No</div>
              </div>
            </div>
            <ExperienceElement setExp={setExp} />
            {!exp && tried ? (
              <div className="-mb-4 h-4 text-xs text-otrl-red">
                Please select an option!
              </div>
            ) : null}
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

export { SurveySection };
