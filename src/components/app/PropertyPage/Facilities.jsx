import React from "react";

function Facilities({ propertyData }) {
  const facilityLists = [
    [
      "Life Vests",
      "Life Rafts",
      "Fire alarms",
      "GPS",
      "Satellite & mobile phones",
      "First Aid Kit",
    ],
    [
      "Oxygen Kit",
      "Radio",
      "Shaded dive deck",
      "INT Tanks",
      "DIN Tanks",
      "Rental Equipment",
    ],
  ];
  const facilityLists2 = [
    "Plant-based meals available",
    "Indoor Salon",
    "Outdoor Dining",
    "Audio & Video System",
    "Freshwater maker",

    "Deck Towels",
    "Cabin towels",
    "Nitrox",
    "Camera Rinse Tanks",
    "Camera/Video Storage",
    "A/C cabins",
  ];

  const renderList = (list) => (
    <ul className="space-y-2">
      {list.map((item, index) => (
        <li key={index}>
          <span className="opacity-[30%]">—</span> {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-[#0080FF] text-white   sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px] ">
      <div className="customContainer px-4">
        <div className="text-start sm:mb-8 mb-[25px] ">
          <h1 className="sm:text-title text-title2  font-light font-outfit">
            Facilities
          </h1>
        </div>
        <div className="flex flex-row lg:flex-row gap-8">
          <ul className=" grid md:grid-cols-4  grid-cols-2  w-full justify-between space-y-2 md:space-y-1">
            {propertyData?.facilities?.map((item, index) => (
              <li className="mr-10 text-xl" key={index}>
                <span className="opacity-[70%]">—</span>{" "}
                <span className="font-roboto font-light text-[20px] leading-[26px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Facilities;
