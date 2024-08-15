import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";
// import required modules
import { Navigation } from "swiper/modules";
import SliderModal from "./SliderModal";

const SwipeBoard = ({ propertyData }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");

  const openHandler = (imageUrl) => {
    setOpen(true);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={2} // Default to 2 slides per view
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        className="mySwiper"
      >
        {propertyData?.carousal?.map((image) => (
          <SwiperSlide onClick={() => openHandler(image)}>
            <div className="aspect-w-3 aspect-h-2">
              <img
                className="h-full w-full cursor-pointer object-cover"
                src={image}
              />
            </div>
          </SwiperSlide>
        ))}
        {propertyData?.carousalImages?.map((image) => (
          <SwiperSlide onClick={() => openHandler(image)}>
            <div className="aspect-w-3 aspect-h-2">
              <img
                className="h-full w-full cursor-pointer object-cover"
                src={image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderModal
        propertyData={propertyData}
        open={open}
        setOpen={setOpen}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default SwipeBoard;
