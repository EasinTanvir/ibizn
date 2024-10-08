import { compressAndConvertToBase64 } from "@/src/config/base64";
import dynamic from "next/dynamic";
import React from "react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const FoodAtTheResort = ({ resortData, handleResortDataChange }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Food at the Resort</h2>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-xl font-medium text-gray-900"
            for="foodAttheResortImage"
          >
            Image of plant-based food onboard
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            name="image"
            id="foodAttheResortImage"
            type="file"
            required={resortData?.food?.image ? false : true}
            // onChange={(e) => handleFoodsChange(e)}
            onChange={(e) => handleResortDataChange(e, "food")}
          />
          {resortData?.food?.image && (
            <img width={120} className="mt-5" src={resortData?.food?.image} />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="foodAtTheResortDesc"
          >
            Food Description
          </label>
          {/* <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="foodAtTheResortDesc"
            rows="4"
            name="description"
            defaultValue={resortData?.food?.description}
            required          
            onChange={(e) => handleResortDataChange(e, "food")}
          /> */}

          <ReactQuill
            id="foodAtTheResortDesc"
            name="description"
            required
            value={resortData?.food?.description}
            onChange={(value) =>
              handleResortDataChange(
                { target: { name: "description", value } },
                "food"
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

export default FoodAtTheResort;
