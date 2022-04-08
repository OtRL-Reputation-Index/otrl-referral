import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-10 items-end">
      <div className="w-40">
        <a href="https://ontheroadlending.org">
          <img
            src={`${router.basePath}/assets/images/otrl-logo.svg`}
            alt="On the Road"
          />
        </a>
      </div>
      <h1 className=" text-4xl ">Reputation Index</h1>
    </div>
  );
};

export { Header };
