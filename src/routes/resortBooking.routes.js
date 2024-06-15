const express = require("express");
const {
  createResortBooking,
  updateBookingStatusByAdmin,
  getAllPendingBooking,
  getSingleResortBooking,
  updateResorting,
  updateBookingStatusByOperator,
  getAllConfirmResortOrder,
} = require("../controllers/resortBooking.controllers");
const auth = require("../config/auth");

const boatBookingRoutes = express.Router();

boatBookingRoutes.post("/", createResortBooking);

boatBookingRoutes.get(
  "/pending-booking",
  auth("admin", "operator"),
  getAllPendingBooking
);

boatBookingRoutes.get(
  "/confirm-booking",
  auth("admin", "operator"),
  getAllConfirmResortOrder
);

boatBookingRoutes.get(
  "/:id",
  auth("admin", "operator"),
  getSingleResortBooking
);

boatBookingRoutes.patch("/update-booking/:id", auth("admin"), updateResorting);

boatBookingRoutes.patch(
  "/update-status-by-admin/:id",
  auth("admin"),
  updateBookingStatusByAdmin
);

boatBookingRoutes.patch(
  "/update-status-by-operator/:id",
  auth("operator"),
  updateBookingStatusByOperator
);

module.exports = boatBookingRoutes;
