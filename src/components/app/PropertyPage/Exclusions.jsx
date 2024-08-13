import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function Exclusions({ propertyData }) {
  console.log(propertyData);
  return (
    <>
      <div className="  sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]  customContainer  flex flex-col md:flex-row  justify-between gap-[75px]  sm:gap-12    md:bg-white px-4 lg:px-0">
        <div className=" flex-1 md:h-full flex flex-col items-start">
          <div className="flex gap-1 items-center ">
            <img className="w-10" src="/as15.svg" alt="" />
            <h1 className="sm:text-[48px] text-title2 font-outfit font-light    text-primary ">
              Trip Inclusions
            </h1>
          </div>

          <div className=" md:space-y-4  sm:mt-[45px] mt-[25px] space-y-2">
            {propertyData?.inclusions?.map((item, i) => (
              <p
                key={i}
                className="sm:text-[20px] text-subtitle2 leading-[26px] font-light font-roboto  text-secondary "
              >
                <span className="opacity-[70%]">—</span> {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-1 md:h-full flex flex-col items-start ">
          <div className="flex  gap-1 items-center ">
            <img className="w-10" src="/as14.svg" alt="" />
            <h1 className="sm:text-[48px] text-title2 font-outfit font-light  text-primary ">
              Trip Exclusions
            </h1>
          </div>

          <div className="md:space-y-4 sm:mt-[45px] mt-[25px] space-y-2 ">
            {propertyData?.exclusions?.map((item, i) => (
              <p
                key={i}
                className="sm:text-[20px] text-subtitle2 leading-[26px] font-light font-roboto  text-secondary "
              >
                <span className="opacity-[70%]">—</span> {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Exclusions;
