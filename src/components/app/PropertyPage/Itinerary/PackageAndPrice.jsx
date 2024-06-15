import { useState } from "react";
import CabinModal from "./CabinModal";
import BookingModal from "./BookingModal";
import ResortBookingModal from "./ResortBookingModal";

function ResortAndPrice({ propertyData }) {
  const [cabins, setCabins] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = (cabins) => {
    setOpen(true);
    setCabins(cabins);
  };
  // for booking model;
  const [schedule, setSchedule] = useState({});
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleOpenBookingModal = (item) => {
    setSchedule(item);
    setIsOpenBookingModal(true);
  };

  if (propertyData?.listOfPackages?.length === 0) {
    return <div>No Package Found</div>;
  }

  return (
    <div className="w-full bg-primary">
      <div className="customContainer mx-auto py-8 px-4">
        <h1 className="text-2xl text-white font-light md:text-6xl md:font-light my-8">
          Packages
        </h1>

        {propertyData?.listOfPackages?.length > 0 ? (
          propertyData?.listOfPackages?.map((item, index) => (
            <div
              key={index}
              className="border-2 flex flex-col xl:flex-row gap-4 border-[#09aafe] text-white p-8 mb-4 rounded-lg md:justify-between items-start"
            >
              <div className="w-full">
                <div className="md:text-white md:text-4xl items-end font-[400] flex flex-wrap gap-2 md:gap-8">
                  <div className="inline-block text-2xl font-light">
                    ({item?.numberOfDay} Days / {item?.numberOfNight} Nights)
                  </div>
                  <span className="inline-block text-[#09aafe] text-xl font-bold">
                    (from {item.price} USD)
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-4 md:mt-0">
                <button
                  onClick={() => handleOpenBookingModal(item)}
                  className="bg-white text-primary rounded-full px-6 py-2 md:px-16 text-sm md:text-xl lg:text-2xl"
                >
                  Select
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Package available.</p>
        )}
      </div>

      <ResortBookingModal
        open={isOpenBookingModal}
        setOpen={setIsOpenBookingModal}
        propertyData={propertyData}
        packages={schedule}
      />
    </div>
  );
}

export default ResortAndPrice;
