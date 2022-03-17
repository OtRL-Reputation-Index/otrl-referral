import { useRef, useState } from "react";

import { EmployeeInformation } from "@/components/Employee";
import { EmployerInformation } from "@/components/Employer";
import { SurveySection } from "@/components/SurveySection";
import { Confirmation } from "@/layout/Confirmation";
import { Header } from "@/layout/Header";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  const [employerAuth, setEmployerAuth] = useState(false);
  const [employer, setEmployer] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [signMsg, setSignMsg] = useState("");
  const digitalSignature = useRef<HTMLInputElement>(null);
  const [submit, setSubmit] = useState(0);

  let body;
  if (submit === 0) {
    body = (
      <>
        <EmployerInformation
          setAuth={setEmployerAuth}
          setEmployer={setEmployer}
          signMsg={signMsg}
          setSignMsg={setSignMsg}
          digitalSignature={digitalSignature}
        />
        {employerAuth ? (
          <EmployeeInformation setEmployeeInfo={setEmployeeInfo} />
        ) : null}
        {employerAuth && employeeInfo ? (
          <SurveySection
            employeeInfo={employeeInfo}
            employer={employer}
            signMsg={signMsg}
            digitalSignature={digitalSignature}
            setSubmit={setSubmit}
          />
        ) : null}
      </>
    );
  } else if (submit === 2) {
    body = <Confirmation success={true} />;
  } else if (submit === 1) {
    body = <Confirmation success={false} />;
  }

  return (
    <Main
      meta={
        <Meta
          title="On The Road Lending Referral"
          description="Submit a referral for your employee using On The Road Lending referral system."
        />
      }
    >
      <Header />
      {body}
    </Main>
  );
};

export default Index;
