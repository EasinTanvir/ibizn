import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function Exclusions({ propertyData }) {
  console.log(propertyData);
  return (
    <>
      <div className="  sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]  customContainer  flex flex-col lg:flex-row  justify-between gap-[75px]  sm:gap-12    md:bg-white px-4 lg:px-0">
        <div className=" flex-1 md:h-full flex flex-col items-start">
          <div className="flex gap-1 items-center ">
            <img className="w-10" src="/ea2.svg" alt="" />
            <h1 className="sm:text-[48px] text-title2 font-outfit font-light    text-primary ">
              Trip Inclusions
            </h1>
          </div>

          <div className=" md:space-y-4  sm:mt-[45px] mt-[25px] space-y-2">
            {propertyData?.inclusions?.map((item, i) => (
              <div
                key={i}
                className="sm:text-[20px] flex items-start sm:items-center gap-2 text-subtitle2 leading-[26px] font-light font-roboto  text-secondary "
              >
                <div className="min-w-2 max-w-2 min-h-2 max-h-2  rounded-full bg-primary sm:mt-0 mt-[9px]"></div>{" "}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 md:h-full flex flex-col items-start ">
          <div className="flex  gap-1 items-center ">
            <img className="w-10" src="/ea1.svg" alt="" />
            <h1 className="sm:text-[48px] text-title2 font-outfit font-light  text-primary ">
              Trip Exclusions
            </h1>
          </div>

          <div className="md:space-y-4 sm:mt-[45px] mt-[25px] space-y-2 ">
            {propertyData?.exclusions?.map((item, i) => (
              <div
                key={i}
                className="sm:text-[20px] text-subtitle2 flex items-start sm:items-center gap-2 leading-[26px] font-light font-roboto  text-secondary "
              >
                <div className="min-w-2 max-w-2 min-h-2 max-h-2  rounded-full bg-primary sm:mt-0 mt-[9px]"></div>{" "}
                <span> {item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Exclusions;
