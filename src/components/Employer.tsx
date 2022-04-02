import React, { useRef, useState } from "react";

import { SubHeader } from "@/layout/SubHeader";
import { EmployerGet } from "@/lib/types";
import { generateMessage, verifyMessage } from "@/pages/api/blockchain/verify";
import { fetchEmployer } from "@/pages/api/db/employer";

import { Clipboard } from "./ui/Clipboard";
import { Spinner } from "./ui/Spinner";

type EmployerProps = {
  setAuth: any; // react useState handler for auth
  setEmployer: any;
  signMsg: any;
  setSignMsg: any;
  setSubmit: any;
  digitalSignature: any;
};

const EmployerInformation = ({
  setAuth,
  setEmployer,
  signMsg,
  setSignMsg,
  setSubmit,
  digitalSignature,
}: EmployerProps) => {
  const employerPk = useRef<HTMLInputElement>(null);
  const [foundMsg, setFoundMsg] = useState(<></>);
  const [resMsg, setResMsg] = useState(<></>);
  const [unverified, setUnverified] = useState(false);
  const [verified, setVerified] = useState(false);
  const [unverifiedEmployer, setUnverifiedEmployer] = useState({});
  const [msgLoading, setMsgLoading] = useState(false);

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

  const getEmployer = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // No input
    if (!employerPk.current?.value) {
      setUnverifiedEmployer({});
      setFoundMsg(<>❌ No record found!</>);
      setUnverified(false);
      setAuth(false);
      return;
    }

    const param: EmployerGet = {
      employerPk: employerPk.current?.value,
    };

    setFoundMsg(<Spinner />);
    const employerFetched = await fetchEmployer(param);

    if (employerFetched) {
      setUnverifiedEmployer(employerFetched);
      setFoundMsg(<>{`Employer: ${employerFetched.companyName}`}</>);
      setMsgLoading(true);
      setUnverified(true);
      const msg = await generateMessage(param.employerPk);
      setMsgLoading(false);
      if (msg === "Error") {
        setSubmit(1);
      }
      setSignMsg(msg);
      return;
    }
    setUnverifiedEmployer({});
    setSignMsg("");
    setFoundMsg(<>❌ No record found!</>);
    setUnverified(false);
    setAuth(false);
  };

  const verifySignature = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setResMsg(<Spinner />);
    const verification: boolean = await verifyMessage(
      employerPk.current?.value ? employerPk.current?.value : "",
      signMsg,
      digitalSignature.current?.value ? digitalSignature.current?.value : ""
    );
    // Verify digital signature
    if (verification) {
      setEmployer(unverifiedEmployer);
      setVerified(true);
      setResMsg(<>✔ Digital Signature Verified!</>);
      setAuth(true);
      return;
    }
    setEmployer(null);
    setResMsg(<>{"❌ Couldn't Verify Digital Signature"}</>);
    setVerified(false);
    setAuth(false);
  };

  return (
    <div className="font-body text-sm">
      <SubHeader subHeading="Employer Information" />
      <div className="mx-3">
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
          <form onSubmit={getEmployer} className="flex gap-2 ">
            <div className="flex flex-wrap gap-4 ">
              <label htmlFor="employer-pk-input">
                <div className="mt-2">Employer Unique Identifier</div>
              </label>
              <input
                id="employer-pk-input"
                name="employer-pk"
                placeholder="Public Key"
                ref={employerPk}
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

export { EmployerInformation };
