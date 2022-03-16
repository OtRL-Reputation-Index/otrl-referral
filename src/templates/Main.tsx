import { ReactNode } from "react";

import { appConfig } from "@/util/app";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="px-1 w-full antialiased ">
    {props.meta}

    <div className="mx-auto max-w-screen-lg">
      <div className="py-5 text-xl content">{props.children}</div>

      <div className="py-8 text-sm text-center border-t border-gray-300">
        © Copyright {new Date().getFullYear()} {appConfig.title}.
      </div>
    </div>
  </div>
);

export { Main };
