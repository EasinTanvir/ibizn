import { baseUrl } from "@/src/config/serverConfig";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Questions } from "@/src/constant/questions/questions";
import Loader from "@/src/components/core/shared/Loader/Loader";
import OrderedSchedule from "../../admin/PendingOrders/Edit/BoatEdit/OrderedSchedule";
import ResortOrderedSchedule from "../../admin/PendingOrders/Edit/BoatEdit/ResortOrderedSchedule copy";
const ResortOrderDetails = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/resort-booking/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data?.data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-screen-lg mx-auto">
      <Box>
        <div>
          <h2
            onClick={() =>
              window.open(`/secondPage/${bookingData?.property?._id}`, "_blank")
            }
            className="text-2xl font-semibold  underline cursor-pointer"
          >
            {bookingData?.property?.propertyName}
            <LaunchIcon sx={{ ml: "10px" }} />
          </h2>
          <img
            className="w-full h-[300px] rounded my-3 object-contain"
            src={bookingData?.property?.featureImage}
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
              <h2 className="font-semibold capitalize">equipments</h2>
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
            <h2 className="text-2xl mt-10 underline">Environment Questions</h2>
            {Questions.map((item, index) => {
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
            })}
          </div>
          <ResortOrderedSchedule packagess={bookingData?.packageId} />
        </div>
      </Box>
    </div>
  );
};

export default ResortOrderDetails;
