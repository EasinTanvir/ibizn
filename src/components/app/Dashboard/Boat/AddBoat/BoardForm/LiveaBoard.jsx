import React from "react";

const LiveaBoard = ({
  handleLiveboarChange,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  boardData,
}) => {
  console.log({ boardData });
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
      <h2 className="my-4 text-xl pb-2 border-b-2 ">Liveaboard</h2>
      {/* divingTitle picture */}
      <form onSubmit={goToNextStep}>
        <div className="my-4">
          <h4 className="block mb-2 text-xl font-medium text-gray-900">
            {" "}
            Boat Image
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
              name="Picture"
              required={boardData?.liveABoard?.Picture ? false : true}
              onChange={(e) => handleLiveboarChange(e)}
            />
          </label>
          {boardData?.liveABoard?.Picture && (
            <img
              width={120}
              className="mt-5"
              src={boardData?.liveABoard?.Picture}
            />
          )}
        </div>
        {/* <div className="mb-4">
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
            required={boardData?.liveABoard?.Picture ? false : true}
            type="file"
            accept=".jpg,.png,.jpeg,.webp"
            onChange={(e) => handleLiveboarChange(e)}
          />
          {boardData?.liveABoard?.Picture && (
            <img width={120} className="mt-5" src={boardData?.liveABoard?.Picture} />
          )}
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl  mb-2"
            htmlFor="divingDesc"
          >
            Boat description
          </label>
          <textarea
            className="shadow appearance-none border  w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divingDesc"
            name="description"
            defaultValue={boardData?.liveABoard?.description || ""}
            required
            rows="4"
            onChange={(e) => handleLiveboarChange(e)}
          />
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

export default LiveaBoard;
