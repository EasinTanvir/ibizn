import React from "react";

const EnvQAndA = ({ submitData, boatData, setBoatData, handleEnvChange }) => {
  console.log(boatData);
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">
        Environmental Questions (Kindly enter N/A if not applicable)
      </h1>
      <form onSubmit={submitData}>
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
            defaultValue={boatData?.environmentalQuestions?.q1 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q2 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q3 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q4 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q5 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q6 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q7 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q8 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
        <h2 className="my-5 text-xl pb-2 border-b-2">
          Plant-based | Vegan Meal Questions (Kindly enter N/A if not
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
            defaultValue={boatData?.environmentalQuestions?.q9 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q10 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q11 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q12 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q1 || ""}
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
            defaultValue={boatData?.environmentalQuestions?.q14 || ""}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => handleEnvChange(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default EnvQAndA;
