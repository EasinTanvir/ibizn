import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { RxCross2 } from "react-icons/rx";

function PackageModal({ packages, setOpen, open, propertyData }) {
  console.log(packages);
  const handleClose = () => setOpen(false);

  return (
    <div className="xl:w-1/4 relative lg:mt-10 xl:mt-0 mx-4">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="w-11/12 sm:w-10/12 md:w-8/12 rounded-md lg:w-9/12 mx-auto max-h-[70vh] overflow-y-auto bg-primary text-white shadow-lg outline-none "
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <div className="sm:p-6 p-3">
            <button onClick={handleClose} className="absolute right-2 top-2">
              <RxCross2 className="text-2xl text-white" />
            </button>
            <Typography id="modal-modal-title" className="">
              <h1 className="lg:text-5xl text-3xl font-roboto font-[300]">
                {packages?.packageName}
              </h1>
            </Typography>
            <div className="w-full h-[1px] bg-white sm:my-12 my-6"></div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="flex sm:flex-row flex-col sm:justify-between sm:gap-0 gap-5 sm:items-center">
                <div className="space-y-1">
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Length :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {" "}
                      ({packages?.numberOfDay} Days / {packages?.numberOfNight}{" "}
                      Nights)
                    </span>
                  </div>
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Room Type :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {packages?.roomType}
                    </span>
                  </div>{" "}
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Full Board :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {packages?.fullBoard ? (
                        <CheckIcon className="text-2xl" />
                      ) : (
                        <ClearIcon className="text-3xl" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Number of Dives :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {" "}
                      {packages?.numberOfDivies}
                    </span>
                  </div>
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Breakfast :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {packages?.breakfast ? (
                        <CheckIcon className="text-2xl" />
                      ) : (
                        <ClearIcon className="text-3xl" />
                      )}
                    </span>
                  </div>{" "}
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Upgradeable :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {packages?.upgradeable ? (
                        <CheckIcon className="text-2xl" />
                      ) : (
                        <ClearIcon className="text-3xl" />
                      )}
                    </span>
                  </div>{" "}
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Diving Courses :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {packages?.divingCourses ? (
                        <CheckIcon className="text-2xl" />
                      ) : (
                        <ClearIcon className="text-3xl" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Typography>
          </div>
          <div className="bg-white text-secondary   py-3 px-6">
            <p>{propertyData?.resortDailySchedule}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PackageModal;
