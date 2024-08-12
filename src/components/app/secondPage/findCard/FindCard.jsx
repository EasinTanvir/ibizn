import React, { useContext, useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MoodIcon from "@mui/icons-material/Mood";
import Wifi from "./Wifi";
import LoadingCard from "@/src/components/core/shared/Loader/LoadingCard";
import Itineraries from "./Itineraries";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import Nitrox from "./Nitrox";
import { userContext } from "@/src/storage/contextApi";
import dayjs from "dayjs";
import { truncateDescription } from "@/utils/truncateText";

const faqData = [
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },
  {
    question: "How can I book a boat for a fishing trip?",
    answer:
      "Booking a boat for a fishing trip is easy! Simply visit our website or give us a call to check availability and make a reservation. We'll help you find the perfect boat for your fishing adventure.",
  },

  //if you want Add more questions and answers here as needed
];

const FindCard = ({ searchResult, isLoading, resort }) => {
  const [readMore, setReadMore] = useState(false);
  const { searchValues } = useContext(userContext);
  console.log(searchValues);
  console.log(resort);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(searchResult);

  console.log(searchValues);

  const [forMonth, setForMonth] = useState();
  const [forYear, setForYear] = useState();
  useEffect(() => {
    const date = dayjs(searchValues?.tripStart);
    const formattedMonth = date.format("MMMM");
    const formattedYear = date.format("YYYY");

    setForMonth(formattedMonth);
    setForYear(formattedYear);
  }, [searchValues]);

  return (
    <div className="min-h-[70vh] lg:w-[85%] mx-auto px-5 lg:px-0 py-12">
      <div>
        {searchValues?.destination && searchValues?.tabValue && (
          <h1 className="lg:text-title md:text-5xl text-4xl font-outfit font-[250] text-primary mb-5">
            {searchValues?.tabValue} | {searchValues?.destination}
          </h1>
        )}
        {!isLoading && (
          <p className="lg:text-subtitle md:text-2xl text-secondary text-xl font-outfit">
            <span>
              {" "}
              We found {searchResult?.length || 0}{" "}
              {searchValues?.tabValue === "Resorts" ||
              searchValues?.property === "resort"
                ? "resort for you"
                : "boats for you "}{" "}
            </span>{" "}
            {searchValues?.maxPrice && (
              <span> among price $({searchValues?.maxPrice})</span>
            )}{" "}
            {searchValues?.duration && (
              <span>
                {searchValues?.maxPrice ? "and" : "among"} duration (
                {searchValues?.duration} nights )
              </span>
            )}
          </p>
        )}
      </div>
      <div className="xl:flex gap-10 mt-10">
        <div className="xl:w-[75%] space-y-10 mb-16 lg:mb-0">
          {isLoading ? (
            <LoadingCard />
          ) : searchResult?.length > 0 ? (
            <div>
              {" "}
              {searchResult?.map((item, index) => (
                <div
                  onClick={() =>
                    router.push(
                      !resort
                        ? `/secondPage/${item?._id}`
                        : `/secondPage/resort/${item?._id}`
                    )
                  }
                  key={index}
                  className="border-2 border-primary mb-20 cursor-pointer"
                >
                  <div className="md:flex gap-5">
                    <div>
                      <Swiper
                        className="md:w-[384px] w-full border"
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination]}
                      >
                        {item?.carousal
                          ? item?.carousal?.map((img, index) => (
                              <SwiperSlide key={index}>
                                <div className="border border-rose-900">
                                  <div className="aspect-[2/3] w-full">
                                    <img
                                      className="w-full h-full object-cover"
                                      src={img}
                                      alt="carousalImages"
                                    />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))
                          : item?.carousalImages?.map((img, index) => (
                              <SwiperSlide key={index}>
                                <div>
                                  <div className="aspect-[2/3] w-full">
                                    <img
                                      className="w-full h-full object-cover"
                                      src={img}
                                      alt="carousalImages"
                                    />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                      </Swiper>
                    </div>
                    <div className="sm:pb-0 pb-10 px-5   border-b-2 sm:border-b-0 border-b-primary">
                      <div className="mt-6 sm:mb-2">
                        <div className="sm:hidden">
                          <h1 className="lg:text-[32px] text-xl text-gray font-[500]">
                            {!resort && (
                              <span>
                                {item?.nameOfProperty || item?.propertyName} /{" "}
                              </span>
                            )}
                            {searchValues?.destination}
                            {console.log(item.destnation)}
                          </h1>
                        </div>
                        <h1 className="lg:text-[32px] text-xl text-primary">
                          {item?.nameOfProperty || item?.propertyName}
                        </h1>
                        {console.log(item)}

                        <p className="sm:mt-[14px] lg:text-[22px] text-sm text-secondary font-outfit md:w-full leading-3 sm:leading-6 ">
                          {resort ? (
                            <>
                              {readMore ? (
                                item?.briefDescription
                              ) : (
                                <>
                                  {truncateDescription(item?.briefDescription)}
                                  {/* <button>Read More</button> */}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {readMore ? (
                                item?.briefDescription
                              ) : (
                                <>
                                  {truncateDescription(
                                    item?.liveABoard?.description
                                  )}
                                  {/* <button
                                    className="ps-2 text-slate-800 text-lg"
                                    onClick={() => setReadMore(!readMore)}
                                  >
                                    Read More
                                  </button> */}
                                </>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="mt-5 flex justify-between">
                        {searchValues?.tripStart && (
                          <div className="sm:hidden">
                            <h1 className="text-[#0080ff] text-[14px] md:text-[25px] font-outfit font-[700]">
                              {forMonth} / {forYear}
                            </h1>
                          </div>
                        )}
                        <div className="sm:-mt-2">
                          <div className="flex gap-2 items-center">
                            <h1 className="text-[#0080ff] text-[14px] md:text-[25px] font-outfit font-[700] sm:font-[500]">
                              Vegan Rating:
                            </h1>
                            <h1 className="md:text-[25px] text-[14px] text-[#0080ff]">
                              {item?.veganRating}
                            </h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Wifi facilities={item?.facilities} />
                          </div>
                          <div className="flex gap-2 items-center">
                            <Nitrox facilities={item?.facilities} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Itineraries schedules={item?.schedules} />
                </div>
              ))}
            </div>
          ) : (
            <Alert variant="filled" severity="info">
              There is no property for these date, Please search another date
            </Alert>
          )}
        </div>
        {/* from here code develope by hosaindev */}
        <div className="xl:w-[25%]  -mt-6 lg:mt-10 xl:mt-0">
          <div className="lg:text-[32px] lg:hidden  block  md:text-3xl text-xl text-primary">
            How To Book
            <QuestionMarkIcon
              onMouseOver={handleOpen}
              className="animate-bounce"
              sx={{ cursor: "pointer" }}
            />
          </div>

          <div className="lg:text-[32px] md:text-3xl text-xl lg:block  hidden ">
            <span className="text-primary">How To Book</span>
            <QuestionMarkIcon className="animate-bounce text-primary" />
            <div className="pt-5 space-y-5">
              <p className="text-gray text-2xl font-normal">
                Explore your options and discover your perfect dive adventure.
                Submit your booking to us by xxxxxxxx.
              </p>
              <p className="text-gray text-2xl font-normal">
                We will check the most up-to-date availability and options for
                you and hold your reservation. Afterwards, we will contact you
                with your trip details, answer all your queries, and confirm
                everything. Next, we will review payment methods and other terms
                and conditions, and you will receive access to your diver’s hub
                account. We will be available at any time to answer questions
                and discuss your diving thoughts with you, we have heard them
                all over our time, so don’t be shy
              </p>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className="w-[90%] lg:w-[800px] md:w-[90%]"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxHeight: "80vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                borderRadius: 2,

                p: 4,
              }}
            >
              <Typography>
                <h1 className="inline-block lg:text-[32px] md:text-3xl text-xl text-primary">
                  Tips and FAQ for your booking
                </h1>{" "}
                <MoodIcon className="animate-bounce text-primary sm:hidden lg:inline-block md:inline-block lg:text-[32px] md:text-3xl text-xl" />
              </Typography>
              <div className="w-full h-[1px] bg-slate-400 mt-8"></div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="opacity-[60%]">
                  {/* if you want to see question and answer go to top line number 15 and you can see in faqData object */}
                  {faqData.map((item, index) => (
                    <div key={index}>
                      <p className="lg:text-subtitle md:text-xl text-[14px] text-gray-500 mt-5">
                        <h1>
                          <b className="opacity-[100%] text-red-600">
                            Question:{(index + 1).toFixed(0)}
                          </b>
                          - {item.question}
                        </h1>
                        <br />
                        <b className="opacity-[100%] text-primary">
                          Answer:
                        </b>{" "}
                        {item.answer}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
        {/* so far develope by hosaindev */}
      </div>
    </div>
  );
};

export default FindCard;
