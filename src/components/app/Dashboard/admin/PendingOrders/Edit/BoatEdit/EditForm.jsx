import { baseUrl } from "@/src/config/serverConfig";
import { Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EditForm = ({ bookingData, setBookingData, status, role = false }) => {
  // Ensure startDate and endDate are dayjs objects
  const [updatedDate, setUpdatedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const startDate = bookingData?.startDate
    ? dayjs(bookingData.startDate)
    : dayjs();
  const endDate = bookingData?.endDate ? dayjs(bookingData.endDate) : dayjs();

  const updateBoatOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const whatsapp = form.whatsapp.value;
    const numberOfGuest = form.numberOfGuest.value;
    const updatedBookingData = {
      name,
      phone,
      email,
      whatsapp,
      numberOfGuest,
      startDate: updatedDate.startDate || bookingData?.startDate,
      endDate: updatedDate.endDate || bookingData.endDate,
      property: bookingData?.property?._id,
      operator: bookingData?.operator?._id,
      scheduleId: bookingData.scheduleId,
      price: bookingData?.price,
    };
    console.log(updatedBookingData);
    fetch(`${baseUrl}/boat-booking/update-booking/${bookingData?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify(updatedBookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Booking Information Updated");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  console.log(bookingData?.name);
  return (
    <div>
      {status && (
        <h1 className="text-center font-semibold text-2xl my-6">
          Edit Booking Information
        </h1>
      )}
      <form onSubmit={updateBoatOrder}>
        <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
          Booking Schedule
        </Typography>
        <div className="md:flex justify-between gap-5">
          <div className="mt-3 w-full">
            <p className="text-lg font-semibold">Name</p>
            <input
              type="text"
              disabled={!status}
              name="name"
              className="w-full rounded-md"
              required
              defaultValue={bookingData?.name}
              //   onChange={(e) => {
              //     () =>
              //       setBookingData({
              //         ...bookingData,
              //         phone: e.target.value,
              //       });
              //   }}
            />
          </div>
          {console.log(bookingData?.bookingStatus)}
          {role && (
            <>
              {" "}
              <div className="mt-3 w-full">
                <p className="text-lg font-semibold">Phone:</p>
                <input
                  type="text"
                  disabled={!status}
                  name="phone"
                  className="w-full rounded-md"
                  required
                  defaultValue={bookingData?.phone}
                  //   onChange={(e) => {
                  //     () =>
                  //       setBookingData({
                  //         ...bookingData,
                  //         phone: e.target.value,
                  //       });
                  //   }}
                />
              </div>
              <div className="mt-3 w-full">
                <p className="text-lg font-semibold">Email:</p>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-md"
                  required
                  disabled={!status}
                  defaultValue={bookingData?.email}
                  //   onChange={(e) => {
                  //     () =>
                  //       setBookingData({
                  //         ...bookingData,
                  //         email: e.target.value,
                  //       });
                  //   }}
                />
              </div>
            </>
          )}
        </div>
        <div className="md:flex justify-between gap-5">
          {role && (
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">whatsapp:</p>
              <input
                disabled={!status}
                type="text"
                name="whatsapp"
                className="w-full rounded-md"
                required
                defaultValue={bookingData?.whatsapp}
                //   onChange={(e) => {
                //     () =>
                //       setBookingData({
                //         ...bookingData,
                //         whatsapp: e.target.value,
                //       });
                //   }}
              />
            </div>
          )}
          <div className="mt-3 w-full">
            <p className="text-lg font-semibold">Number Of Guest:</p>
            <input
              disabled={!status}
              type="text"
              name="numberOfGuest"
              className="w-full rounded-md"
              required
              defaultValue={bookingData?.numberOfGuest}
              //   onChange={(e) => {
              //     () =>
              //       setBookingData({
              //         ...bookingData,
              //         numberOfGuest: e.target.value,
              //       });
              //   }}
            />
          </div>
        </div>
        <div className="md:flex gap-6 my-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <p className="mb-1">Start Date</p>
              <DatePicker
                disabled={!status}
                value={startDate}
                onChange={(newDate) =>
                  setUpdatedDate({
                    ...updatedDate,
                    startDate: newDate,
                  })
                }
                renderInput={(params) => <input {...params} />}
              />
            </div>
            <div>
              <p className="mb-1">End Date</p>
              <DatePicker
                disabled={!status}
                value={endDate}
                onChange={(newDate) =>
                  setUpdatedDate({
                    ...updatedDate,
                    endDate: newDate,
                  })
                }
                renderInput={(params) => <input {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        {status && (
          <div>
            <button type="submit" className="main-button py-3 w-full mt-4">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditForm;
