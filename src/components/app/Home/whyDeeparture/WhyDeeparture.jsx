import { whyDeeptures } from "@/src/constant/whyDeeptures";
import React from "react";

const WhyDeeparture = () => {
  return (
    <div className="bg-primary sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]">
      <div className="px-5 xl:px-0 customContainer">
        <div>
          <h1
            className="lg:text-title text-[40px] leading-[40px] font-light font-outfit 
          text-[#f1f2f2] lg:mb-6 mb-3"
          >
            Why Deeparture
          </h1>
          <p className="text-[#f1f2f2] font-light font-roboto  text-[20px] leading-[22px] md:text-[27px] md:leading-[26px] md:w-full lg:w-3/4 w-full">
            We are a team of professional scuba dives, free dives, artists and
            environmental advocates who work tirelessly to provide you with
            incredible, inclusive dive experiences, from experience, that you
            deserve. Explore adventures and book easily online for your next
            dive deeparture.
          </p>
        </div>
        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-[45px]">
          {whyDeeptures.map((item, index) => (
            <div key={index} className="text-white space-y-3">
              <img src={item.icon} className="size-14" alt="" />
              <h1 className="text-[24px] md:leading-[24px]  text-[#f1f2f2] font-outfit font-semibold">
                {item.title}
              </h1>
              <p className="text-[#f1f2f2] text-[16px] md:text-[18px] md:leading-[22px] leading-[18px]  font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyDeeparture;
