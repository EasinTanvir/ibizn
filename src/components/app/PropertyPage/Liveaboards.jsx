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
      <div className="w-full lg:h-[100vh] md:h-[92vh] sm:h-[85vh] h-[65vh]  sm:mb-0 mb-44   ">
        <div className="w-full h-[75%] relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              className="absolute inset-0 w-full h-full "
              style={{ aspectRatio: "3 / 2" }}
              src={propertyData?.featuredImage || propertyData?.featureImage}
              alt="Liveaboard"
            />
          </div>
        </div>
        <div className="w-full h-[17%] ">
          <div className=" w-full  flex flex-col  md:flex-col md:flex md:w-full  ">
            <div className="bg-[#0080FF] text-white    ">
              <div className=" flex sm:flex-col flex-col-reverse gap-[25px]  sm:gap-0  customContainer md:py-[30px] pt-[45px] pb-[35px] sm:px-0 px-4">
                <h1 className="md:text-[22px] text-lg font-light font-roboto  ">
                  {searchValues?.destination} |{" "}
                  {searchValues?.tabValue === "Resorts" ||
                  searchValues?.property === "resort"
                    ? "Resort"
                    : "Liveaboards"}
                </h1>
                <h1 className="text-5xl  md:block md:text-title font-outfit font-light ">
                  {propertyData?.nameOfProperty || propertyData?.propertyName}
                </h1>
              </div>
            </div>

            <div className=" bg-[#0080FF]   text-white xl:h-16 h-auto    border-t-[1px] md:border-white md:flex md:items-center md:justify-between md:pl-10 md:w-full sm:py-0 mb-[35px] pb-[35px] md:px-8 px-4 md:pr-[130px] ">
              <div className="flex flex-wrap justify-start   py-4  gap-3 sm:ps-4  customContainer ">
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
                onClick={() => router.push("/search")}
                className="text-white  -mt-2 sm:mt-0     "
              >
                <buttons className="underline font-[200]  md:py-8 py-2 cursor-pointer text-nowrap">
                  Back to Results
                </buttons>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Liveaboards;
