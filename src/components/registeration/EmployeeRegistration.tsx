import React, { useRef, useState } from "react";

import { Employee } from "@/lib/types";
import { postEmployee } from "@/pages/api/db/employee";

export type EmployeeRegistrationProps = {
  setSubmit: any;
  publicKey: any;
};

const EmployeeRegistration = ({
  setSubmit,
  publicKey,
}: EmployeeRegistrationProps) => {
  const [load, setLoading] = useState(false);
  const employeeEmail = useRef<HTMLInputElement>(null);
  const employeeFName = useRef<HTMLInputElement>(null);
  const employeeMName = useRef<HTMLInputElement>(null);
  const employeeLName = useRef<HTMLInputElement>(null);
  const employeePhoneNum = useRef<HTMLInputElement>(null);

  const tryRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const employee: Employee = {
      id: "0",
      pk: publicKey.current?.value ? publicKey.current?.value : "",
      firstName: employeeFName.current?.value
        ? employeeFName.current?.value
        : "",
      middleName: employeeMName.current?.value
        ? employeeMName.current?.value
        : undefined,
      lastName: employeeLName.current?.value
        ? employeeLName.current?.value
        : "",
      phoneNum: employeePhoneNum.current?.value
        ? employeePhoneNum.current?.value
        : "",
      email: employeeEmail.current?.value ? employeeEmail.current?.value : "",
      rui: 0,
      numReferrals: 0,
    };

    const submitResult = await postEmployee(employee);
    if (submitResult) {
      setSubmit(2);
    } else {
      setSubmit(1);
    }
  };

  return (
    <form onSubmit={tryRegister} className="">
      <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8 sm:gap-4">
        <label htmlFor="employee-email-input">
          <div className="mt-2">Email</div>
        </label>
        <input
          id="employee-email-input"
          name="employee-email"
          placeholder="Email Address"
          ref={employeeEmail}
          required
          type="email"
          className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        <label htmlFor="employee-name-input">
          <div className="mt-2">Name</div>
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            id="employee-first-name-input"
            name="employee-first-name"
            placeholder="First Name"
            ref={employeeFName}
            required
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-60 min-w-36 duration-400"
          />
          <input
            id="employee-middle-name-input"
            name="employee-middle-name"
            placeholder="Middle Name"
            ref={employeeMName}
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-52 min-w-36 duration-400"
          />
          <input
            id="employee-last-name-input"
            name="employee-last-name"
            placeholder="Last Name"
            ref={employeeLName}
            required
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-60 min-w-36 duration-400"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-16 gap-y-4 mt-8 sm:gap-x-4">
        <label htmlFor="employee-number-input">
          <div className="mt-2">Phone</div>
        </label>
        <input
          id="employee-number-input"
          name="employee-number"
          placeholder="123-456-7890"
          ref={employeePhoneNum}
          required
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className="py-2 px-4 w-48 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
        />
        <div className="mt-2">Ex: 111-222-3333</div>
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

export { EmployeeRegistration };
