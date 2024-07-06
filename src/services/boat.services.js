const httpStatus = require("http-status");
const AppError = require("../error/appError");
const Boat = require("../models/boat.model");
const Itinerary = require("../models/itenary.model");
const USER = require("../models/user.model");
const transporter = require("../config/smtp");

const createBoatIntoDB = async (userData, payload) => {
  const user = userData?.userId;
  const result = await Boat.create({ user, ...payload });

  const htmlMessage = `
    <div>
      <h1>New Boat Has Been Added</h1>
       <p> Check the property :  <a href=${`${process.env.FRONTEND_URL}/secondPage/${result?._id}`}>click here</a></p>
    </div>
  `;

  let admin;

  admin = await USER.findOne({ role: "admin" });
  console.log(admin);
  await transporter.sendMail({
    from: "deeparture.reservations@gmail.com",
    to: admin.email,
    subject: "New Boat Added",
    html: htmlMessage,
  });

  return result;
};

// get all boat from db
// const getAllBoatFromDB = async (queryData) => {
//   const { destination, date, minRating, maxRating } = queryData;

//   // Query the Itinerary collection to find matching itineraries
//   const itineraries = await Itinerary.find({ country: destination });

//   // Extract the itinerary IDs from the found itineraries
//   const itineraryIds = itineraries.map((itinerary) => itinerary._id);

//   // Build the query for boats with matching schedules
//   const query = {
//     schedules: {
//       $elemMatch: {
//         tripStart: { $lte: new Date(date) },
//         tripEnd: { $gte: new Date(date) },
//         itinerary: { $in: itineraryIds },
//       },
//     },
//   };

//   // Add veganRating condition if provided
//   // if (minRating && maxRating) {
//   //   query["veganRating"] = { $gte: minRating, $lte: maxRating };
//   // }

//   // Query the Boat collection with the constructed query
//   const result = await Boat.find(query).populate({
//     path: "schedules.itinerary",
//     model: "Itinerary", // Make sure to replace 'Itinerary' with the actual model name
//   });

//   return result;
// };

// another ------------
const getAllBoatFromDB = async (queryData) => {
  const {
    tabValue,
    destination,
    tripStart,
    tripEnd,
    minRating,
    maxRating,
    minPrice,
    maxPrice,
    duration,
  } = queryData;

  const fMinPrice = parseFloat(Number(minPrice).toFixed(2));
  const fMaxPrice = parseFloat(Number(maxPrice).toFixed(2));

  console.log("duration, =", duration);
  console.log("tabValue, =", tabValue);

  // Initialize an empty query object
  const query = {
    status: "approved",
    resitricted: false,
  };

  // Add destination condition if provided
  if (destination) {
    // Query the Itinerary collection to find matching itineraries
    const itineraries = await Itinerary.find({ country: destination });

    // Extract the itinerary IDs from the found itineraries
    const itineraryIds = itineraries.map((itinerary) => itinerary._id);

    // Add itinerary condition to the query if itinerary IDs were found
    if (itineraryIds.length > 0) {
      query.schedules = {
        $elemMatch: {
          itinerary: { $in: itineraryIds },
        },
      };
    }
  }

  // Add date condition if provided
  if (tripStart || tripEnd) {
    const dateCondition = {
      tripStart: { $gte: new Date(tripStart) },
      tripEnd: { $lte: new Date(tripEnd) },
    };

    // Add the date condition to the existing schedules query
    if (query.schedules && query.schedules.$elemMatch) {
      query.schedules.$elemMatch = {
        ...dateCondition,
      };
    } else {
      query.schedules = {
        $elemMatch: dateCondition,
      };
    }
  }

  if (minPrice && maxPrice) {
    const priceCondition = {
      convertPrice: { $gte: parseFloat(Number(minPrice).toFixed(2)) },
      convertPrice: { $lte: parseFloat(Number(maxPrice).toFixed(2)) },
    };

    // Add the date condition to the existing schedules query
    if (query.schedules && query.schedules.$elemMatch) {
      query.schedules.$elemMatch = {
        ...priceCondition,
      };
    } else {
      query.schedules = {
        $elemMatch: priceCondition,
      };
    }
  }

  // Add veganRating condition if provided
  if (minRating !== "" && maxRating !== "") {
    query.veganRating = { $gte: minRating, $lte: maxRating };
  }
  // Add special offers condition if tabValue is "Special Offers"
  if (tabValue === "Special Offers") {
    if (query.schedules && query.schedules.$elemMatch) {
      query.schedules.$elemMatch = {
        ...query.schedules.$elemMatch,
        special: true,
      };
    } else {
      query.schedules = {
        $elemMatch: {
          special: true,
        },
      };
    }
  }

  // Query the Boat collection with the constructed query
  const result = await Boat.find(query).populate({
    path: "schedules.itinerary",
    model: "Itinerary", // Make sure to replace 'Itinerary' with the actual model name
  });

  if (tabValue === "Special Offers") {
    const filteredResult = result.map((boat) => {
      return {
        ...boat.toObject(),
        schedules: boat.schedules.filter((schedule) => schedule.special),
      };
    });

    if (minPrice && maxPrice && !duration) {
      const filteredBoats = filteredResult.map((boat) => ({
        ...boat,
        schedules: boat.schedules.filter((schedule) => {
          const isWithinPriceRange =
            schedule.convertPrice >= fMinPrice &&
            schedule.convertPrice <= fMaxPrice;

          return isWithinPriceRange;
        }),
      }));

      return filteredBoats;
    } else if (minPrice && maxPrice && duration) {
      const filteredBoats = filteredResult.map((boat) => ({
        ...boat,
        schedules: boat.schedules.filter((schedule) => {
          const isWithinPriceRange =
            schedule.convertPrice >= fMinPrice &&
            schedule.convertPrice <= fMaxPrice;

          const isMatchingDuration =
            schedule.itinerary.numberOfNights === Number(duration);

          return isWithinPriceRange && isMatchingDuration;
        }),
      }));

      return filteredBoats;
    } else if (!minPrice && !maxPrice && duration) {
      const filteredBoats = filteredResult.map((boat) => ({
        ...boat,
        schedules: boat.schedules.filter((schedule) => {
          const isMatchingDuration =
            schedule.itinerary.numberOfNights === Number(duration);

          return isMatchingDuration;
        }),
      }));

      return filteredBoats;
    } else {
      return filteredResult;
    }
  } else {
    if (tripStart && tripEnd && !minPrice && !maxPrice) {
      // corrected to maxPrice
      const filteredBoats = result.map((boat) => ({
        ...boat.toObject(),
        schedules: boat.schedules.filter((schedule) => {
          const isWithinDateRange =
            schedule.tripStart <= new Date(tripEnd) &&
            schedule.tripEnd >= new Date(tripStart);

          const isMatchingDuration =
            duration !== undefined
              ? schedule.itinerary.numberOfNights === Number(duration)
              : true; // If duration is undefined, this condition will be true

          return isWithinDateRange && isMatchingDuration;
        }),
      }));

      return filteredBoats;
    } else {
      console.log("fMinPrice = ", fMinPrice);
      console.log("fMaxPrice = ", fMaxPrice);
      const filteredBoats = result.map((boat) => ({
        ...boat.toObject(),
        schedules: boat.schedules.filter((schedule) => {
          const isWithinDateRange =
            schedule.tripStart <= new Date(tripEnd) &&
            schedule.tripEnd >= new Date(tripStart);

          const isWithinPriceRange =
            schedule.convertPrice >= fMinPrice &&
            schedule.convertPrice <= fMaxPrice;

          const isMatchingDuration =
            duration !== undefined
              ? schedule.itinerary.numberOfNights === Number(duration)
              : true; // If duration is undefined, this condition will be true

          return isWithinDateRange && isWithinPriceRange && isMatchingDuration;
        }),
      }));

      return filteredBoats;
    }

    return result;
  }
};
// get boats for operators --------
const getBoatsFromDB = async (id) => {
  const result = await Boat.find({ user: id });
  return result;
};

// get boat search item from db
const getBoatSearchItemFromDB = async () => {
  const pipeline = [
    // Unwind schedules to deconstruct the array into documents
    { $unwind: "$schedules" },

    // Convert the itinerary field to ObjectId
    {
      $addFields: {
        "schedules.itinerary": { $toObjectId: "$schedules.itinerary" },
      },
    },

    // Lookup itinerary details
    {
      $lookup: {
        from: "itineraries",
        localField: "schedules.itinerary",
        foreignField: "_id",
        as: "itineraryDetails",
      },
    },

    // Unwind itineraryDetails to deconstruct the array into documents
    { $unwind: "$itineraryDetails" },

    // Project the fields we are interested in
    {
      $project: {
        _id: 0,
        region: "$itineraryDetails.region",
        country: "$itineraryDetails.country",
      },
    },
  ];

  const result = await Boat.aggregate(pipeline).exec();
  return result;
};

// delete boat fromdb
const deleteBoatsFromDB = async (id) => {
  const result = await Boat.findByIdAndDelete(id);
  return result;
};

// get all approved boats from db
const getApprovedBoatsFromDB = async () => {
  const result = await Boat.find({ status: "approved" });
  return result;
};
// get all pending boats from db
const getAllPendingBoatsFromDB = async () => {
  const result = await Boat.find(
    { status: "pending" },
    { nameOfProperty: true, status: true }
  ).populate({ path: "user", model: "User" });
  return result;
};

// get single boat from db
const getSingleBoatFromDB = async (id) => {
  const result = await Boat.findById(id)
    .populate({
      path: "schedules.itinerary",
      model: "Itinerary",
    })
    .populate({
      path: "user",
      model: "User",
    });

  return result;
};

// update boat
const updateBoatFromDB = async (id, payload) => {
  const result = await Boat.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  const htmlMessage = `
    <div>
      <h1>Your Boat Has Been Approved</h1>
       <p> Check the property :  <a href=${`${process.env.FRONTEND_URL}/secondPage/${result?._id}`}>click here</a></p>
    </div>
  `;

  let user = await USER.findById(result.user);

  await transporter.sendMail({
    from: "deeparture.reservations@gmail.com",
    to: user.email,
    subject: "Boat Approved",
    html: htmlMessage,
  });

  return result;
};

// update single boat resitricted / unrestricted

const updateSingleBoatFromDB = async (id) => {
  const isExistBoat = await Boat.findById(id);
  if (!isExistBoat) {
    throw new AppError(httpStatus.NOT_FOUND, "Boat not found");
  }
  const payload = {
    resitricted: isExistBoat?.resitricted
      ? isExistBoat?.resitricted === true
        ? false
        : true
      : true,
  };

  const result = await Boat.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

module.exports = {
  createBoatIntoDB,
  getAllBoatFromDB,
  getBoatsFromDB,
  getBoatSearchItemFromDB,
  deleteBoatsFromDB,
  getApprovedBoatsFromDB,
  getAllPendingBoatsFromDB,
  updateBoatFromDB,
  getSingleBoatFromDB,
  updateSingleBoatFromDB,
};
