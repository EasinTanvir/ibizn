import React from "react";
import { Carousel } from "react-responsive-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const board = [1, 2, 3];

const SpecialOffer = () => {
  return (
    <div className="px-5 md:px-0 customContainer   pt-[75px]  sm:pt-0 sm:pb-0 pb-[75px]  ">
      <h1 className="lg:text-title md:text-5xl  text-4xl font-extralight font-outfit text-primary mb-[35px] sm:mb-10">
        Special Offer
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
            <div key={i} className="lg:flex mb-10 w-full ">
              <div className="lg:flex items-center border   border-primary lg:w-[80%] md:w-full gap-10">
                <div className="h-full">
                  <div className="w-full lg:w-96 aspect-w-2 aspect-h-3">
                    <img
                      className="h-full w-full object-cover"
                      src="/images/client/boat.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="lg:w-[65%] w-full px-5 lg:p-0  text-left  h-full   relative ">
                  <div className="">
                    <h1 className="text-gray mt-[45px]  pb-2 font-medium font-roboto  text-[20px] leading-[22px] lg:text-subtitle">
                      Liveboard / Egypt
                    </h1>
                    <h2 className="  md:text-[32px] pb-2  text-[24px] leading-[24px] font-outfit font-light  text-primary">
                      Emperor Elite Liveaboard
                    </h2>
                    <p className="text-secondary font-roboto font-light  md:mt-2 xl:pe-12 lg:pe-5  md:text-[18px] sm:leading-[20px] leading-[18px] text-[16px] md:w-full">
                      Operating from Sharm El Sheikh, this liveaboard boasts a
                      professional and knowledgeable team of dive guides, ready
                      to take you to the best dive sites in the northern Red
                      Sea.
                    </p>
                  </div>
                  <div className="md:flex gap-10 mt-5 sm:absolute static bottom-0 left-0 w-full  ">
                    <h1 className="text-primary text-xl font-outfit font-light md:text-2xl ">
                      15 Mar — 21 Mar
                    </h1>
                    <h1 className="text-primary text-xl font-outfit font-light md:text-2xl pb-[45px]">
                      Vegan Raiting: 4.6
                    </h1>
                  </div>
                </div>
              </div>
              <div className="p-5 pb-0 lg:p-0 border border-t-0 sm:border sm:border-l-0 border-primary  flex justify-between items-center lg:flex-col lg:justify-center lg:w-[20%] ">
                <div className="text-center pt-4 pb-[35px]">
                  <div>
                    <h1>
                      <span className="inline-block text-[#c6c6c6] ms-1 me-1 font-semibold text-sm">
                        FROM
                      </span>
                      <span className="text-[#c6c6c6] text-2xl md:text-3xl line-through">
                        890
                      </span>{" "}
                      <span className="inline-block text-[#c6c6c6] ms-1 font-semibold text-sm">
                        USD
                      </span>
                    </h1>
                    <div className="text-primary">
                      <span className=" inline-block ms-1 font-semibold text-sm me-1">
                        FROM
                      </span>
                      <span className="text-3xl md:text-4xl font-semibold font-outfit">
                        655
                      </span>
                      <span className=" inline-block ms-1 font-semibold text-sm">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sm:mt-5 mt-3 bottom-0">
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
