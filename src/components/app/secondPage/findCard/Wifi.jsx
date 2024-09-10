const Wifi = ({ facilities }) => {
  const hasWifi = facilities?.includes("Wi-fi onboard");
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
