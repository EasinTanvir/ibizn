import dynamic from "next/dynamic";
import React from "react";
//import SecondPage from "../../src/components/app/secondPage/SecondPage"

import { Blocks } from "react-loader-spinner";
const SecondPage = dynamic(
  () => import("../../src/components/app/secondPage/SecondPage"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[calc(100vh-70px)] flex justify-center items-center">
        <div className="flex flex-col">
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
          <span className="font-semibold">Please Wait...</span>
        </div>
      </div>
    ),
  }
);

const index = () => {
  return (
    <div>
      <SecondPage />
    </div>
  );
};

export default index;
