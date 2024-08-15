import RatingPortion from "./RatingPortion";

const Content = ({ title, description }) => (
  <div className="w-full  flex flex-col justify-center items-start  md:justify-start">
    <h1 className="sm:text-title text-title2  text-primary  font-light   font-outfit">
      {title}
    </h1>
    <p className="sm:text-subtitle text-subtitle2 sm:mt-[30px] mt-[25px]  font-light text-secondary font-roboto   ">
      {description}
    </p>
  </div>
);

const Image = ({ src, alt }) => (
  <div className="sm:p-2 p-0 w-full lg:w-1/2 aspect-[3/2]">
    <img className="w-full h-full object-cover" src={src} alt={alt} />
  </div>
);

const Food = ({ propertyData, resort }) => {
  const foodInfo = {
    title: "Food Onboard",
    description: `The MSY Ilike liveaboard Raja Ampat caters for up to 16 guests in 8
      cabins. All cabins have individually controlled air conditioning,
      en-suite bathrooms, and hot and cold showers. In addition, the
      thoughtfully designed rooms can be laid out as twins or doubles, so
      can easily provide for your requirements. The yacht offers a large,
      comfortable outside deck to chill out after an incredible day’s
      diving.`,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Delicious food",
  };

  return (
    <div className="flex   flex-col sm:gap-10 gap-[45px]  lg:flex-row sm:justify-between sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]   customContainer bg-white">
      <div className=" flex-1">
        <Content
          title={resort ? "Food" : "Food Onboard"}
          description={
            propertyData?.foodOnboard?.description ||
            propertyData?.food?.description
          }
        />
        <div className="sm:pt-[60px] pt-[35px]">
          <RatingPortion rating={propertyData?.veganRating} />
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <Image
          src={propertyData?.foodOnboard?.Picture || propertyData?.food?.image}
          alt={foodInfo.imageAlt}
        />
      </div>
    </div>
  );
};

export default Food;
