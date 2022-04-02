import Router from "next/router";

type SurveyConfirmationProps = {
  success: boolean;
};
const SurveyConfirmation = ({ success }: SurveyConfirmationProps) => {
  const btn = success ? "GO BACK" : "TRY AGAIN";
  return (
    <>
      <div className="mt-[3.25rem] w-full border-t border-black" />

      {success ? (
        <div className="text-green-700">
          <div className="mt-8 font-heading text-4xl">Success!</div>
          <div className="mt-4 text-black">
            Your survey has been successfully submitted!
          </div>
        </div>
      ) : (
        <div className="text-otrl-red">
          <div className="mt-8 font-heading text-4xl">Whoops!</div>
          <div className="mt-4 text-black">
            There was an error submitting the survey. Please contact the
            administrator!
          </div>
        </div>
      )}
      <div className="flex justify-end mt-12 mr-8">
        <button
          type="submit"
          onClick={() => {
            Router.reload();
          }}
          className=" font-heading text-2xl font-light text-white bg-otrl-light-blue hover:bg-otrl-blue rounded-sm transition ease-in-out m font- duration-400"
        >
          <div className="py-3 px-6">{btn}</div>
        </button>
      </div>
    </>
  );
};

export { SurveyConfirmation };
