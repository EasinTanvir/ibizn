import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
          className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-9/12 mx-auto max-h-[80vh] overflow-y-auto bg-primary text-white shadow-lg outline-none p-4 rounded-md"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <div className="p-6">
            <Typography id="modal-modal-title" className="">
              <h1 className="lg:text-5xl text-2xl font-roboto font-[300]">
                {ititnary?.itineraryName}
              </h1>

              <div className="pt-5">
                <div className="mt-1">
                  <span className="text-2xl md:text-4xl md:font-light">
                    {ititnary?.embarkationPoints} —{" "}
                    {ititnary?.disembarkationPoints}
                  </span>
                </div>

                <div className="inline-block text-xl md:text-xl ">
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
            <div className="w-full h-[1px] bg-white my-12"></div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* {cabins && cabins.length > 0 ? (
                cabins.map((cabin) => (
                  <div
                    key={cabin._id}
                    className="mb-4 flex flex-col md:flex-row md:items-center justify-between outline-none border-b-primary border-b-[1px] py-4"
                  >
                    <Typography
                      variant="subtitle1"
                      className="text-xl md:text-2xl"
                    >
                      {cabin.cabinName}
                    </Typography>
                    <Typography variant="subtitle2" className="text-xl">
                      <span className="text-primary text-xl font-light md:text-2xl">
                        Price
                      </span>{" "}
                      :{" "}
                      <span className="font-semibold">
                        ${Number(cabin?.convertedPrice).toFixed(2)}
                      </span>{" "}
                      USD
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography>No cabins available</Typography>
              )} */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="  text-white ">
                    <span className="font-[400] text-2xl font-roboto">
                      Length :{" "}
                    </span>
                    <span className="text-2xl font-roboto text-light font-[200]">
                      {" "}
                      ({ititnary?.numberOfDays} Days /{" "}
                      {ititnary?.numberOfNights} Nights)
                    </span>
                  </div>
                  <div className="  text-white ">
                    <span className="font-[400] text-2xl font-roboto">
                      Departure :{" "}
                    </span>
                    <span className="text-2xl font-roboto text-light font-[200]">
                      {ititnary?.embarkationPoints}
                    </span>
                  </div>
                  <div className="  text-white ">
                    <span className="font-[400] text-2xl font-roboto">
                      Return :{" "}
                    </span>
                    <span className="text-2xl font-roboto text-light font-[200]">
                      {ititnary?.disembarkationPoints}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="  text-white ">
                    <span className="font-[400] text-2xl font-roboto">
                      Number of Dives :{" "}
                    </span>
                    <span className="text-2xl font-roboto text-light font-[200]">
                      {" "}
                      {ititnary?.numberOfDives}
                    </span>
                  </div>

                  <div className="  text-white ">
                    <span className="font-[400] text-2xl font-roboto">
                      Location :{" "}
                    </span>
                    <span className="text-2xl font-roboto text-light font-[200]">
                      {" "}
                      {ititnary?.region}, {ititnary?.country},{" "}
                      {ititnary?.district}
                    </span>
                  </div>
                </div>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CabinModal;
