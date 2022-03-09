import { useRouter } from "next/router";

import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  const router = useRouter();

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
    </Main>
  );
};

export default Index;
