import React, { useRef, useState } from "react";

import { Employer } from "@/lib/types";
import { postEmployer } from "@/pages/api/db/employer";

export type EmployerRegistrationProps = {
  setSubmit: any;
  publicKey: any;
};

const EmployerRegistration = ({
  setSubmit,
  publicKey,
}: EmployerRegistrationProps) => {
  const [load, setLoading] = useState(false);
  const companyName = useRef<HTMLInputElement>(null);
  const employerEmail = useRef<HTMLInputElement>(null);
  const employerFName = useRef<HTMLInputElement>(null);
  const employerMName = useRef<HTMLInputElement>(null);
  const employerLName = useRef<HTMLInputElement>(null);
  const employerPhoneNum = useRef<HTMLInputElement>(null);

  const tryRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const employer: Employer = {
      id: "0",
      pk: publicKey.current?.value ? publicKey.current?.value : "",
      companyName: companyName.current?.value ? companyName.current?.value : "",
      firstName: employerFName.current?.value
        ? employerFName.current?.value
        : "",
      middleName: employerMName.current?.value
        ? employerMName.current?.value
        : undefined,
      lastName: employerLName.current?.value
        ? employerLName.current?.value
        : "",
      phoneNum: employerPhoneNum.current?.value
        ? employerPhoneNum.current?.value
        : "",
      email: employerEmail.current?.value ? employerEmail.current?.value : "",
    };

    console.log(employer);
    const submitResult = await postEmployer(employer);
    if (submitResult) {
      setSubmit(2);
    } else {
      setSubmit(1);
    }
  };

  return (
    <form onSubmit={tryRegister} className="">
      <div className="flex flex-wrap gap-4 mt-8">
        <label htmlFor="company-name-input">
          <div className="mt-2">Company Name</div>
        </label>
        <input
          id="company-name-input"
          name="company-name"
          placeholder="On the Road Lending"
          ref={companyName}
          required
          type="text"
          className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
        />
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8 sm:gap-4">
        <label htmlFor="employer-email-input">
          <div className="mt-2">Email</div>
        </label>
        <input
          id="employer-email-input"
          name="employer-email"
          placeholder="Email Address"
          ref={employerEmail}
          required
          type="email"
          className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        <label htmlFor="employer-name-input">
          <div className="mt-2">Name</div>
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            id="employer-first-name-input"
            name="employer-first-name"
            placeholder="First Name"
            ref={employerFName}
            required
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-60 min-w-36 duration-400"
          />
          <input
            id="employer-middle-name-input"
            name="employer-middle-name"
            placeholder="Middle Name"
            ref={employerMName}
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-52 min-w-36 duration-400"
          />
          <input
            id="employer-last-name-input"
            name="employer-last-name"
            placeholder="Last Name"
            ref={employerLName}
            required
            type="text"
            className="py-2 px-4 w-80 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition sm:w-60 min-w-36 duration-400"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-16 gap-y-4 mt-8 sm:gap-x-4">
        <label htmlFor="employer-number-input">
          <div className="mt-2">Phone</div>
        </label>
        <div className="flex gap-4">
          <input
            id="employer-number-input"
            name="employer-number"
            placeholder="Phone Number"
            ref={employerPhoneNum}
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

export { EmployerRegistration };
