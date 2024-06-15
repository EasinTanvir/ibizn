import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const ResortOrderedSchedule = ({ packagess }) => {
  console.log(packagess);
  const schedule = {};
  return (
    <div>
      <h1 className="text-3xl font-semibold  my-3">Ordered Packages</h1>
      <div className="space-y-3">
        <h1 className="font-semibold text-slate-800">
          Package Name : <span>{packagess?.packageName}</span>
        </h1>
        <h1 className="font-semibold text-slate-800">
          Number Of Day : <span>{packagess?.numberOfDay}</span>
        </h1>
        <h1 className="font-semibold text-slate-800">
          Number Of Night : <span>{packagess?.numberOfNight}</span>
        </h1>
        <h1 className="font-semibold text-slate-800">
          Room Type : <span>{packagess?.roomType}</span>
        </h1>
        <h1 className="font-semibold text-slate-800">
          Full Board :{" "}
          <span>
            {packagess?.fullBoard ? (
              <CheckIcon />
            ) : (
              <ClearIcon className="text-rose-800 text-xl" />
            )}
          </span>
        </h1>
        <h1 className="font-semibold text-slate-800">
          Break Fast :{" "}
          <span>
            {packagess?.breakfast ? (
              <CheckIcon />
            ) : (
              <ClearIcon className="text-rose-800 text-xl" />
            )}
          </span>
        </h1>
        <h1 className="font-semibold text-slate-800">
          Price : <span>{packagess?.price}</span>
        </h1>
      </div>
    </div>
  );
};

export default ResortOrderedSchedule;
