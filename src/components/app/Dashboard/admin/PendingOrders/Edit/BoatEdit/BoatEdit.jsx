import Spinner from "@/src/components/core/shared/Loader/Spinner";
import { baseUrl } from "@/src/config/serverConfig";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Questions } from "@/src/constant/questions/questions";
import Loader from "@/src/components/core/shared/Loader/Loader";
import OperatorDetails from "../../../PendingProperty/OperatorDetails";
import OrderedSchedule from "./OrderedSchedule";
import EditForm from "./EditForm";
import { usePathname } from "next/navigation";
const BoatEdit = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({});

  const [isAdminPath, setIsAdminPath] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (path?.includes("/admin")) {
      setIsAdminPath(true);
    } else {
      setIsAdminPath(false);
    }
  }, [path]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/boat-booking/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data?.data);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  console.log(bookingData);
  return (
    <div className="max-w-screen-lg mx-auto">
      <Box>
        <div>
          <h2
            onClick={() =>
              window.open(`/search/${bookingData?.property?._id}`, "_blank")
            }
            className="text-2xl py-10 font-semibold  underline cursor-pointer"
          >
            {bookingData?.property?.nameOfProperty}
            <LaunchIcon sx={{ ml: "10px" }} />
          </h2>
          <img
            className="w-fit mx-auto max-w-full pb-10 h-fit rounded my-3 object-cover"
            src={bookingData?.property?.featuredImage}
            alt="featured image"
          />
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-5  my-5">
              <div className="flex gap-2 ">
                <h2 className="capitalize font-semibold">region:</h2> <h3>
                  {boatData?.region}
                </h3>
              </div>
              <div className="flex gap-2">
                <h2 className="capitalize font-semibold">country:</h2> <h3>
                  {boatData?.region}
                </h3>
              </div>
              <div className="flex gap-2">
                <h2 className="capitalize font-semibold">district:</h2> <h3>
                  {boatData?.region}
                </h3>
              </div>
            </div> */}
          <div className="grid grid-cols-2 md:grid-cols-3 justify-items-start  gap-5">
            <div>
              <h2 className="font-semibold">Facilities </h2>
              <ul>
                {bookingData?.property?.facilities?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold capitalize">inclusions</h2>
              <ul>
                {bookingData?.property?.inclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold capitalize">exclusions</h2>
              <ul>
                {bookingData?.property?.exclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold capitalize">equipment available</h2>
              <ul>
                {bookingData?.property?.equipment?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold capitalize">diveCourses</h2>
              <ul>
                {bookingData?.property?.diveCourses?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="my-5">
            <h2 className="text-2xl mt-10 underline">Environmental</h2>
            {Questions.map((item, index) => {
              if (!item.extra) {
                return (
                  <div key={index}>
                    {bookingData?.property?.environmentalQuestions?.hasOwnProperty(
                      item?.id
                    ) && (
                      <div className="my-4">
                        <h2>
                          <strong className="mr-2">question:</strong>{" "}
                          {item?.question}
                        </h2>
                        <p className="">
                          <strong className="mr-2">Answer: </strong>{" "}
                          {bookingData?.property?.environmentalQuestions &&
                            bookingData?.property?.environmentalQuestions[
                              item?.id
                            ]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
          <div className="my-5">
            <h2 className="text-2xl mt-10 underline">
              Plant-based | Vegan food and Adapted Diets
            </h2>
            {Questions.map((item, index) => {
              if (item.extra) {
                return (
                  <div key={index}>
                    {bookingData?.property?.environmentalQuestions?.hasOwnProperty(
                      item?.id
                    ) && (
                      <div className="my-4">
                        <h2>
                          <strong className="mr-2">question:</strong>{" "}
                          {item?.question}
                        </h2>
                        <p className="">
                          <strong className="mr-2">Answer: </strong>{" "}
                          {bookingData?.property?.environmentalQuestions &&
                            bookingData?.property?.environmentalQuestions[
                              item?.id
                            ]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>

          <OrderedSchedule
            cabin={bookingData?.cabin}
            cabinPrice={bookingData?.cabinPrice}
            scheduleId={bookingData?.scheduleId}
            schedules={bookingData?.property?.schedules}
            bookingData={bookingData}
          />
          <OperatorDetails userInfo={bookingData?.operator} />

          <EditForm
            role={isAdminPath}
            status={bookingData?.bookingStatus === "pending"}
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        </div>
      </Box>
    </div>
  );
};

export default BoatEdit;
