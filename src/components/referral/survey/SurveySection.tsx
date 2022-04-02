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
  const [load, setLoading] = useState(false);
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
    setLoading(true);
    const timeNow = new Date();
    const param: Submit = {
      employeePk: employeeInfo?.pk ? employeeInfo?.pk : "",
      employerPk: employer?.pk ? employer?.pk : "",
      referral: {
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

      <div className="mt-8 font-bold text-center">
        Please fill out the follow survey about the employee.
      </div>
      <div className="mt-4">
        <form onSubmit={trySubmitReferral}>
          <div className="grid grid-cols-8 grid-flow-row ">
            <div className="col-span-8 py-6 px-2 sm:col-span-2">
              Employee...
            </div>
            <div className="col-span-2 py-6 px-2 -mt-6 text-center sm:col-start-3 sm:ml-14 col-start-0">
              Strongly Disagree
            </div>
            <div className="col-span-2 col-start-7 py-6 px-2 -mt-6 text-center sm:ml-14">
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
          <div className="px-2">
            <ExperienceElement setExp={setExp} />
          </div>
          {!exp && tried ? (
            <div className="-mb-4 h-4 text-xs text-otrl-red">
              Please select an option!
            </div>
          ) : null}
          <div className="flex justify-end mt-16 mr-8">
            {load ? (
              <div className="flex justify-center ">
                <div className="flex p-5 space-x-3 loader">
                  <div className="animate-bounce">
                    <div className="w-5 h-5 bg-gradient-to-r from-gray-300 via-gray-400 to-blue-400 rounded-full background-delay-1 background-animate"></div>
                  </div>
                  <div className="animate-bounce">
                    <div className="w-5 h-5 bg-gradient-to-r from-gray-300 via-gray-400 to-blue-400 rounded-full background-delay-3 background-animate-2"></div>
                  </div>
                  <div className="animate-bounce">
                    <div className="w-5 h-5 bg-gradient-to-r from-gray-300 via-gray-400 to-blue-400 rounded-full background-delay-6 background-animate"></div>
                  </div>
                </div>
              </div>
            ) : null}
            <button
              type="submit"
              className="font-heading text-2xl font-light text-white bg-otrl-light-blue hover:bg-otrl-blue rounded-sm hover:drop-shadow-xl transition ease-in-out duration-400"
            >
              <div className="py-3 px-6">SUBMIT</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SurveySection };
