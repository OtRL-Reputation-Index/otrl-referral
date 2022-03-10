import { ReactNode } from "react";

import { appConfig } from "@/util/app";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="px-1 w-full antialiased text-gray-700">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-gray-900">
            {appConfig.title}
          </div>
          <div className="text-xl">{appConfig.description}</div>
        </div>
      </div>
      <div className="py-5 text-xl content">{props.children}</div>

      <div className="py-8 text-sm text-center border-t border-gray-300">
        © Copyright {new Date().getFullYear()} {appConfig.title}.
      </div>
    </div>
  </div>
);

export { Main };
