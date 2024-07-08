import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function Exclusions({ propertyData }) {
  console.log();
  return (
    <>
      <div className="  customContainer py-5 flex flex-col md:flex-row  justify-between gap-8  md:gap-12   md:py-20 md:bg-white px-4 lg:px-0">
        <div className="md:w-1/2 md:h-full flex flex-col items-start">
          <div className="flex gap-1 items-center mb-3">
            <img className="w-10" src="/as14.svg" alt="" />
            <h1 className="md:text-[3vw] md:text-[#0080FF]  text-[#0080FF] text-3xl">
              Trip Inclusions
            </h1>
          </div>

          <div className="md:space-y-4  space-y-2">
            {propertyData?.inclusions?.map((item, i) => (
              <p key={i} className="text-xl font-light text-secondary ">
                <span className="opacity-[70%]">—</span> {item}
              </p>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:h-full flex flex-col items-start ">
          <div className="flex it gap-1 items-center mb-3">
            <img className="w-10" src="/as15.svg" alt="" />
            <h1 className="md:text-[3vw] md:text-[#0080FF]  text-[#0080FF] text-3xl">
              Trip Exclusions
            </h1>
          </div>

          <div className="md:space-y-4  space-y-2">
            {propertyData?.exclusions?.map((item, i) => (
              <p key={i} className="text-xl font-light text-secondary ">
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
