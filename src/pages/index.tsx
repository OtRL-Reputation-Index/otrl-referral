import { useState } from "react";

import { EmployeeInformation } from "@/components/Employee";
import { EmployerInformation } from "@/components/Employer";
import { Survey } from "@/components/Survey";
import { Header } from "@/layout/Header";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  const [employerAuth, setEmployerAuth] = useState(false);
  const [employer, setEmployer] = useState(null);
  const [employee, setEmployee] = useState(null);

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
      <EmployerInformation
        setAuth={setEmployerAuth}
        setEmployer={setEmployer}
      />
      {employerAuth ? <EmployeeInformation setEmployee={setEmployee} /> : null}
      {employerAuth && employee ? (
        <Survey employee={employee} employer={employer} />
      ) : null}
    </Main>
  );
};

export default Index;
