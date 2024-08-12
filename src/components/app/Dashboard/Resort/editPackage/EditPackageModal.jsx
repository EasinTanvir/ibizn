import Spinner from "@/src/components/core/shared/Loader/Spinner";
import { baseUrl } from "@/src/config/serverConfig";
import { Questions } from "@/src/constant/questions/questions";
import { userContext } from "@/src/storage/contextApi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "12px", // Set the width of the scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // Set the color of the scrollbar thumb
    borderRadius: "10px", // Set the border radius of the scrollbar thumb
    border: "3px solid #f1f1f1", // Add a border around the scrollbar thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Set the color of the scrollbar thumb on hover
  },
};
const EditPackageModal = ({
  open,
  setPackageControl,
  singlePackageData,
  handleClose,
}) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [packageData, setPackageData] = useState({});
  const [currency, setCurrency] = useState(null);

  const handleCurrencyChange = (event) => {
    let myEvents = event !== "select" ? event : "USD";
    setCurrency(myEvents);
    setPackageData({ ...packageData, currency: myEvents });
  };

  useEffect(() => {
    fetch(`${baseUrl}/packages/single-package/${singlePackageData.id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackageData(data?.data);
        setCurrency(data?.data.currency);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loader) <Spinner />;
  console.log(packageData);
  const handlePackageSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(`${baseUrl}/packages/update-package/${singlePackageData.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        ...packageData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Awesome, Your Package Has Been Successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          // router.push("/dashboard/resort");
          setPackageControl(true);
          handleClose();
        } else {
          //   setError(data.message);
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loader ? (
          <Spinner />
        ) : (
          <div>
            <h3 className="text-center font-semibold text-3xl">
              Update Accommodation And Dive Package
            </h3>
            <div className="mt-10">
              <form onSubmit={handlePackageSubmit}>
                <div className="lg:flex gap-3 items-center">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Package Name</p>
                    <input
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          packageName: e.target.value,
                        })
                      }
                      defaultValue={packageData?.packageName}
                      type="text"
                      name="packageName"
                      required
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-lg font-semibold">Number of Days</p>
                    <input
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          numberOfDay: Number(e.target.value),
                        })
                      }
                      defaultValue={packageData?.numberOfDay}
                      type="number"
                      required
                      name="numberOfDay"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="lg:flex gap-3 justify-between">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Room Type</p>
                    <input
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          roomType: e.target.value,
                        })
                      }
                      defaultValue={packageData?.roomType}
                      type="text"
                      name="roomType"
                      required
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-lg font-semibold">Number of Dives</p>
                    <input
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          numberOfDivies: Number(e.target.value),
                        })
                      }
                      defaultValue={packageData?.numberOfDivies}
                      type="number"
                      required
                      name="numberOfDivies"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="lg:flex gap-3 justify-between">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Full Board</p>
                    <select
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          fullBoard: e.target.value === "true" ? true : false,
                        })
                      }
                      name="fullBoard"
                      className="select w-full "
                      defaultValue={packageData?.fullBoard}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Breakfast</p>
                    <select
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          breakfast: e.target.value === "true" ? true : false,
                        })
                      }
                      name="breakfast"
                      className="select w-full "
                      defaultValue={packageData?.breakfast}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </div>
                <div className="lg:flex gap-3 justify-between">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Upgradeable</p>
                    <select
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          upgradeable: e.target.value === "true" ? true : false,
                        })
                      }
                      name="upgradeable"
                      className="select w-full "
                      defaultValue={packageData?.upgradeable}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">
                      Dive Courses Available
                    </p>
                    <select
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          drivingCourses:
                            e.target.value === "true" ? true : false,
                        })
                      }
                      name="drivingCourses"
                      className="select w-full "
                      defaultValue={packageData?.drivingCourses}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center  gap-2">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Price</p>
                    <input
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          price: Number(e.target.value),
                        })
                      }
                      defaultValue={packageData?.price}
                      type="number"
                      required
                      name="price"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-lg font-semibold mt-4">Currency</p>
                    <select
                      required
                      className="font-semibold rounded-md border w-full border-slate-600"
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      value={currency}
                      name="currency"
                      id="currency"
                    >
                      {console.log(packageData?.currency)}
                      <option value="select">Select Currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="IDR">IDR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                      <option value="NZD">NZD</option>
                      <option value="THB">THB</option>
                      <option value="CHF">CHF</option>
                      <option value="PHP">PHP</option>

                      <option value="MYR">MYR</option>
                    </select>
                  </div>
                </div>

                {/* {error && <p className="text-red-600 text-xl mb-3">{error}</p>} */}

                <input
                  className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default EditPackageModal;
