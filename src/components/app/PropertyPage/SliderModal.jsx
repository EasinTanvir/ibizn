import * as React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdClose } from "react-icons/io";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";

import Modal from "@mui/material/Modal";

function SliderModal({
  open,
  setOpen,
  propertyData,
  selectedImage,
  setSelectedImage,
}) {
  const [initialSlide, setInitialSlide] = React.useState(0);
  const handleClose = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (propertyData?.carousalImages) {
      const selectedIndex = propertyData.carousalImages.indexOf(selectedImage);
      if (selectedIndex !== -1) {
        setInitialSlide(selectedIndex);
      }
    }
  }, [selectedImage, propertyData]);

  const openHandler = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border flex items-center min-h-screen"
      >
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          className=" w-full h-full mx-auto p-4 rounded-md   relative "
        >
          <div className="absolute right-4 top-4">
            <button onClick={() => setOpen(false)}>
              {" "}
              <IoMdClose className="text-white text-4xl" />
            </button>
          </div>
          <div className="my-4  flex justify-center w-full ">
            <img
              className=" md:w-[550px] w-72   rounded-md"
              src={selectedImage}
            />
          </div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            initialSlide={initialSlide}
            slidesPerView={2} // Default to 3 slides per view
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
            }}
          >
            {propertyData?.carousalImages
              ?.filter((image) => image !== selectedImage)
              ?.map((image, index) => (
                <SwiperSlide
                  onClick={() => openHandler(image)}
                  key={`other-${index}`}
                >
                  <img className="h-56 w-full md:w-96" src={image} />
                </SwiperSlide>
              ))}

            {propertyData?.carousal
              ?.filter((image) => image !== selectedImage)
              ?.map((image, index) => (
                <SwiperSlide
                  onClick={() => openHandler(image)}
                  key={`other-${index}`}
                >
                  <img className="h-56 w-full md:w-96" src={image} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Modal>
    </div>
  );
}

export default SliderModal;
