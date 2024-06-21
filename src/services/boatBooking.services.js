const BoatBooking = require("../models/boatBooking.model");
const USER = require("../models/user.model");

const transporter = require("../config/smtp");
const AppError = require("../error/appError");
const createBoatBookingIntoDB = async (payload) => {
  const result = await BoatBooking.create(payload);
  const htmlMessage = `
  <div>
    <h1>New booking Request</h1>
    <p><strong>Name : </strong> ${payload?.name}</p>
    <p><strong>Phone : </strong> ${payload?.phone}</p>
    <p><strong>Email : </strong> ${payload?.email}</p>
    <p><strong>Number Of Guest : </strong> ${payload?.numberOfGuest}</p>
     <p><strong>Price : </strong> ${payload?.price}</p>
     <p>Check the property : <a href=${`${process.env.FRONTEND_URL}/secondPage/${payload?.property}`}>click here</a></p>
  </div>
`;

  const htmlMessage2 = `
  <div>
    <h1>Your New Booking Request Details</h1>
    <p><strong>Name : </strong> ${payload?.name}</p>
    <p><strong>Phone : </strong> ${payload?.phone}</p>
    <p><strong>Email : </strong> ${payload?.email}</p>
    <p><strong>Number Of Guest : </strong> ${payload?.numberOfGuest}</p>
    <p><strong>Price : </strong> ${payload?.price}</p>
     <p>Check the property : <a href=${`${process.env.FRONTEND_URL}/secondPage/${payload?.property}`}> Click here </a></p>
  </div>
`;
  let user;

  user = await USER.findOne({ role: "admin" });

  // Sending the email to admin
  const mailer = await transporter.sendMail({
    from: payload?.email,
    to: user.email,
    subject: "New Booking Request",
    html: htmlMessage,
  });
  // Sending the email to user
  await transporter.sendMail({
    from: "deeparture.reservations@gmail.com",
    to: payload?.email,
    subject: "New Booking Request",
    html: htmlMessage2,
  });
  return result;
};

const getAllPendingBoatBookingFromDB = async (userData) => {
  if (userData?.role === "admin") {
    const result = await BoatBooking.find({
      $and: [
        { bookingStatus: { $ne: "confirmed" } },
        { bookingStatus: { $ne: "rejected" } },
      ],
    }).populate({
      path: "property", // First level: populates the property field
      populate: {
        path: "schedules.itinerary", // Second level: populates schedules within property
        model: "Itinerary",
      },
    });
    return result;
  } else {
    const result = await BoatBooking.find({
      $and: [
        { bookingStatus: { $ne: "confirmed" } },
        { bookingStatus: { $ne: "pending" } },
        { bookingStatus: { $ne: "rejected" } },
        { operator: userData?.userId },
      ],
    }).populate("property");
    return result;
  }
};

const getAllConfirmBoatOrderFromDB = async (userData) => {
  if (userData?.role === "admin") {
    const result = await BoatBooking.find({ bookingStatus: "confirmed" });
    return result;
  } else {
    const result = await BoatBooking.find({
      bookingStatus: "confirmed",
      operator: userData?.userId,
    });
    return result;
  }
};

const getSingleBoatBookingFromDB = async (id) => {
  const result = await BoatBooking.findById(id)
    .populate({
      path: "property", // First level: populates the property field
      populate: {
        path: "schedules.itinerary", // Second level: populates schedules within property
        model: "Itinerary",
      },
    })
    .populate("operator");
  return result;
};

const updateBookingIntoDB = async (id, payload) => {
  const result = await BoatBooking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const updateBookingStatusByAdminFromDB = async (id, status) => {
  let result;

  const booking = await BoatBooking.findById(id);
  if (!booking) {
    throw new AppError("Booking not found");
  }
  console.log(status);
  if (status === "rejected") {
    result = await BoatBooking.findByIdAndDelete(id);
    return result;
  }

  result = await BoatBooking.findByIdAndUpdate(
    id,
    { bookingStatus: status },
    {
      new: true,
      runValidators: true,
    }
  ).populate("operator");
  if (result?.bookingStatus === "approved") {
    const htmlMessage = `
    <div>
      <h1>Your Booking Has Approved</h1>
       <p> Check the property <a href=${`${process.env.FRONTEND_URL}/secondPage/${result?.property}`}>click here</a></p>
    </div>
  `;
    console.log("operator = ", result?.operator?.email);
    // Sending the email to operator
    await transporter.sendMail({
      from: "deeparture.reservations@gmail.com",
      to: result?.operator?.email,
      subject: "New Booking Request",
      html: htmlMessage,
    });
  } else if (result?.bookingStatus === "confirmed") {
    const htmlMessage = `
    <div>
      <h1>Booking Confirmed</h1>
       <p> Check the property <a href=${`${process.env.FRONTEND_URL}/secondPage/${result?.property}`}>click here</a></p>
    </div>
  `;

    // Sending the email to operator
    await transporter.sendMail({
      from: "deeparture.reservations@gmail.com",
      to: result?.operator?.email,
      subject: "Booking Confirmed",
      html: htmlMessage,
    });
    let user;

    user = await USER.findOne({ role: "admin" });

    await transporter.sendMail({
      from: result?.operator?.email,
      to: user.email,
      subject: "Booking Confirmed",
      html: htmlMessage,
    });
  }
  return result;
};
const updateBookingStatusByOperatorIntoDB = async (id, status, userData) => {
  console.log(status);
  const booking = await BoatBooking.findOne({
    _id: id,
    bookingStatus: "approved",
    operator: userData?.userId,
  });
  if (!booking) {
    throw new AppError("Booking not found");
  }
  console.log("nice");
  const result = await BoatBooking.findByIdAndUpdate(
    id,
    { bookingStatus: status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (result?.bookingStatus === "accepted") {
    const htmlMessage = `
    <div>
      <h1>Booking Request Accepted By Operator</h1>
       <p> Check the property <a href=${`${process.env.FRONTEND_URL}/secondPage/${result?.property}`}>click here</a></p>
    </div>
  `;
    let user;

    user = await USER.findOne({ role: "admin" });
    // Sending the email to operator
    await transporter.sendMail({
      from: "deeparture.reservations@gmail.com",
      to: user.email,
      subject: "New Booking Request",
      html: htmlMessage,
    });
  }

  return result;
};

module.exports = {
  createBoatBookingIntoDB,
  getAllPendingBoatBookingFromDB,
  getAllConfirmBoatOrderFromDB,
  getSingleBoatBookingFromDB,
  updateBookingIntoDB,
  updateBookingStatusByAdminFromDB,
  updateBookingStatusByOperatorIntoDB,
};
