import { userContext } from "@/src/storage/contextApi";
import { useContext } from "react";

const Wifi = ({ facilities }) => {
  const { searchValues } = useContext(userContext);

  let hasWifi;

  if (
    searchValues?.tabValue === "Resorts" ||
    searchValues?.property === "resort"
  ) {
    hasWifi = facilities?.includes("Internet and Wifi");
  } else {
    hasWifi = facilities?.includes("Wi-fi onboard");
  }
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
