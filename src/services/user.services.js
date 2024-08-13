const httpStatus = require("http-status");
const { generateToken } = require("../config/jwtConfig");
const AppError = require("../error/appError");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Resort = require("../models/resort.model");
const Boat = require("../models/boat.model");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
// create user ------------------------------
const createUserIntoDB = async (payload) => {
  const isExists = await User.exists({ email: payload.email });
  if (isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const result = await User.create(payload);

  return result;
};

const passwordResetEmail = async (payload) => {
  const user = await User.exists({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email address");
  }

  return user;
};

const updateNewPasswordContrl = async (payload) => {
  const token = payload.token;
  console.log("token =", token);
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
  }
  const decoded = jwt.verify(token, config.jwt_secret);
  console.log("decoded =", decoded);
  const { userId } = decoded;
  const user = await User.findById(userId);

  user.password = payload.password;
  await user.save();

  console.log("token userId =", user);
  console.log("user =", user);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email address");
  }

  return user;
};

// login user -------------------------

const loginUserIntoDB = async (payload) => {
  const isExists = await User.findOne({ email: payload.email });
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isValid = isExists.isValid;
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not verified.Check you email for verification"
    );
  }
  //check if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isExists.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid Password");
  }
  // Generate a JWT token
  const token = generateToken(isExists);
  const result = await User.findOne({ email: payload.email }, { password: 0 });
  return { user: result, token };
};

// update user into db ------------
const updateUserIntoDB = async (userData, payload) => {
  // console.log(id, payload);
  const id = userData.userId;
  // check if the user is exists or not
  const isExists = await User.findById(id);
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This user does not exists");
  }
  // update automatically by payload
  const result = await User.findByIdAndUpdate(
    id,
    // { bankAccount: payload },
    payload,
    { new: true, runValidators: true }
  );
  return result;
};

// get single user from db ------------
const getSingleUser = async (id) => {
  const result = await User.findOne({ _id: id });
  return result;
};

// get all operator -----------------
const getAllOperatorFromDB = async () => {
  const result = await User.find({ role: "operator" }, { password: 0 });
  return result;
};

// restrict user
const restrictUserIntoDB = async (id) => {
  // Update user status to 'restricted'
  const result = await User.findByIdAndUpdate(id, { status: "restricted" });

  // Update status of resorts and boats associated with the user
  await Resort.updateMany(
    { user: id, status: "approved" },
    { status: "blocked" }
  );
  await Boat.updateMany(
    { user: id, status: "approved" },
    { status: "blocked" }
  );
  return result;
};
// unRestrict user
const unRestrictUserIntoDB = async (id) => {
  // Update user status to 'restricted'
  const result = await User.findByIdAndUpdate(id, { status: "active" });

  // update resort and boat status for this user which is restricted or unrestricted
  await Resort.updateMany(
    { user: id, status: "blocked" },
    { status: "approved" }
  );
  await Boat.updateMany(
    { user: id, status: "blocked" },
    { status: "approved" }
  );
  return result;
};

module.exports = {
  createUserIntoDB,
  loginUserIntoDB,
  updateUserIntoDB,
  getSingleUser,
  getAllOperatorFromDB,
  restrictUserIntoDB,
  unRestrictUserIntoDB,
  passwordResetEmail,
  updateNewPasswordContrl,
};
