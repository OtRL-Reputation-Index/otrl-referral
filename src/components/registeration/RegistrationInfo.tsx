import React, { useRef, useState } from "react";

import Creatable from "react-select/creatable";

import { Employee, Employer, SelectCompanyName } from "@/lib/types";
import { postEmployee } from "@/pages/api/db/employee";
import { postEmployer } from "@/pages/api/db/employer";

export type RegistrationInfoProps = {
  setSubmit: any;
  publicKey: any;
  companyNames: SelectCompanyName[];
  isEmployer: boolean;
};

const RegistrationInfo = ({
  setSubmit,
  publicKey,
  companyNames,
  isEmployer,
}: RegistrationInfoProps) => {
  const [load, setLoading] = useState(false);
  const [companySelected, setCompanySelected] = useState("");
  const userEmail = useRef<HTMLInputElement>(null);
  const userFName = useRef<HTMLInputElement>(null);
  const userMName = useRef<HTMLInputElement>(null);
  const userLName = useRef<HTMLInputElement>(null);
  const userPhoneNum = useRef<HTMLInputElement>(null);

  const tryRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    let user: Employee | Employer = {
      id: "0",
      pk: publicKey.current?.value ? publicKey.current?.value : "",
      companyName: companySelected,
      firstName: userFName.current?.value ? userFName.current?.value : "",
      middleName: userMName.current?.value
        ? userMName.current?.value
        : undefined,
      lastName: userLName.current?.value ? userLName.current?.value : "",
      phoneNum: userPhoneNum.current?.value ? userPhoneNum.current?.value : "",
      email: userEmail.current?.value ? userEmail.current?.value : "",
    };

    if (!isEmployer) {
      // is an employee
      user = { ...user, rui: 0, numReferrals: 0 };
    }

    const submitResult = isEmployer
      ? await postEmployer(user as Employer)
      : await postEmployee(user as Employee);

    if (submitResult) {
      setSubmit(2); // successful
    } else {
      setSubmit(1); // failed
    }
  };

  return (
    <form onSubmit={tryRegister} className="">
      <div className="flex flex-wrap gap-4 mt-8">
        <label htmlFor="company-name-input">
          <div className="mt-2">Company Name</div>
        </label>
        <Creatable
          options={companyNames}
          onChange={(option) => {
            if (option) setCompanySelected(option?.label);
          }}
          className=" w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
          theme={(theme) => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              text: "orangered",
              primary25: "#ffcece",
              primary: "#e10600",
            },
          })}
        ></Creatable>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8 sm:gap-4">
        <label htmlFor="user-email-input">
          <div className="mt-2">Email</div>
        </label>
        <input
          id="user-email-input"
          name="user-email"
          placeholder="Email Address"
          ref={userEmail}
          required
          type="email"
          className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        <label htmlFor="user-name-input">
          <div className="mt-2">Name</div>
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            id="user-first-name-input"
            name="user-first-name"
            placeholder="First Name"
            ref={userFName}
            required
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-60 min-w-36 duration-400"
          />
          <input
            id="user-middle-name-input"
            name="user-middle-name"
            placeholder="Middle Name"
            ref={userMName}
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-52 min-w-36 duration-400"
          />
          <input
            id="user-last-name-input"
            name="user-last-name"
            placeholder="Last Name"
            ref={userLName}
            required
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-60 min-w-36 duration-400"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-16 gap-y-4 mt-8 sm:gap-x-4">
        <label htmlFor="user-number-input">
          <div className="mt-2">Phone</div>
        </label>
        <div className="flex gap-4">
          <input
            id="user-number-input"
            name="user-number"
            placeholder="Phone Number"
            ref={userPhoneNum}
            required
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="py-2 px-4 w-48 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
          />
          <div className="mt-2">Ex: 111-222-3333</div>
        </div>
      </div>
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
          <div className="py-3 px-6">REGISTER</div>
        </button>
      </div>
    </form>
  );
};

export { RegistrationInfo };
