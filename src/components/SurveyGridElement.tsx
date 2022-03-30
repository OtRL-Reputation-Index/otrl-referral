import React from "react";

type SurveyGridElementProps = {
  questionTitle: string;
  questionVariableName: string;
  survey: any;
  i: number;
  // survey: {
  //   sWorkTime: Number;
  //   sPressure: Number;
  //   sEthic: Number;
  //   sComplaints: Number;
  //   sRespect: Number;
  //   sReliable: Number;
  //   sTaskTime: Number;
  //   sTaskComplete: Number;
  //   sTaskCommunicate: Number;
  //   sFullTime: Number;
  //   sExperience: Number;
  // };
};

const SurveyGridElement = ({
  questionTitle,
  questionVariableName,
  survey,
  i,
}: SurveyGridElementProps) => {
  const bg = i % 2 === 0 ? " bg-otrl-pink px-2 py-6 " : " px-2 py-6 ";
  const smFlex = (
    <div
      className={`${bg} flex col-span-8 justify-between rounded-b-md sm:hidden px-2 py-0 -mt-6`}
    >
      <div className={`flex gap-4 items-center ${bg} form-check rounded `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 1;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font">1</div>
      </div>
      <div className={`flex gap-4 items-center ${bg} form-check rounded-bl-md`}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 2;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">2</div>
      </div>
      <div className={`flex gap-4 items-center ${bg} form-check `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          defaultChecked
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 3;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">3</div>
      </div>
      <div className={`flex gap-4 items-center ${bg} form-check `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 4;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">4</div>
      </div>
      <div className={`flex gap-4 items-center ${bg} rounded-br-md`}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 5;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">5</div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`${bg} col-span-8 sm:col-span-3 rounded-t-md sm:rounded-r-none `}
      >
        {questionTitle}
      </div>
      {smFlex}
      <div className={`hidden sm:flex gap-4 items-center${bg} form-check `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 1;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font">1</div>
      </div>
      <div className={`hidden sm:flex gap-4 items-center${bg} form-check `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 2;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">2</div>
      </div>
      <div className={`hidden sm:flex gap-4 items-center${bg} form-check `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          defaultChecked
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 3;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">3</div>
      </div>
      <div className={`hidden sm:flex gap-4 items-center${bg} form-check `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 4;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">4</div>
      </div>
      <div className={`hidden sm:flex gap-4 items-center${bg} rounded-r-md `}>
        <input
          id={`${questionVariableName}-input`}
          name={questionVariableName}
          required
          type="radio"
          onClick={() => {
            // eslint-disable-next-line no-param-reassign
            survey[questionVariableName] = 5;
          }}
          className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
        />

        <div className="text-sm font ">5</div>
      </div>
    </>
  );
};

export { SurveyGridElement };
