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
  console.log("query data", queryData);
  const {
    destination,
    tabValue,
    date,
    minRating,
    maxRating,
    tripStart,
    tripEnd,
  } = queryData;
  console.log(tripStart);
  console.log(tripEnd);
  const andCondition = [];

  andCondition.push({
    status: "approved",
    resitricted: false,
  });
  if (destination) {
    andCondition.push({ country: destination });
  }
  if (tabValue === "Special Offers") {
    console.log("console from tab value");
    andCondition.push({ special: true });
  }

  if (date) {
    const formattedDate = new Date(date);
    andCondition.push({
      $or: [
        { "deactivationPeriod.startDate": { $gt: formattedDate } },
        { "deactivationPeriod.endDate": { $lt: formattedDate } },
      ],
    });
  }
  // Add veganRating condition if provided
  if (minRating && maxRating) {
    console.log("ratingggg");
    andCondition.push({ veganRating: { $gte: minRating, $lte: maxRating } });
  }

  if (tripStart && tripEnd) {
    const tripStartDate = new Date(tripStart);
    const tripEndDate = new Date(tripEnd);

    const tripStartMonth = tripStartDate.getMonth() + 1; // Months are zero-indexed

    const tripEndMonth = tripEndDate.getMonth() + 1;

    andCondition.push({
      $expr: {
        $or: [
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

  const result = await Resort.find({
    $and: andCondition.length > 0 ? andCondition : [{}],
  }).populate("listOfPackages");

  return result;
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
