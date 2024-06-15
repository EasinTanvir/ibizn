const ResortBooking = require("../models/resortBooking.model");
const transporter = require("../config/smtp");
const AppError = require("../error/appError");
const createResortBookingIntoDB = async (payload) => {
  const result = await ResortBooking.create(payload);
  const htmlMessage = `
  <div>
    <h1>You have a new booking request</h1>
    <p><strong>Phone:</strong> ${payload?.phone}</p>
    <p><strong>Email:</strong> ${payload?.email}</p>
    <p><strong>Number Of Guest:</strong> ${payload?.numberOfGuest}</p>
     <p>Check the property<a href=${`http://localhost:3000/secondPage/${payload?.property}`}>click here</a></p>
  </div>
`;

  const htmlMessage2 = `
  <div>
    <h1>Booking successful</h1>
    <p><strong>Phone:</strong> ${payload?.phone}</p>
    <p><strong>Email:</strong> ${payload?.email}</p>
    <p><strong>Number Of Guest:</strong> ${payload?.numberOfGuest}</p>
    <p><strong>Number Of Guest:</strong> ${payload?.price}</p>
     <p>Check the property<a href=${`http://localhost:3000/secondPage/${payload?.property}`}>click here</a></p>
  </div>
`;

  // Sending the email to admin
  const mailer = await transporter.sendMail({
    from: "deeparture.reservations@gmail.com",
    to: "maniksarker.official@gmail.com",
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

const getAllPendingResortBookingFromDB = async (userData) => {
  console.log(userData);
  if (userData?.role === "admin") {
    const result = await ResortBooking.find({
      $and: [
        { bookingStatus: { $ne: "confirmed" } },
        { bookingStatus: { $ne: "rejected" } },
      ],
    }).populate({
      path: "property", // First level: populates the property field
      populate: {
        path: "listOfPackages",
        model: "Package",
      },
    });
    return result;
  } else {
    const result = await ResortBooking.find({
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
    const result = await ResortBooking.find({ bookingStatus: "confirmed" });
    return result;
  } else {
    const result = await ResortBooking.find({
      bookingStatus: "confirmed",
      operator: userData?.userId,
    });
    return result;
  }
};

const getSingleResortBookingFromDB = async (id) => {
  const result = await ResortBooking.findById(id)
    .populate({
      path: "property", // First level: populates the property field
      populate: {
        path: "listOfPackages",
        model: "Package",
      },
    })
    .populate("operator")
    .populate("packageId");
  return result;
};

const updateResortBookingIntoDB = async (id, payload) => {
  const result = await ResortBooking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const updateBookingStatusByAdminFromDB = async (id, status) => {
  let result;
  const booking = await ResortBooking.findById(id);
  if (!booking) {
    throw new AppError("Booking not found");
  }

  if (status === "rejected") {
    result = await ResortBooking.findByIdAndDelete(id);
    return result;
  }

  result = await ResortBooking.findByIdAndUpdate(
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
      <h1>You have a new booking request</h1>
       <p>Check the property<a href=${`http://localhost:3000/secondPage/${result?.property}`}>click here</a></p>
    </div>
  `;
    // Sending the email to operator
    await transporter.sendMail({
      from: "deeparture.reservations@gmail.com",
      to: result?.operator?.email,
      subject: "New Booking Request",
      html: htmlMessage,
    });
  }
  return result;
};
const updateBookingStatusByOperatorIntoDB = async (id, status, userData) => {
  console.log(status);
  const booking = await ResortBooking.findOne({
    _id: id,
    bookingStatus: "approved",
    operator: userData?.userId,
  });
  if (!booking) {
    throw new AppError("Booking not found");
  }
  console.log("nice");
  const result = await ResortBooking.findByIdAndUpdate(
    id,
    { bookingStatus: status },
    {
      new: true,
      runValidators: true,
    }
  );
  // if (result?.bookingStatus === "approved") {
  //   const htmlMessage = `
  //   <div>
  //     <h1>You have a new booking request</h1>
  //      <p>Check the property<a href=${`http://localhost:3000/secondPage/${result?.property}`}>click here</a></p>
  //   </div>
  // `;
  //   // Sending the email to operator
  //   await transporter.sendMail({
  //     from: "deeparture.reservations@gmail.com",
  //     to: result?.operator?.email,
  //     subject: "New Booking Request",
  //     html: htmlMessage,
  //   });
  // }
  return result;
};

module.exports = {
  createResortBookingIntoDB,
  updateBookingStatusByAdminFromDB,
  getAllPendingResortBookingFromDB,
  getSingleResortBookingFromDB,
  updateResortBookingIntoDB,
  updateBookingStatusByOperatorIntoDB,
  getAllConfirmBoatOrderFromDB,
};
