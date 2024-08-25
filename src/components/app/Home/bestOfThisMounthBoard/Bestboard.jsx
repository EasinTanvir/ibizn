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
    <div className="bg-[#F1F2F2]   sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]">
      <div className="customContainer   px-5 xl:px-0">
        <div className="sm:mb-5">
          <h1 className="sm:text-title   text-[40px] leading-[40px]  font-light font-outfit text-primary mb-2 sm:mb-4">
            Best of this month
          </h1>
          <h2 className="md:text-[22px] md:leading-[22px] font-roboto font-light text-[20px] leading-[22px]   sm:mt-1 mt-[25px] lg:mt-3 text-secondary">
            Every month we select the best resorts and liveboards, according to
            your reviews
          </h2>
        </div>

        <div className=" mt-[45px] sm:mt-10 flex justify-between relative  sm:h-[435px] h-[400px] ">
          <>
            <div className="swiper-button  image-swiper-button-next1">
              <ArrowBackIosNewIcon
                sx={{
                  stroke: "#ffffff",
                  strokeWidth: 0.5,
                }}
                className={` text-primary ${
                  isBeginning ? "opacity-40" : "opacity-100"
                }`}
                style={{
                  fontSize: "36px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="swiper-button2 image-swiper-button-prev1">
              <ArrowForwardIosIcon
                sx={{
                  stroke: "#ffffff",
                  strokeWidth: 0.5,
                }}
                className={`text-primary ${
                  isEnd ? "opacity-40" : "opacity-100"
                } `}
                style={{
                  fontSize: "36px",
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
                width: 180,
                slidesPerView: 1,
                spaceBetween: 5,
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
              <div className=" text-center     w-fit   max-w-48 ">
                <div className=" w-36 h-36 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-[20px] md:text-2xl leading-5 md:leading-[24px]  font-normal mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-[16px] mt-1">
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
                  <div className="mt-4">
                    <button className="button3 w-40 font-normal text-white bg-primary  border-none outline-none  font-roboto hover:border hover:border-primary hover:bg-white hover:text-primary">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=" text-center     w-fit   max-w-48 ">
                <div className=" w-36 h-36 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-[20px] md:text-2xl leading-5 md:leading-[24px]  font-normal mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-[16px] mt-1">
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
                  <div className="mt-4">
                    <button className="button3 w-40 font-normal text-white bg-primary border-none font-roboto hover:border hover:border-primary hover:bg-white hover:text-primary">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className=" text-center     w-fit   max-w-48 ">
                <div className=" w-36 h-36 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-[20px] md:text-2xl leading-5 md:leading-[24px]  font-normal mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-[16px] mt-1">
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
                  <div className="mt-4">
                    <button className="button3 w-40 font-normal text-white bg-primary border-none font-roboto hover:border hover:border-primary hover:bg-white hover:text-primary">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className=" text-center     w-fit   max-w-48 ">
                <div className=" w-36 h-36 mx-auto">
                  <img
                    className="mx-auto w-full h-full rounded-full object-cover"
                    src="/images/client/boat.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 ">
                  <h1 className="text-primary text-[20px] md:text-2xl leading-5 md:leading-[24px]  font-normal mx-auto text-center font-outfit">
                    Emperor Elite Liveaboard
                  </h1>
                  <h2 className="text-[#9d9d9c] font-normal text-[16px] mt-1">
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
                  <div className="mt-4">
                    <button className="button3 w-40 font-normal text-white bg-primary border-none font-roboto hover:border hover:border-primary hover:bg-white hover:text-primary">
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
