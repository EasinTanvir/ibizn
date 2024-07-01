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
            <AddCircleIcon
              className=" -ml-1 sm:ml-0 text-primary"
              sx={{
                fontSize: "44px",
                color: "#3a95ea",
                stroke: "#ffffff",
                strokeWidth: 0,
              }}
            />
            <h1 className="md:text-[3vw] md:text-[#0080FF]  text-[#0080FF] text-3xl">
              Trip Inclusions
            </h1>
          </div>

          <div className="space-y-8 ">
            {propertyData?.inclusions?.map((item, i) => (
              <p key={i} className="md:text-2xl font-light text-secondary ">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:h-full flex flex-col items-start ">
          <div className="flex it gap-1 items-center mb-3">
            <RemoveCircleIcon
              className="-ml-1 sm:ml-0 text-primary"
              sx={{
                fontSize: "44px",
                color: "#3a95ea",
                stroke: "#ffffff",
                strokeWidth: 0,
              }}
            />
            <h1 className="md:text-[3vw] md:text-[#0080FF]  text-[#0080FF] text-3xl">
              Trip Exclusions
            </h1>
          </div>

          <div className="space-y-8 ">
            {propertyData?.exclusions?.map((item, i) => (
              <p key={i} className="md:text-2xl font-light text-secondary ">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Exclusions;
