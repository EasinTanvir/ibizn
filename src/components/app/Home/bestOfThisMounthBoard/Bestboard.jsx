import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const starRating = 3;

const BestBoard = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on("slideChange", () => {
        setIsBeginning(swiperRef.current.swiper.isBeginning);
        setIsEnd(swiperRef.current.swiper.isEnd);
      });
    }
  }, []);

  return (
    <div className="bg-[#F1F2F2]  py-20">
      <div className="customContainer px-5 xl:px-0">
        <div>
          <h1 className="lg:text-title md:text-5xl  text-4xl  font-extralight font-outfit text-primary mb-2">
            Best of this month
          </h1>
          <h2 className="md:text-2xl md:leading-[26px] leading-5 text-lg   mt-1 lg:mt-3 text-secondary">
            Every month we select the best resorts and liveboards, according to
            your reviews
          </h2>
        </div>

        <div className=" flex justify-between relative  h-[435px] ">
          <>
            <div className="swiper-button image-swiper-button-next1">
              <ArrowBackIosNewIcon
                className={` text-primary ${
                  isBeginning ? "opacity-40" : "opacity-100"
                }`}
                style={{
                  fontSize: "32px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="swiper-button2 image-swiper-button-prev1">
              <ArrowForwardIosIcon
                className={`text-primary ${
                  isEnd ? "opacity-40" : "opacity-100"
                } `}
                style={{
                  fontSize: "32px",
                  cursor: "pointer",
                }}
              />
            </div>
          </>
          <Swiper
            ref={swiperRef}
            style={{
              "--swiper-pagination-color": "#0080ff",
              "--swiper-pagination-bullet-inactive-color": "white",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "24px",
              "--swiper-pagination-bullet-horizontal-gap": "6px",
            }}
            breakpoints={{
              300: {
                width: 200,
                slidesPerView: 1,
                spaceBetween: 0,
              },
              640: {
                width: 250,
                slidesPerView: 1,
                spaceBetween: 60,
              },
              768: {
                width: 650,
                slidesPerView: 3,
                spaceBetween: 80,
              },
              1200: {
                width: 1150,
                slidesPerView: 4,
                spaceBetween: 120,
              },
            }}
            pagination={{
              clickable: true,
            }}
            allowTouchMove={true}
            spaceBetween={120}
            navigation={{
              nextEl: ".image-swiper-button-prev1", // Use .image-swiper-button-prev for next
              prevEl: ".image-swiper-button-next1", // Use .image-swiper-button-next for previous
              disabledClass: "swiper-button-disabled",
            }}
            modules={[Pagination, Navigation]}
          >
            <SwiperSlide>
              <div className="mt-10 text-center   min-w-52   max-w-52 ">
                <div className=" w-40 h-40 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-xl md:text-2xl leading-5 md:leading-[24px]  font-[400] mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-md mt-1">
                    Liveboard / Egypt
                  </h2>
                  <div className="mt-1 flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <div className="" key={index}>
                        {star <= 3 ? (
                          <img
                            className="size-[16px]"
                            src="/images/client/starFull.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            className="size-[16px]"
                            src="/images/client/starEmpty.svg"
                            alt=""
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="button3 w-40 font-normal text-white  font-roboto  hover:bg-primary hover:text-white">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mt-10 text-center   min-w-52   max-w-52 ">
                <div className=" w-40 h-40 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-xl md:text-2xl leading-5 md:leading-[24px]  font-[400] mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-md mt-1">
                    Liveboard / Egypt
                  </h2>
                  <div className="mt-1 flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <div className="" key={index}>
                        {star <= 3 ? (
                          <img
                            className="size-[16px]"
                            src="/images/client/starFull.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            className="size-[16px]"
                            src="/images/client/starEmpty.svg"
                            alt=""
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="button3 w-40 font-normal text-white  font-roboto  hover:bg-primary hover:text-white">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="mt-10 text-center   min-w-52   max-w-52 ">
                <div className=" w-40 h-40 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-xl md:text-2xl leading-5 md:leading-[24px]  font-[400] mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-md mt-1">
                    Liveboard / Egypt
                  </h2>
                  <div className="mt-1 flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <div className="" key={index}>
                        {star <= 3 ? (
                          <img
                            className="size-[16px]"
                            src="/images/client/starFull.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            className="size-[16px]"
                            src="/images/client/starEmpty.svg"
                            alt=""
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="button3 w-40 font-normal text-white  font-roboto  hover:bg-primary hover:text-white">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="mt-10 text-center   min-w-52   max-w-52 ">
                <div className=" w-40 h-40 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-xl md:text-2xl leading-5 md:leading-[24px]  font-[400] mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-md mt-1">
                    Liveboard / Egypt
                  </h2>
                  <div className="mt-1 flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <div className="" key={index}>
                        {star <= 3 ? (
                          <img
                            className="size-[16px]"
                            src="/images/client/starFull.svg"
                            alt=""
                          />
                        ) : (
                          <img
                            className="size-[16px]"
                            src="/images/client/starEmpty.svg"
                            alt=""
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button className="button3 w-40 font-normal text-white  font-roboto  hover:bg-primary hover:text-white">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BestBoard;
