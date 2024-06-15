const httpStatus = require("http-status");
const {
  createResortBookingIntoDB,
  updateBookingStatusByAdminFromDB,
  getAllPendingResortBookingFromDB,
  getSingleResortBookingFromDB,
  updateResortBookingIntoDB,
  updateBookingStatusByOperatorIntoDB,
  getAllConfirmBoatOrderFromDB,
} = require("../services/resortBooking.services");
const catchAsync = require("../utilities/catchAsync");
const sendResponse = require("../utilities/sendResponse");

const createResortBooking = catchAsync(async (req, res) => {
  const result = await createResortBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Resort booking created successfully",
    data: result,
  });
});
const getAllPendingBooking = catchAsync(async (req, res) => {
  const result = await getAllPendingResortBookingFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Resort booking retrieved successfully",
    data: result,
  });
});
const getAllConfirmResortOrder = catchAsync(async (req, res) => {
  const result = await getAllConfirmBoatOrderFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Boat booking retrieved successfully",
    data: result,
  });
});

const getSingleResortBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleResortBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Resort booking retrieved successfully",
    data: result,
  });
});
const updateResorting = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await updateResortBookingIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});
const updateBookingStatusByAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const result = await updateBookingStatusByAdminFromDB(id, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking status updated successfully",
    data: result,
  });
});
const updateBookingStatusByOperator = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const result = await updateBookingStatusByOperatorIntoDB(
    id,
    status,
    req.user
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking status updated successfully",
    data: result,
  });
});

module.exports = {
  createResortBooking,
  updateBookingStatusByAdmin,
  getAllPendingBooking,
  getSingleResortBooking,
  updateResorting,
  updateBookingStatusByOperator,
  getAllConfirmResortOrder,
};
