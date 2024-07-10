const Wifi = ({ facilities }) => {
  console.log(facilities);
  const hasWifi = facilities.some((facility) => facility === "Wi-fi onboard");
  return (
    <div>
      <h1 className="text-[#0080ff] text-[14px] md:text-[25px] font-outfit">
        <span className="font-[700] sm:font-[500]">Wi-Fi:</span>{" "}
        {hasWifi ? "Available" : "Unavailable"}
      </h1>
    </div>
  );
};

export default Wifi;
