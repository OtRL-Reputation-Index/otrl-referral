import React, { useRef, useState } from "react";

import { Clipboard } from "@/components/ui/Clipboard";
import { Spinner } from "@/components/ui/Spinner";
import { SubHeader } from "@/layout/SubHeader";
import { EmployeeInfoGet, EmployerGet } from "@/lib/types";
import { generateMessage, verifyMessage } from "@/pages/api/blockchain/verify";
import { getEmployeeInfo } from "@/pages/api/db/employee";
import { fetchEmployer } from "@/pages/api/db/employer";

type AuthenticationProps = {
  setAuth: any; // react useState handler for auth
  publicKey: any;
  setSubmit: any;
};

const Authentication = ({
  setAuth,
  publicKey,
  setSubmit,
}: AuthenticationProps) => {
  const [signMsg, setSignMsg] = useState("");
  const [foundMsg, setFoundMsg] = useState(<></>);
  const [resMsg, setResMsg] = useState(<></>);
  const [unverified, setUnverified] = useState(false);
  const [verified, setVerified] = useState(false);
  const [msgLoading, setMsgLoading] = useState(false);
  const digitalSignature = useRef<HTMLInputElement>(null);
  let msgDiv;
  if (unverified) {
    msgDiv = (
      <div className="flex flex-wrap gap-x-2 items-center break-words">
        {"Message: "}
        {msgLoading ? (
          <Spinner />
        ) : (
          <>
            {signMsg}
            <button
              aria-label="Copy to Clipboard"
              onClick={() => {
                navigator.clipboard.writeText(signMsg);
              }}
            >
              <Clipboard />
            </button>
          </>
        )}
      </div>
    );
  } else {
    msgDiv = null;
  }

  const getMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // No input
    if (!publicKey.current?.value) {
      setUnverified(false);
      setAuth(false);
      return;
    }

    // Employee already exists
    const employeeParam: EmployeeInfoGet = {
      employeePk: publicKey.current?.value,
    };
    const employerParam: EmployerGet = { employerPk: publicKey.current?.value };
    const employerCheck = await fetchEmployer(employerParam);
    const employeeCheck = await getEmployeeInfo(employeeParam);

    if (employerCheck || employeeCheck) {
      setFoundMsg(<>❌ Unique identifier already exists!</>);
      setUnverified(false);
      setAuth(false);
      return;
    }
    setFoundMsg(<></>);
    setMsgLoading(true);
    setUnverified(true);
    const msg = await generateMessage(publicKey.current?.value);
    setMsgLoading(false);
    if (msg === "Error") {
      setSubmit(1);
    }
    setSignMsg(msg);
  };

  const verifySignature = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setResMsg(<Spinner />);
    const verification: boolean = await verifyMessage(
      publicKey.current?.value ? publicKey.current?.value : "",
      signMsg,
      digitalSignature.current?.value ? digitalSignature.current?.value : ""
    );
    // Verify digital signature
    if (verification) {
      setVerified(true);
      setResMsg(<>✔ Digital Signature Verified!</>);
      setAuth(true);
      return;
    }
    setResMsg(<>{"❌ Couldn't Verify Digital Signature"}</>);
    setVerified(false);
    setAuth(false);
  };

  return (
    <div className="font-body text-sm">
      <SubHeader subHeading="Authentication" />
      <div className="mx-3">
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
          <form onSubmit={getMessage} className="flex gap-2 ">
            <div className="flex flex-wrap gap-4 ">
              <label htmlFor="employer-pk-input">
                <div className="mt-2">Unique Identifier</div>
              </label>
              <input
                id="employer-pk-input"
                name="employer-pk"
                placeholder="Public Key"
                ref={publicKey}
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
          <div className={`mt-2 ${unverified ? "" : "text-red-500"}`}>
            {foundMsg}
          </div>
        </div>
        <div className="flex mt-8 break-all">{msgDiv}</div>
        {unverified && !msgLoading ? (
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
            <form onSubmit={verifySignature} className="flex gap-2 ">
              <div className="flex flex-wrap gap-4 ">
                <label htmlFor="digital-signature-input">
                  <div className="mt-2">Digital Signature</div>
                </label>
                <input
                  id="digital-signature-input"
                  name="digital-signature"
                  placeholder="Encrypted Message"
                  ref={digitalSignature}
                  required
                  type="text"
                  className="py-2 px-4 w-64 hover:text-black bg-gray-200 hover:bg-gray-300 rounded-md transition min-w-40 duration-400"
                />
                <button
                  type="submit"
                  className="font-semibold text-white bg-otrl-red hover:bg-otrl-light-red rounded-sm transition ease-in-out duration-400"
                >
                  <div className="py-2 px-4">Verify</div>
                </button>
              </div>
            </form>
            <div
              className={`mt-2 ${verified ? "text-green-700" : "text-red-500"}`}
            >
              {resMsg}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Authentication };
