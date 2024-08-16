import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RxCross2 } from "react-icons/rx";
function CabinModal({ cabins, setOpen, open, ititnary, tripDate }) {
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
          className="w-[95%] sm:w-10/12 md:w-8/12 lg:w-9/12 mx-auto max-h-[70vh] overflow-y-auto bg-primary text-white shadow-lg outline-none rounded-md"
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
                {ititnary?.itineraryName}
              </h1>

              <div className="pt-5">
                <div className="mt-1">
                  <span className="text-xl md:text-4xl md:font-light">
                    {ititnary?.embarkationPoints} —{" "}
                    {ititnary?.disembarkationPoints}
                  </span>
                </div>

                <div className="inline-block text-lg md:text-xl ">
                  {new Date(tripDate?.tripStart).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  —{" "}
                  {new Date(tripDate?.tripEnd).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </Typography>
            <div className="w-full h-[1px] bg-white sm:my-12 my-6"></div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="flex sm:flex-row flex-wrap sm:justify-between sm:gap-0 gap-4 sm:items-center">
                <div>
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Length :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {" "}
                      ({ititnary?.numberOfDays} Days /{" "}
                      {ititnary?.numberOfNights} Nights)
                    </span>
                  </div>
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Departure :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {new Date(tripDate?.tripStart).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      / {ititnary?.embarkationPoints}
                    </span>
                  </div>
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Return :{" "}
                    </span>
                    <span className="sm:text-2xl text-xltext-2xl font-roboto text-light font-[200]">
                      {new Date(tripDate?.tripEnd).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      / {ititnary?.disembarkationPoints}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xl font-roboto">
                      Number of Dives :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {" "}
                      {ititnary?.numberOfDives}
                    </span>
                  </div>

                  <div className="  text-white ">
                    <span className="font-[400] sm:text-2xl text-xlfont-roboto">
                      Location :{" "}
                    </span>
                    <span className="sm:text-2xl text-xl font-roboto text-light font-[200]">
                      {" "}
                      {ititnary?.region}, {ititnary?.country},{" "}
                      {ititnary?.district}
                    </span>
                  </div>
                </div>
              </div>
            </Typography>
          </div>
          <div className="bg-white text-secondary   py-3 px-6">
            <h3 className="pb-2 sm:text-2xl text-lg">Itinerary Description</h3>
            <p>{ititnary?.itineraryDescription}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CabinModal;
