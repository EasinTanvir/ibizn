const httpStatus = require("http-status");
const {
  createResortBookingIntoDB,
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
  const result = await getAllPendingBoatBookingFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Boat booking retrieved successfully",
    data: result,
  });
});
const getAllConfirmBoatOrder = catchAsync(async (req, res) => {
  const result = await getAllConfirmBoatOrderFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Boat booking retrieved successfully",
    data: result,
  });
});

const getSingleBoatBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleBoatBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Boat booking retrieved successfully",
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await updateBookingIntoDB(id, req.body);
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
};
