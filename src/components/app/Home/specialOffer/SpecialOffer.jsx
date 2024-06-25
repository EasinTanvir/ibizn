import React from "react";
import { Carousel } from "react-responsive-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const board = [1, 2, 3];

const SpecialOffer = () => {
  return (
    <div className="px-5 md:px-0 customContainer  ">
      <h1 className="lg:text-title md:text-5xl  text-4xl font-extralight font-outfit text-primary mb-6 sm:mb-10">
        Special Offers
      </h1>
      <div className="relative">
        <Carousel
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
          showStatus={false}
          infiniteLoop={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                title={label}
                // className="absolute -bottom-10 lg:left-[20%] left-[10%] z-20 transform -translate-y-1/2 text-primary px-4 py-2 rounded "
                className="absolute -bottom-10 lg:left-[40%] left-[15%] z-20 transform -translate-y-1/2 text-primary px-4 py-2 rounded "
              >
                {/* <KeyboardArrowLeftIcon sx={{ fontSize: "40px" }} />
                 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                title={label}
                // className="absolute -bottom-10 lg:right-[20%] right-[10%] z-20 transform -translate-y-1/2 text-primary px-4 py-2 rounded"
                className="absolute -bottom-10 lg:right-[40%] right-[15%] z-20 transform -translate-y-1/2 text-primary px-4 py-2 rounded"
              >
                {/* <KeyboardArrowRightIcon sx={{ fontSize: "40px" }} /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )
          }
        >
          {board.map((i, item) => (
            <div key={i} className="lg:flex mb-10 w-full">
              <div className="lg:flex items-center border  sm:border border-r-2  border-primary lg:w-[80%] md:w-full gap-10">
                <div className="h-full">
                  <img
                    className={` h-full inline-block lg:w-96 w-full object-cover`}
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="lg:w-[65%] w-full p-5 lg:p-0  text-left">
                  <div>
                    <h1 className="text-gray mt-4 font-medium font-outfit text-xl md:text-xl lg:text-subtitle">
                      Liveboard / Egypt
                    </h1>
                    <h2 className="  md:text-[32px]  text-2xl font-[400] text-primary">
                      Emperor Elite Liveaboard
                    </h2>
                    <p className="text-secondary  md:mt-2 xl:pe-12 lg:pe-5 font-[400] md:text-lg text-base md:w-full">
                      Operating from Sharm El Sheikh, this liveaboard boasts a
                      professional and knowledgeable team of dive guides, ready
                      to take you to the best dive sites in the northern Red
                      Sea.
                    </p>
                  </div>
                  <div className="md:flex gap-10 mt-5">
                    <h1 className="text-primary text-xl font-outfit font-light md:text-2xl ">
                      15 Mar — 21 Mar
                    </h1>
                    <h1 className="text-primary text-xl font-outfit font-light md:text-2xl pb-6">
                      Vegan Raiting : 4.6
                    </h1>
                  </div>
                </div>
              </div>
              <div className="p-5 lg:p-0 border border-t-0 sm:border sm:border-l-0 border-primary border-r-2 flex justify-between items-center lg:flex-col lg:justify-center lg:w-[20%] ">
                <div className="text-center py-4">
                  <div>
                    <h1>
                      <span className="text-[#c6c6c6] text-2xl md:text-3xl line-through">
                        890
                      </span>{" "}
                      <span className="inline-block text-[#c6c6c6] ms-1 font-semibold text-sm">
                        USD
                      </span>
                    </h1>
                    <div className="text-primary">
                      <span className="text-2xl md:text-4xl font-semibold font-outfit">
                        655
                      </span>
                      <span className=" inline-block ms-1 font-semibold text-sm">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 bottom-0">
                  <button className="button3 text-xl text-[#f1f2f2]">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SpecialOffer;
