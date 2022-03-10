import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

import { fetchEmployee } from "./api/db/employee";

const Index = () => {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchHelloWorld() {
      try {
        const apiMsg = await fetchEmployee("saD");
        if (apiMsg) {
          setMsg(apiMsg.pk);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchHelloWorld();
  });

  return (
    <Main
      meta={
        <Meta
          title="On The Road Lending Referral"
          description="Submit a referral for your employee using On The Road Lending referral system."
        />
      }
    >
      <div className="w-40">
        <a href="https://ontheroadlending.org">
          <img
            src={`${router.basePath}/assets/images/otrl-logo.svg`}
            alt="On the Road"
          />
        </a>
      </div>
      <h1 className="mt-24 text-2xl font-bold">Referral</h1>
      {msg}
    </Main>
  );
};

export default Index;
