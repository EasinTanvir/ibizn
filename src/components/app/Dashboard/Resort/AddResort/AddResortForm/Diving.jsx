import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const Diving = ({
  handleDivingChange,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  resortData,
}) => {
  console.log({ resortData });
  // go to next step ------------
  const goToNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };
  // go to previous step ------------
  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };
  return (
    <>
      <h2 className="my-4 text-xl pb-2 border-b-2">Diving</h2>
      {/* divingTitle picture */}
      <form onSubmit={goToNextStep}>
        <div className="my-4">
          <h4 className="block mb-2 text-xl font-medium text-gray-900">
            {" "}
            Diving Image{" "}
            <span className="font-normal">
              (Please upload 3:2 sized images or it will be automatically
              cropped)
            </span>
          </h4>
          <label className=" flex gap-4 w-full items-center px-4 py-2 bg-white text-blue rounded-lg border  tracking-wide uppercase  cursor-pointer ">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              accept=".jpg,.png,.jpeg,.webp"
              name="image"
              required={resortData?.diving?.image ? false : true}
              onChange={(e) => handleDivingChange(e)}
            />
          </label>
          {resortData?.diving?.image && (
            <img width={120} className="mt-5" src={resortData?.diving?.image} />
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-[20px] font-normal mb-2 font-roboto"
            htmlFor="divingDesc"
          >
            Diving Descriptions
          </label>
          <ReactQuill
            className="shadow appearance-none border h-40  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divingDesc"
            name="description"
            required
            modules={{
              toolbar: false,
            }}
            value={resortData?.diving?.description}
            onChange={(value) =>
              handleDivingChange({ target: { name: "description", value } })
            }
            theme="snow" // This is the default theme; you can customize it as needed
          />
          {/* <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divingDesc"
            name="description"
            defaultValue={resortData?.diving?.description}
            rows="4"
            required
            onChange={(e) => handleDivingChange(e)}
          /> */}
        </div>
        <div className="flex justify-between mt-10">
          {currentStep > 1 && (
            <button
              onClick={goToPrevStep}
              className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              // onClick={submitData}
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Diving;
