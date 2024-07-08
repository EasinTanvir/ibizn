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
    <div className="mt-12 ">
      <Swiper
        navigation={true}
        modules={[Navigation]}
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
        className="mySwiper"
      >
        {propertyData?.carousal?.map((image) => (
          <SwiperSlide onClick={() => openHandler(image)}>
            <img className="h-56 w-full md:w-96 cursor-pointer" src={image} />
          </SwiperSlide>
        ))}
        {propertyData?.carousalImages?.map((image) => (
          <SwiperSlide onClick={() => openHandler(image)}>
            <img className="h-56 w-full md:w-96 cursor-pointer" src={image} />
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
