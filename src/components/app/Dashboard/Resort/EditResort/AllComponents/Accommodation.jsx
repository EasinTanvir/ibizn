import { compressAndConvertToBase64 } from "@/src/config/base64";
import dynamic from "next/dynamic";
import React from "react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Accommodation = ({ resortData, handleResortDataChange }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Accommodation</h2>
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            for="accommodationImage"
          >
            Accommodation Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="image"
            id="accommodationImage"
            type="file"
            required={resortData?.accommodation?.image ? false : true}
            // onChange={async (e) =>
            //   setAccommodation({
            //     ...accommodation,
            //     image: await compressAndConvertToBase64(
            //       e.target.files[0],
            //       800,
            //       600,
            //       0.8
            //     ),
            //   })
            // }
            onChange={(e) => handleResortDataChange(e, "accommodation")}
          />
          {resortData?.accommodation?.image && (
            <img
              width={120}
              className="mt-5"
              src={resortData?.accommodation?.image}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="propertyDesc"
          >
            Accommodation Description
          </label>
          {/* <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propertyDesc"
            rows="4"
            name="description"
            defaultValue={resortData?.accommodation?.description}
            required           
            onChange={(e) => handleResortDataChange(e, "accommodation")}
          /> */}
          <ReactQuill
            id="propertyDesc"
            name="description"
            required
            value={resortData?.accommodation?.description || ""}
            onChange={(value) =>
              handleResortDataChange(
                { target: { name: "description", value } },
                "accommodation"
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

export default Accommodation;
