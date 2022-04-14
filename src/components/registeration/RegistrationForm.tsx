import React, { useState } from "react";


import { RegistrationInfo } from "@/components/registeration/RegistrationInfo";
import { SubHeader } from "@/layout/SubHeader";
import { SelectCompanyName } from "@/lib/types";

export type RegisterationFormProps = {
  setSubmit: any;
  publicKey: any;
  companyNames: SelectCompanyName[];
};

const RegisterationForm = ({
  setSubmit,
  publicKey,
  companyNames,
}: RegisterationFormProps) => {
  const [employerReg, setEmployerReg] = useState(true);

  return (
    <div className="font-body text-sm">
      <SubHeader subHeading="Your Information" />
      <div className="mx-3">
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-wrap gap-4 ">
            <div>Registering as an</div>
            <div className="flex gap-2 items-center">
              <input
                id="full-time-input"
                name="full-time"
                required
                type="radio"
                defaultChecked
                onClick={() => {
                  setEmployerReg(true);
                }}
                className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
              />

              <div className="text-sm font ">Employer</div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="full-time-input"
                name="full-time"
                required
                type="radio"
                onClick={() => {
                  setEmployerReg(false);
                }}
                className="float-left w-4 h-4 align-top checked:bg-otrl-red bg-center bg-no-repeat bg-contain rounded-full border border-gray-800 checked:border-otrl-red focus:outline-none transition duration-200 appearance-none form-check-input"
              />

              <div className="text-sm font ">Employee</div>
            </div>
          </div>
        </div>
        <RegistrationInfo
          setSubmit={setSubmit}
          publicKey={publicKey}
          companyNames={companyNames}
          isEmployer={employerReg}
        />
      </div>
    </div>
  );
};

export { RegisterationForm };
