import { useRef, useState } from "react";

import { Authentication } from "@/components/registeration/Authentication";
import { RegistrationConfirmation } from "@/components/registeration/RegistrationConfirmation";
import { RegisterationForm } from "@/components/registeration/RegistrationForm";
import { Header } from "@/layout/Header";
import { Meta } from "@/layout/Meta";
import { SelectCompanyName } from "@/lib/types";
import { Main } from "@/templates/Main";

import { queryEmployers } from "./api/db/employer";

export type RegisterPageProps = {
  companyNames: SelectCompanyName[];
};

const Register = ({ companyNames }: RegisterPageProps) => {
  const [auth, setAuth] = useState(false);
  const publicKey = useRef<HTMLInputElement>(null);
  const [submit, setSubmit] = useState(0);

  let body;
  if (submit === 0) {
    body = (
      <>
        <Authentication
          setAuth={setAuth}
          publicKey={publicKey}
          setSubmit={setSubmit}
        />
        {auth ? (
          <RegisterationForm
            setSubmit={setSubmit}
            publicKey={publicKey}
            companyNames={companyNames}
          />
        ) : null}
      </>
    );
  } else if (submit === 2) {
    body = <RegistrationConfirmation success={true} />;
  } else if (submit === 1) {
    body = <RegistrationConfirmation success={false} />;
  }

  return (
    <Main
      meta={
        <Meta
          title="On The Road Lending Referral"
          description="Register as an employee or an employee using On The Road Lending referral system."
        />
      }
    >
      <Header heading="Registration" />
      {body}
    </Main>
  );
};

export default Register;

export async function getServerSideProps() {
  const employerNames = await queryEmployers();

  return {
    props: {
      companyNames: employerNames,
    },
  };
}
