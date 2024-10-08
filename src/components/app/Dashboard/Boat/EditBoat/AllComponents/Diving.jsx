import dynamic from "next/dynamic";
import React from "react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Diving = ({ boatData, setBoatData, handleBoatDataChange }) => {
  // console.log(boatData?.diving?.Picture);
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Diving</h1>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-xl font-medium text-gray-900"
            for="divingImage"
          >
            Diving Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="Picture"
            id="divingImage"
            type="file"
            // required={boardData?.diving?.Picture ? false : true}
            // onChange={(e) => handleDivingChange(e)}
            onChange={(e) => handleBoatDataChange(e, "diving")}
          />
          {boatData?.diving?.Picture && (
            <img width={120} className="mt-5" src={boatData?.diving?.Picture} />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="divingDesc"
          >
            Diving Description
          </label>
          {/* <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divingDesc"
            name="description"
            defaultValue={boatData?.diving?.description || ""}
            rows="4"
            required
            onChange={(e) => handleBoatDataChange(e, "diving")}
          /> */}

          <ReactQuill
            id="divingDesc"
            name="description"
            required
            value={boatData?.diving?.description || ""}
            onChange={(value) =>
              handleBoatDataChange(
                { target: { name: "description", value } },
                "diving"
              )
            }
            modules={{ toolbar: false }} // Disable toolbar
            formats={[]} // No formats
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ minHeight: "8rem" }} // To match the textarea rows="4"
          />
        </div>
      </form>
    </div>
  );
};

export default Diving;
