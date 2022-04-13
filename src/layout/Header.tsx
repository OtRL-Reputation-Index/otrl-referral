import { useRouter } from "next/router";

type HeaderProps = {
  heading: string;
};

const Header = ({ heading }: HeaderProps) => {
  const router = useRouter();
  /* const [enabled, setEnabled] = useState({ value: false });

  if (heading.includes("Registration")) {
    enabled.value = false;
  } else {
    enabled.value = true;
  } */

  const redirectBtn = heading.includes("Registration") ? "REFER" : "REGISTER";
  const redirectLink = heading.includes("Registration") ? "/" : "/register";
  /* const referActivated = heading.includes("Registration")
    ? " pl-6 bg-otrl-light-blue "
    : " px-6 bg-otrl-blue ";

  const registerActivated = heading.includes("Registration")
    ? " px-6 bg-otrl-blue "
    : " pr-6 bg-otrl-light-blue "; */

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-wrap gap-10 items-end">
        <div className="w-40">
          <a href="https://ontheroadlending.org">
            <img
              src={`${router.basePath}/assets/images/otrl-logo.svg`}
              alt="On the Road"
            />
          </a>
        </div>
        <h1 className=" text-4xl ">{heading}</h1>
      </div>
      {/* <button
        className="flex gap-4 font-heading text-2xl font-light text-white bg-otrl-light-blue rounded-full"
        type="button"
        onClick={() => {
          router.push(redirectLink);
        }}
      >
        <div className={`py-2 rounded-full${referActivated}`}>REFER</div>
        <div className={`py-2 rounded-full${registerActivated}`}>REGISTER</div>
      </button> */}
      <button
        type="button"
        onClick={() => {
          router.push(redirectLink);
        }}
        className="py-3 px-6 mr-8 font-heading text-2xl font-light text-center text-white bg-otrl-light-blue hover:bg-otrl-blue rounded-full focus:outline-none focus:ring-4 focus:ring-otrl-blue hover:drop-shadow-xl transition ease-in-out duration-400"
      >
        {redirectBtn}
      </button>
    </div>
  );
};

export { Header };
