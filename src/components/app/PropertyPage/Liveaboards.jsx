import { userContext } from "@/src/storage/contextApi";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

function Liveaboards({ propertyData }) {
  const { searchValues } = useContext(userContext);
  console.log(searchValues);

  const [activeButton, setActiveButton] = useState("Liveaboard");
  const router = useRouter();
  const buttons = [
    "Liveaboard",
    "Accommodation",
    "Facilities",
    "Food",
    "Diving",
    "Exclusions",
    "Itineraries and prices",
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-full h-[94vh]  pb-48 ">
        <div className="w-full h-[83%]    ">
          <img
            className="w-full h-full object-cover"
            src={propertyData?.featuredImage || propertyData?.featureImage}
            alt="Liveaboard"
          />
        </div>
        <div className="w-full h-[17%] ">
          <div className=" w-full  flex flex-col  md:flex-col md:flex md:w-full">
            <div className="bg-[#0080FF] text-white    ">
              <div className=" flex sm:flex-col flex-col-reverse gap-2  sm:gap-0  customContainer md:py-8 py-4 sm:px-0 px-4">
                <h1 className="md:text-3xl text-2xl md:font-light ">
                  {searchValues?.destination} |{" "}
                  {searchValues?.tabValue === "Resorts" ||
                  searchValues?.property === "resort"
                    ? "Resort"
                    : "Liveaboards"}
                </h1>
                <h1 className="text-5xl  md:block md:text-8xl font-light mt-2">
                  {propertyData?.nameOfProperty || propertyData?.propertyName}
                </h1>
              </div>
            </div>

            <div className=" bg-[#0080FF] text-white xl:h-16 h-auto    border-t-[1px] md:border-white md:flex md:items-center md:justify-between md:pl-8 md:w-full md:py-0 md:px-8 px-4">
              <div className="flex flex-wrap justify-start  py-4  gap-3 sm:ps-4  customContainer ">
                {buttons.map((button) => (
                  <button
                    key={button}
                    className={`rounded-full border border-white text-sm md:text-lg  px-5 sm:py-0 py-1  ${
                      activeButton === button
                        ? "bg-white text-[#0080FF]"
                        : "hover:bg-white hover:text-[#0080FF] cursor-pointer transition duration-300"
                    }`}
                    onClick={() => {
                      setActiveButton(button);
                      scrollToSection(button.toLowerCase());
                      if (button.includes(" ")) {
                        scrollToSection(
                          button.replace(/\s+/g, "").toLocaleLowerCase()
                        );
                      }
                    }}
                  >
                    {button}
                  </button>
                ))}
              </div>
              <div
                onClick={() => router.push("/secondPage")}
                className="text-white  -mt-2 sm:mt-0 md:ml-8"
              >
                <ul className="underline font-[200] px-2 md:py-8 py-2 cursor-pointer text-nowrap">
                  Back to Results
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Liveaboards;
