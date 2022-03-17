import React, { useRef, useState } from "react";

import { SubHeader } from "@/layout/SubHeader";
import { EmployeeInfoGet } from "@/lib/types";
import { getEmployeeInfo } from "@/pages/api/db/employee";

type EmployeeProps = {
  setEmployeeInfo: any;
};

const EmployeeInformation = ({ setEmployeeInfo }: EmployeeProps) => {
  const employeePk = useRef<HTMLInputElement>(null);
  const [foundMsg, setFoundMsg] = useState("");
  const [verified, setVerified] = useState(false);

  const getEmployee = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // No input
    if (!employeePk.current?.value) {
      setEmployeeInfo(null);
      setFoundMsg("❌ No record found!");
      setVerified(false);
      return;
    }

    const param: EmployeeInfoGet = {
      employeePk: employeePk.current?.value,
    };

    const employeeFetched = await getEmployeeInfo(param);

    if (employeeFetched) {
      setEmployeeInfo(employeeFetched);
      setVerified(true);
      setFoundMsg(
        `Name: ${employeeFetched.firstName} ${employeeFetched.lastName}`
      );
      return;
    }
    setEmployeeInfo(null);
    setFoundMsg("❌ No record found!");
    setVerified(false);
  };

  return (
    <div className="font-body text-sm">
      <SubHeader subHeading="Employee Information" />
      <div className="mx-3">
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
          <form onSubmit={getEmployee} className="flex gap-2 ">
            <div className="flex flex-wrap gap-4 ">
              <label htmlFor="employee-pk-input">
                <div className="mt-2">Employee Unique Identifier</div>
              </label>
              <input
                id="employee-pk-input"
                name="employee-pk"
                placeholder="Public Key"
                ref={employeePk}
                required
                type="text"
                className="py-2 px-4 w-48 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-36 duration-400"
              />
              <button
                type="submit"
                className=" font-semibold text-white bg-otrl-red hover:bg-otrl-light-red rounded-sm transition ease-in-out duration-400"
              >
                <div className="py-2 px-4">Select</div>
              </button>
            </div>
          </form>
          <div className={`mt-2 ${verified ? "" : "text-red-500"}`}>
            {foundMsg}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmployeeInformation };
