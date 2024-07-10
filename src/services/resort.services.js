const Resort = require("../models/resort.model");
const USER = require("../models/user.model");
const transporter = require("../config/smtp");

const createResortIntoDB = async (userData, payload) => {
  const user = userData.userId;
  const result = await Resort.create({ user, ...payload });
  const htmlMessage = `
    <div>
      <h1>New Resort Has Been Added</h1>
       <p> Check the property <a href=${`${process.env.FRONTEND_URL}/secondPage/resort/${result?._id}`}>click here</a></p>
    </div>
  `;

  let admin;

  admin = await USER.findOne({ role: "admin" });
  console.log(admin);
  await transporter.sendMail({
    from: "deeparture.reservations@gmail.com",
    to: admin.email,
    subject: "New Resort Added",
    html: htmlMessage,
  });

  return result;
};

const getResortsFromDB = async (id) => {
  const result = await Resort.find({ user: id });
  return result;
};

// get all resorts from db
const getAllResortFromDB = async (queryData) => {
  const {
    destination,
    tabValue,
    date,
    minRating,
    maxRating,
    tripStart,
    tripEnd,
    minPrice,
    maxPrice,
    facility,
  } = queryData;
  //console.log("minPrice = ", minPrice);
  //console.log("maxPrice = ", maxPrice);
  console.log("facility = ", facility);

  const fMinPrice = parseFloat(Number(minPrice).toFixed(2));
  const fMaxPrice = parseFloat(Number(maxPrice).toFixed(2));

  //console.log(tripEnd);
  const andCondition = [];

  andCondition.push({
    status: "approved",
    resitricted: false,
  });
  if (destination) {
    andCondition.push({ country: destination });
  }
  if (tabValue === "Special Offers") {
    andCondition.push({ special: true });
  }

  // if (minPrice && maxPrice) {
  //   const priceCondition = {
  //     convertPrice: { $gte: Number(minPrice).toFixed(2) },
  //     convertPrice: { $lte: Number(maxPrice).toFixed(2) },
  //   };
  //   andCondition.push(priceCondition);
  // }

  // if (date) {
  //   const formattedDate = new Date(date);
  //   andCondition.push({
  //     $or: [
  //       { "deactivationPeriod.startDate": { $gt: formattedDate } },
  //       { "deactivationPeriod.endDate": { $lt: formattedDate } },
  //     ],
  //   });
  // }
  // // Add veganRating condition if provided
  // if (minRating && maxRating) {
  //   console.log("ratingggg");
  //   andCondition.push({ veganRating: { $gte: minRating, $lte: maxRating } });
  // }

  if (facility && facility.length > 0) {
    andCondition.push({ facilities: { $in: facility } });
  }

  if (tripStart && tripEnd) {
    const tripStartDate = new Date(tripStart);
    const tripEndDate = new Date(tripEnd);
    console.log("tripStartDate = ", tripStartDate);
    console.log("tripEndDate = ", tripEndDate);

    const tripStartMonth = tripStartDate.getMonth() + 1; // Months are zero-indexed

    const tripEndMonth = tripEndDate.getMonth() + 1;

    andCondition.push({
      $expr: {
        $and: [
          {
            $ne: [
              { $month: { $toDate: "$deactivationPeriod.startDate" } },
              tripStartMonth,
            ],
          },
          {
            $ne: [
              { $month: { $toDate: "$deactivationPeriod.endDate" } },
              tripEndMonth,
            ],
          },
        ],
      },
    });
  }

  if (minPrice && maxPrice) {
    const fMinPrices = parseFloat(minPrice);
    const fMaxPrices = parseFloat(maxPrice);

    const resorts = await Resort.find({
      $and: andCondition.length > 0 ? andCondition : [{}],
    }).populate("listOfPackages");

    const filteredResorts = resorts.filter((resort) =>
      resort.listOfPackages.some(
        (package) =>
          package.ConvertedPrice >= fMinPrices &&
          package.ConvertedPrice <= fMaxPrices
      )
    );

    return filteredResorts;
  } else {
    const result = await Resort.find({
      $and: andCondition.length > 0 ? andCondition : [{}],
    }).populate("listOfPackages");

    return result;
  }
};

// get resort search item
const getResortSearchItemFromDB = async () => {
  const result = await Resort.find().select("region country");
  return result;
};

// get single resort
const getSingleResotFromDB = async (id) => {
  const result = await Resort.findById(id)
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "listOfPackages",
      model: "Package",
    });
  // console.log({result});
  return result;
};

// delete resort fromdb
const deleteResortFromDB = async (id) => {
  const result = await Resort.findByIdAndDelete(id);
  return result;
};
// get all pending resorts from db
const getAllPendingResortFromDB = async () => {
  const result = await Resort.find(
    { status: "pending" },
    { propertyName: true, status: true }
  ).populate({
    path: "user",
    model: "User",
  });
  return result;
};
// get all approved resorts from db
const getAllApprovedResortFromDB = async () => {
  const result = await Resort.find(
    { status: "approved" },
    { carousalImages: false }
  );
  return result;
};
const updateResortFromDB = async (id, payload) => {
  const result = await Resort.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  const htmlMessage = `
    <div>
      <h1>Your Resort Has Been Approved</h1>
       <p> Check the property :  <a href=${`${process.env.FRONTEND_URL}/secondPage/resort/${result?._id}`}>click here</a></p>
    </div>
  `;

  let user = await USER.findById(result.user);
  console.log(user);

  await transporter.sendMail({
    from: "deeparture.reservations@gmail.com",
    to: user.email,
    subject: "Resort Approved",
    html: htmlMessage,
  });

  return result;
};
const updateSingleResortFromDB = async (id) => {
  const isExistResort = await Resort.findById(id);

  if (!isExistResort) {
    throw new AppError(httpStatus.NOT_FOUND, "resort not found");
  }
  const payload = {
    resitricted: isExistResort?.resitricted
      ? isExistResort?.resitricted === true
        ? false
        : true
      : true,
  };

  const result = await Resort.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
module.exports = {
  createResortIntoDB,
  getResortsFromDB,
  getAllResortFromDB,
  deleteResortFromDB,
  getResortSearchItemFromDB,
  getAllPendingResortFromDB,
  getAllApprovedResortFromDB,
  updateResortFromDB,
  getSingleResotFromDB,
  updateSingleResortFromDB,
};
