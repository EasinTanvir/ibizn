import { baseUrl } from "@/src/config/serverConfig";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import { ClipLoader } from "react-spinners";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { userContext } from "@/src/storage/contextApi";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordUpdate = ({ token }) => {
  const { submitLoader, setSubmitLoader } = useContext(userContext);

  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loginError, setLoginError] = React.useState("");
  const [error, setError] = React.useState("");
  const { control, setControl } = useContext(userContext);
  // kdjfkdjfkdjf

  const signInUser = (data) => {
    console.log("signInUser", data);
    if (data.password !== data.cpassword)
      return toast.error("Must didn't match");
    const sendData = {
      password: data.password,
      token,
    };
    setLoginError("");
    setSubmitLoader(true);
    fetch(`${baseUrl}/users/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.success) {
          // console.log(data?.data);

          toast.success("Password update successfully");
          reset();

          setSubmitLoader(false);
        } else {
          setSubmitLoader(false);
          console.log(data);
          setLoginError(data?.message);
        }
      })
      .catch((err) => {
        console.error("Error during sign-in:", err);
        setSubmitLoader(false);
      });
  };

  return (
    <>
      <div className="p-4"></div>

      <div
        className={`bg-white  rounded p-8 text-black w-10/12 md:w-8/12 lg:w-[500px] mx-auto min-h-[60vh] md:mt-24 lg:mt-36 shadow-lg shadow-gray-400 mt-32`}
      >
        <div>
          <h1 className="text-center text-2xl font-semibold">
            Update Your Password
          </h1>
          <form onSubmit={handleSubmit(signInUser)}>
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">Password</p>
              <label className="flex items-center">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="password"
                  className="w-full rounded-md"
                />
                <button
                  type="button"
                  className="-ms-7"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </button>
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
            </div>
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">Confirm Password</p>
              <label className="flex items-center">
                <input
                  type={showPass2 ? "text" : "password"}
                  {...register("cpassword", {
                    required: true,
                  })}
                  placeholder="confirm password"
                  className="w-full rounded-md"
                />
                <button
                  type="button"
                  className="-ms-7"
                  onClick={() => setShowPass2(!showPass2)}
                >
                  {showPass2 ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </button>
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
            </div>
            {loginError && <p className="text-red-600 my-2">{loginError}</p>}
            {/* <input
              className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
              type="submit"
              value="Sign In"
            /> */}
            <div>
              <button
                disabled={submitLoader}
                className="w-full rounded-md  custom_red_color py-3 mt-4 text-white font-semibold"
                type="submit"
              >
                {submitLoader ? <ClipLoader color="#ffff" /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordUpdate;
