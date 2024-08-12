import React, { useState } from "react";

const Accommodation = ({ propertyData, resort }) => {
  console.log(propertyData?.schedules);
  const [activeButton, setActiveButton] = useState("Regular room");

  const lists = propertyData?.schedules?.flatMap((data) => {
    if (data?.itinerary?.cabins.length > 0) {
      return data?.itinerary?.cabins?.map((list) => ({
        id: list?._id,
        cabinName: list?.cabinName,
      }));
    }
    return []; // return an empty array if no cabins
  });

  const accommodationTypes = {
    "Regular room": {
      description:
        "The MSY Ilike liveaboard Raja Ampat caters for up to 16 guests in 8 cabins. All cabins have individually controlled air conditioning, en-suite bathrooms, and hot and cold showers. In addition, the thoughtfully designed rooms can be laid out as twins or doubles, so can easily provide for your requirements. The yacht offers a large, comfortable outside deck to chill out after an incredible day’s diving.",
      imgSrc:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    "Delux room": {
      description:
        "Experience luxury in our Delux room, featuring modern amenities and a spacious layout, perfect for relaxing after a day's adventure.",
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1661962739798-0af59dc30d14?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    "Super Delux room": {
      description:
        "Indulge in our Super Delux room, offering top-tier comfort and elegance with premium features to make your stay unforgettable.",
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1682433066496-2daf69be82f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  const { description, imgSrc } = accommodationTypes[activeButton];

  const Button = ({ label }) => (
    <button
      className={`px-4 py-1 text-sm md:text-xl  rounded-full border-2 ${
        activeButton === label
          ? "bg-[#0080FF] text-white border-[#0080FF]"
          : "text-[#0080FF] border-[#0080FF] hover:bg-[#0080FF] hover:text-white transition-colors duration-300"
      }`}
      onClick={() => setActiveButton(label)}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-[#F1F2F2]  sm:py-14 py-20 px-4 lg:px-0">
      <section className="customContainer flex flex-col-reverse lg:flex-row    justify-center  lg:py-16  gap-8 lg:gap-12 ">
        <div className="w-full lg:w-1/2 aspect-[2/3] lg:aspect-[2/3] order-first lg:order-none">
          <img
            className="w-full h-full object-cover"
            src={
              propertyData?.accommodation?.Picture ||
              propertyData?.accommodation?.image
            }
            alt={activeButton}
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-3xl -mt-2  text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] font-outfit">
              Accommodation
            </h1>
            <p className="text-[16px] md:text-xl font-light text-secondary    ">
              {propertyData?.accommodation?.description}
            </p>
          </div>
          {!resort && (
            <div className="flex flex-wrap gap-4 mt-12 lg:mt-16 text-[#2f2f30]">
              {lists?.map((button) => (
                <Button key={button?.id} label={button?.cabinName} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Accommodation;
