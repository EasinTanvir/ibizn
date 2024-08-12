import { React, useContext } from "react";
import { userContext } from "@/src/storage/contextApi";
import { ClipLoader } from "react-spinners";

const EnvQAndA = ({
  handleEnvChange,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  submitData,
  boardData,
}) => {
  console.log({ boardData });
  const { submitLoader, setSubmitLoader } = useContext(userContext);
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
    <div>
      <h2 className="my-4 text-xl pb-2 border-b-2">
        Environmental (Kindly enter N/A if not applicable)
      </h2>

      <form onSubmit={goToNextStep}>
        <div className="mb-4">
          <label
            htmlFor="q1"
            className="block text-sm font-medium text-gray-700"
          >
            Which conservation organisations do you support?
          </label>
          <input
            type="text"
            id="q1"
            name="q1"
            defaultValue={boardData?.environmentalQuestionSchema?.q1 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q2"
            className="block text-sm font-medium text-gray-700"
          >
            Which efforts do you take to minimise negative environmental impact?
          </label>
          <input
            type="text"
            id="q2"
            name="q2"
            defaultValue={boardData?.environmentalQuestionSchema?.q2 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q3"
            className="block text-sm font-medium text-gray-700"
          >
            Which responsible diving practices are followed?
          </label>
          <input
            type="text"
            id="q3"
            required
            name="q3"
            defaultValue={boardData?.environmentalQuestionSchema?.q3 || ""}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q4"
            className="block text-sm font-medium text-gray-700"
          >
            Which sustainable practices do you follow?
          </label>
          <input
            type="text"
            id="q4"
            name="q4"
            defaultValue={boardData?.environmentalQuestionSchema?.q4 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q5"
            className="block text-sm font-medium text-gray-700"
          >
            Do you make any environmental impact assessments?
          </label>
          <input
            type="text"
            id="q5"
            name="q5"
            defaultValue={boardData?.environmentalQuestionSchema?.q5 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q6"
            className="block text-sm font-medium text-gray-700"
          >
            Which community initiatives are you involved in?
          </label>
          <input
            type="text"
            id="q6"
            required
            name="q6"
            defaultValue={boardData?.environmentalQuestionSchema?.q6 || ""}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q7"
            className="block text-sm font-medium text-gray-700"
          >
            Which sustainable tourism initiatives are you involved in?
          </label>
          <input
            type="text"
            id="q7"
            name="q7"
            defaultValue={boardData?.environmentalQuestionSchema?.q7 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="q8"
            className="block text-sm font-medium text-gray-700"
          >
            Do you have any self-authored or self-created environmental
            projects?
          </label>
          <input
            type="text"
            id="q8"
            name="q8"
            defaultValue={boardData?.environmentalQuestionSchema?.q8 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <h2 className="my-5 text-xl pb-2 border-b-2">
          Plant-based | Vegan food and Adapted Diets (Kindly enter N/A if not
          applicable)
        </h2>

        <div className="mb-4">
          <label
            htmlFor="q9"
            className="block text-sm font-medium text-gray-700"
          >
            Do you provide plant-based meals for vegans or those on adapted
            diets?
          </label>
          <input
            type="text"
            id="q9"
            name="q9"
            defaultValue={boardData?.environmentalQuestionSchema?.q9 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q10"
            className="block text-sm font-medium text-gray-700"
          >
            Do you have a separate, plant-based menu?
          </label>
          <input
            type="text"
            id="q10"
            name="q10"
            defaultValue={boardData?.environmentalQuestionSchema?.q10 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q11"
            className="block text-sm font-medium text-gray-700"
          >
            Can you give examples of your kitchen’s finest, plant-based dishes?
          </label>
          <input
            type="text"
            id="q11"
            name="q11"
            defaultValue={boardData?.environmentalQuestionSchema?.q11 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q12"
            className="block text-sm font-medium text-gray-700"
          >
            Do you provide plant-based milk?
          </label>
          <input
            type="text"
            id="q12"
            name="q12"
            defaultValue={boardData?.environmentalQuestionSchema?.q12 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q13"
            className="block text-sm font-medium text-gray-700"
          >
            For full board packages, how many days can you provide a changing or
            revolving, plant-based menu for?
          </label>
          <input
            type="text"
            id="q13"
            name="q13"
            defaultValue={boardData?.environmentalQuestionSchema?.q13 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="q14"
            className="block text-sm font-medium text-gray-700"
          >
            Which ‘protein’ alternatives can you, or do you usually provide?
          </label>
          <input
            type="text"
            id="q14"
            name="q14"
            defaultValue={boardData?.environmentalQuestionSchema?.q14 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
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
              disabled={submitLoader}
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              {submitLoader ? <ClipLoader color="#ffff" /> : "Finish"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnvQAndA;
