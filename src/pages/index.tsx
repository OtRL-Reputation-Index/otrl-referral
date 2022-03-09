import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

import { getHelloWorld } from "./api/hello";

const Index = () => {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchHelloWorld() {
      try {
        const apiMsg = await getHelloWorld();
        if (apiMsg) {
          setMsg(apiMsg);
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
      <a href="https://ontheroadlending.org">
        <img
          src={`${router.basePath}/assets/images/otrl-logo.svg`}
          alt="On the Road"
          className="h-40"
        />
      </a>
      <h1 className="mt-24 text-2xl font-bold">Referral</h1>
      <h2>Lambda/Api reponds:</h2>
      <p>{msg}</p>
    </Main>
  );
};

export default Index;
