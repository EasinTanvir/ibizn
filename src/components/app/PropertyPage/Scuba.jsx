const Diving = {
  title: "Diving",
  description: `The MSY Ilike liveaboard Raja Ampat caters for up to 16 guests in
  8 cabins. All cabins have individually controlled air conditioning,
  en-suite bathrooms, and hot and cold showers. In addition, the
  thoughtfully designed rooms can be laid out as twins or doubles,
  so can easily provide for your requirements. The yacht offers a
  large, comfortable outside deck to chill out after an incredible
  day’s diving.`,
  imageUrl:
    "https://images.unsplash.com/photo-1517627043994-b991abb62fc8?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "under water",
};

const Image = ({ src, alt }) => (
  <div className="w-full lg:w-1/2 overflow-hidden flex-shrink-0 ">
    <img
      className="w-full object-cover h-[350px] md:h-[500px] "
      src={src}
      alt={alt}
    />
  </div>
);

const Content = ({ title, description }) => (
  <div
    id="diving"
    className="lg:w-1/2 w-full md:overflow-hidden md:rounded-lg md:flex md:flex-col md:items-start md:pr-8"
  >
    <div className="">
      <h1 className="text-3xl  text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] md:mb-4 mb-2  font-outfit">
        {title}
      </h1>
      <p className="text-[16px] md:text-xl md:font-light text-secondary ">
        {description}
      </p>
    </div>
    {/* <div className="py-8 flex items-center sm:justify-around  sm:gap-10 gap-5 text-xl mt-5 text-[#0080FF]  font-regular  mb-5">
      <h1>Sharks</h1>
      <h1>Sea turtles</h1>
      <h1>Sea turtles</h1>
    </div> */}
  </div>
);

function Scuba({ propertyData }) {
  return (
    <div className="customContainer flex  flex-col-reverse md:gap-14 lg:flex-row ">
      <Image
        src={propertyData?.diving?.Picture || propertyData?.diving?.image}
        alt={Diving.imageAlt}
      />
      <Content
        title={Diving.title}
        description={propertyData?.diving?.description}
      />
    </div>
  );
}

export default Scuba;
