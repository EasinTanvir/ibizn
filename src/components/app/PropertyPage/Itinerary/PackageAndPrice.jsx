import { useState } from "react";
import CabinModal from "./CabinModal";
import BookingModal from "./BookingModal";
import ResortBookingModal from "./ResortBookingModal";
import PackageModal from "./PackageModal";

function ResortAndPrice({ propertyData }) {
  const [packages, setPackages] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  console.log(packages);
  console.log(selectedPackage);
  const [open, setOpen] = useState(false);

  // for booking model;
  const [schedule, setSchedule] = useState({});
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);

  const handleOpenPackageModal = (item) => {
    setOpen(true);
    setPackages(item);
  };

  const handleOpenBookingModal = (item) => {
    setSchedule(item);
    setIsOpenBookingModal(true);
  };
  const selectPackage = (item) => {
    setSelectedPackage(item);
  };

  if (propertyData?.listOfPackages?.length === 0) {
    return <div>No Package Found</div>;
  }

  return (
    <div className="w-full bg-primary sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]">
      <div className="customContainer mx-auto px-4">
        <h1 className="sm:text-title  text-title2 text-white  font-light font-outfit">
          Dive and stay packages
        </h1>
        <div className="mt-[43px]">
          {propertyData?.listOfPackages?.length > 0 ? (
            propertyData?.listOfPackages?.map((item, index) => (
              <div>
                <div
                  key={index}
                  className={`border-2 ${
                    item._id === selectedPackage?._id
                      ? "bg-white text-primary"
                      : " text-white"
                  }  flex flex-col xl:flex-row gap-4 border-[#09aafe]  p-8 mb-4 rounded-lg md:justify-between items-start`}
                >
                  <div className="w-full">
                    <div className=" md:text-4xl items-end font-[400] flex flex-wrap gap-2 md:gap-8">
                      <div className="inline-block font-roboto font-bold leading-[22px] text-[20px] ">
                        ({item?.numberOfDay} Days / {item?.numberOfNight}{" "}
                        Nights)
                      </div>
                      <span className="inline-block font-roboto text-[#09aafe]  leading-[22px] text-[20px]  font-bold">
                        (from {Number(item.ConvertedPrice).toFixed(2)} USD)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4 md:mt-0">
                    <button
                      onClick={() => handleOpenPackageModal(item)}
                      className={` border ${
                        item._id === selectedPackage?._id
                          ? "text-primary border-primary"
                          : "text-light border-white"
                      }  px-10 rounded-full  py-1 text-sm md:text-xl lg:text-2xl`}
                    >
                      Package
                    </button>
                    {/* <button
                    onClick={() => handleOpenBookingModal(item)}
                    className="bg-white text-primary rounded-full px-6 py-2 md:px-16 text-sm md:text-xl lg:text-2xl"
                  >
                    Select
                  </button> */}
                    <button
                      onClick={() => setSelectedPackage(item)}
                      className={`${
                        item._id === selectedPackage?._id
                          ? "text-white border-none bg-primary"
                          : "text-primary border-none bg-white"
                      } rounded-full px-10 py-2 md:px-16 text-sm md:text-xl lg:text-2xl`}
                    >
                      Select
                    </button>
                  </div>
                </div>
                {item?._id === selectedPackage?._id && (
                  <>
                    <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mb-5 gap-3 mt-2">
                      <div className="border border-white py-4 px-6 rounded-md  ">
                        <h1 className="text-xl text-white font-medium  ">
                          {selectedPackage?.packageName}
                        </h1>

                        <>
                          <div className="mt-2">
                            <span className="text-white text-2xl md:text-3xl">
                              {selectedPackage?.ConvertedPrice}
                            </span>
                            <span className="inline-block text-white ms-1  font-semibold text-sm">
                              USD
                            </span>
                          </div>
                        </>

                        <div className="pt-5">
                          <button
                            onClick={() => handleOpenBookingModal(item)}
                            className="bg-white text-primary rounded-full px-6 py-1 text-sm lg:text-xl "
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No Package available.</p>
          )}
        </div>
      </div>

      <PackageModal open={open} setOpen={setOpen} packages={packages} />

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
