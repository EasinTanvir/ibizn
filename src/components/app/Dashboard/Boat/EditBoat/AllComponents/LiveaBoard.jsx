import dynamic from "next/dynamic";
import React from "react";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const LiveaBoard = ({ boatData, setBoatData, handleBoatDataChange }) => {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">LiveaBoard</h1>
      {/* divingTitle picture */}
      <form>
        <div className="mb-4">
          <label
            className="block mb-2 text-xl font-medium text-gray-900"
            for="divingImage"
          >
            LiveaBoard Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
            name="Picture"
            id="divingImage"
            required={boatData?.liveABoard?.Picture ? false : true}
            type="file"
            // onChange={(e) => handleLiveboarChange(e)}
            onChange={(e) => handleBoatDataChange(e, "liveABoard")}
          />
          {boatData?.liveABoard?.Picture && (
            <img
              width={120}
              className="mt-5"
              src={boatData?.liveABoard?.Picture}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="divingDesc"
          >
            LiveaBoard Description
          </label>
          <ReactQuill
            id="divingDesc"
            name="description"
            required
            value={boatData?.liveABoard?.description || ""}
            onChange={(value) =>
              handleBoatDataChange(
                { target: { name: "description", value } },
                "liveABoard"
              )
            }
            modules={{ toolbar: false }} // Disable toolbar
            formats={[]} // No formats
            className="shadow appearance-none border w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ minHeight: "8rem" }} // To match the textarea rows="4"
          />
          {/* <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divingDesc"
            name="description"
            defaultValue={boatData?.liveABoard?.description || ""}
            required
            rows="4"          
            onChange={(e) => handleBoatDataChange(e, "liveABoard")}
          /> */}
        </div>
      </form>
    </div>
  );
};

export default LiveaBoard;
