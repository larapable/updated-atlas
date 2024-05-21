"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Learning() {
  // learning & growth
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [learningTargetCode, setLearningTargetCode] = useState("");
  const [learningStartDate, setLearningStartDate] = useState<Date | null>(null);
  const [learningTargetCompletionDate, setLearningTargetCompletionDate] =
    useState<Date | null>(null);
  const [learningOfficeTarget, setLearningOfficeTarget] = useState("");
  const [learningTargetPerformance, setLearningTargetPerformance] =
    useState("");
  const [learningStatus, setLearningStatus] = useState("");
  const [learningActualPerformance, setLearningActualPerformance] =
    useState("");
  const [learningLevelOfAttainment, setLearningLevelOfAttainment] =
    useState("");
  const [learningSavedScorecards, setLearningSavedScorecards] = useState<
    string[]
  >([]);
  const [learningEditMode, setLearningEditMode] = useState<number | null>(null);
  const [learningKPI, setLearningKPI] = useState("");

  const handleLearningCloseModal = () => {
    setLearningModalOpen(false);
  };

  const handleLearningAddMoreScorecard = () => {
    setLearningEditMode(null);
    setLearningModalOpen(true);
    setLearningTargetCode("");
    setLearningStartDate(null);
    setLearningTargetCompletionDate(null);
    setLearningOfficeTarget("");
    setLearningTargetPerformance("");
    setLearningStatus("");
    setLearningKPI("");
    setLearningActualPerformance("");
    setLearningLevelOfAttainment("");
  };

  const calculateLearningLevelOfAttainment = (
    actualLearningPerformance: number,
    targetLearningPerformance: number
  ): string => {
    const levelOfAttainmentLearning =
      (actualLearningPerformance / targetLearningPerformance) * 100;
    return levelOfAttainmentLearning.toFixed(2) + "%";
  };

  const handleLearningActualPerformanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newActualPerformanceLearning = parseFloat(e.target.value); // Parse the input value to a number
    setLearningActualPerformance(newActualPerformanceLearning.toString()); // Update the state with the parsed value
    const newLevelOfAttainmentLearning = calculateLearningLevelOfAttainment(
      newActualPerformanceLearning,
      parseFloat(learningTargetPerformance)
    );
    setLearningLevelOfAttainment(newLevelOfAttainmentLearning.toString());
  };

  const handleLearningSaveScorecard = () => {
    if (
      !learningTargetCode ||
      !learningStartDate ||
      !learningTargetCompletionDate ||
      !learningOfficeTarget ||
      !learningTargetPerformance ||
      !learningStatus ||
      !learningKPI ||
      !learningActualPerformance
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const parsePercentageLearning = (percentage: string) => {
      const parsedPercentageLeaning = parseFloat(percentage.replace("%", ""));
      return isNaN(parsedPercentageLeaning) ? 0 : parsedPercentageLeaning;
    };

    const actualLearningPerformance = parsePercentageLearning(
      learningActualPerformance
    );
    const targetLearningPerformance = parsePercentageLearning(
      learningTargetPerformance
    );

    if (learningEditMode !== null) {
      const learningFormatDateString = (date: Date | null) => {
        return date ? date.toISOString().split("T")[0] : "N/A";
      };
      const learningUpdatedScorecard = `${learningTargetCode} ${learningFormatDateString(
        learningStartDate
      )} ${learningFormatDateString(
        learningTargetCompletionDate
      )} ${learningOfficeTarget} ${learningTargetPerformance} ${learningStatus} ${learningKPI} ${learningActualPerformance} ${calculateLearningLevelOfAttainment(
        parseFloat(learningActualPerformance),
        parseFloat(learningTargetPerformance)
      )}`;

      const learningUpdatedScorecards = learningSavedScorecards.map(
        (Scorecard, index) => {
          if (index === learningEditMode) {
            return learningUpdatedScorecard;
          } else {
            return Scorecard;
          }
        }
      );
      setLearningSavedScorecards(learningUpdatedScorecards);
    } else {
      const learningFormatDateString = (date: Date | null) => {
        return date ? date.toISOString().split("T")[0] : "N/A";
      };
      const learningNewScorecard = `${learningTargetCode} ${learningFormatDateString(
        learningStartDate
      )} ${learningFormatDateString(
        learningTargetCompletionDate
      )} ${learningOfficeTarget} ${learningTargetPerformance} ${learningStatus} ${learningKPI} ${learningActualPerformance} ${calculateLearningLevelOfAttainment(
        parseFloat(learningActualPerformance),
        parseFloat(learningTargetPerformance)
      )}`;
      setLearningSavedScorecards([
        ...learningSavedScorecards,
        learningNewScorecard,
      ]);
    }

    setLearningModalOpen(false);
    setLearningEditMode(null);
    setLearningTargetCode("");
    setLearningStartDate(null);
    setLearningTargetCompletionDate(null);
    setLearningOfficeTarget("");
    setLearningTargetPerformance("");
    setLearningStatus("");
    setLearningKPI("");
    setLearningActualPerformance("");
    setLearningLevelOfAttainment("");
  };

  const handleLearningEditScorecard = (index: number) => {
    const LearningScorecardData = learningSavedScorecards[index]
      .split(" ")
      .map((item) => item.trim());
    setLearningTargetCode(LearningScorecardData[0]);
    setLearningStartDate(new Date(LearningScorecardData[1]));
    setLearningTargetCompletionDate(new Date(LearningScorecardData[2]));
    setLearningOfficeTarget(LearningScorecardData[3]);
    setLearningTargetPerformance(LearningScorecardData[4]);
    setLearningStatus(LearningScorecardData[5]);
    setLearningKPI(LearningScorecardData[6]);
    setLearningActualPerformance(LearningScorecardData[7]);
    setLearningLevelOfAttainment(LearningScorecardData[8]);

    setLearningModalOpen(true);
    setLearningEditMode(index);
  };
  
  return (
    <div className="flex flex-col">
      <div className="rounded-[0.3rem] bg-[#8A252C] relative flex flex-row justify-between pt-2 pl-3 pb-2 w-[100%]">
        <span className="m-[0_0.8rem_0_0] w-[58.7rem] break-words font-bold text-[1.3rem] text-[#FFFFFF]">
          Learning & Growth Scorecard Overview
        </span>
      </div>
      <div className="flex flex-row self-start box-sizing-border mt-5 mb-5">
        {/* Add More Scorecard Button */}
        <button
          className="flex flex-row break-words font-normal text-[1rem] text-[#686666]"
          onClick={handleLearningAddMoreScorecard}
        >
          <div className="text-[#EFAF21] mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="mt-1">Add more objectives</div>
        </button>
        {/* Other perspective toggles */}
      </div>
      <div className="bg-[#ffffff] gap-2 w-[100%] h-[100%] flex flex-col pt-4 pr-3 pb-6 box-sizing-border rounded-lg border border-yellow-500 overflow-y-auto overflow-x-hidden">
        {learningSavedScorecards.map((Scorecard, index) => {
          const [
            learningTargetCode,
            learningStartDate,
            learningTargetCompletionDate,
            learningOfficeTarget,
            learningTargetPerformance,
            learningStatus,
            learningKPI,
            learningActualPerformance,
            learningLevelOfAttainment,
          ] = Scorecard.split(" ");
          const parsedLevelOfAttainment = parseFloat(learningLevelOfAttainment); // Convert to a number

          // Validate and limit the values to the range of 1-100
          const validatedTargetPerformance = Math.min(
            Math.max(parseInt(learningTargetPerformance), 1),
            100
          );
          const validatedActualPerformance = Math.min(
            Math.max(parseInt(learningActualPerformance), 1),
            100
          );
          const validatedLevelOfAttainment = Math.min(
            Math.max(parseFloat(learningLevelOfAttainment), 1),
            100
          );

          const progressColor =
            validatedLevelOfAttainment >= 50 ? "bg-green-500" : "bg-red-500";
          const progressBarWidth = `${
            (validatedLevelOfAttainment / 100) * 20
          }rem`; // Adjust the width of the progress bar

          return (
            <div
              key={index}
              className="bg-[#ffffff] relative ml-2 flex flex-row pt-4 pb-4 w-[100rem] h-auto box-sizing-border"
            >
              <div className="mr-5 gap-10">
                <p className="flex flex-row">
                  <div className="w-[57rem] flex flex-row">
                    <span className="font-bold bg-yellow-200 pt-2 pb-2 pr-1 pl-2 text-[#962203] mt-[-0.5rem] mr-3 ml-1">
                      {learningTargetCode}:{" "}
                    </span>
                    <span className="font-regular">
                      {learningOfficeTarget.length > 60
                        ? `${learningOfficeTarget.substring(0, 60)}...`
                        : learningOfficeTarget}{" "}
                    </span>
                  </div>
                  <div className="flex items-center w-[35rem]">
                    <span className="font-regular mr-5 ml-10">
                      {learningTargetCompletionDate}{" "}
                    </span>
                    <div
                      className={`h-5 ${progressColor}`}
                      style={{ width: progressBarWidth }}
                    ></div>
                  </div>
                  <div className="flex items-center ml-[-3rem]">
                    <span className="font-bold ">
                      {validatedLevelOfAttainment}%{" "}
                    </span>
                    <div className="font-bold border rounded-lg bg-yellow-200 border-yellow-500 pt-1 pr-2 pl-2 ml-5 mt-[-0.5rem]  ">
                      {learningStatus}{" "}
                    </div>
                  </div>
                </p>
              </div>
              <button onClick={() => handleLearningEditScorecard(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      {learningModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 h-[50rem] w-[96rem]">
            <div className="flex flex-row">
              <h2 className="text-2xl mb-10 font-semibold">
                Learning & Growth
              </h2>
              <button
                onClick={handleLearningCloseModal}
                className="ml-[77rem] mt-[-5rem] text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row gap-32 mb-10">
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Target Code
                  <span className="text-[#DD1414]">*</span>
                </span>
                <input
                  type="text"
                  value={learningTargetCode}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[25rem]"
                  onChange={(e) => setLearningTargetCode(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Start Date
                </span>
                <DatePicker
                  selected={learningStartDate}
                  onChange={(date) => setLearningStartDate(date)}
                  minDate={new Date()}
                  placeholderText="YYYY-MM-DD"
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[25rem]"
                />
              </div>
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Target Completion Date
                </span>
                <DatePicker
                  selected={learningTargetCompletionDate}
                  onChange={(date) => setLearningTargetCompletionDate(date)}
                  minDate={new Date()}
                  placeholderText="YYYY-MM-DD"
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[25rem]"
                />
              </div>
            </div>
            <span className="mr-3 break-words font-regular text-md text-[#000000] mt-10">
              Office Target
              <span className="text-[#DD1414]">*</span>
            </span>
            <textarea
              value={learningOfficeTarget}
              className="border border-gray-300 px-3 py-2 pl-2 pr-2 mt-1 rounded-lg w-[91rem] h-[10rem]"
              onChange={(e) => setLearningOfficeTarget(e.target.value)}
            />
            <div className=" mt-10 flex flex-row gap-36">
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Status
                  <span className="text-[#DD1414]">*</span>
                </span>
                <select
                  value={learningStatus}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  onChange={(e) => setLearningStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Uninitiated">Uninitiated</option>
                  <option value="Initiated">Initiated</option>
                  <option value="Achieved">Achieved</option>
                </select>
              </div>
              {/* add KPI here */}
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Key Performance Indicator
                  <span className="text-[#DD1414]">*</span>
                </span>
                <input
                  type="text"
                  value={learningKPI}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  onChange={(e) => setLearningKPI(e.target.value)}
                />
              </div>
            </div>
            <div className=" mt-10 flex flex-row gap-36">
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Target Performance
                  <span className="text-[#DD1414]">*</span>
                </span>
                <span className="mr-3 break-words font-regular italic text-sm text-[#2c2c2c]">
                  Please enter the target performance as a percentage without
                  including the '%' symbol.
                </span>
                <input
                  type="number"
                  value={learningTargetPerformance}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  min="1"
                  max="100"
                  onChange={(e) => setLearningTargetPerformance(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Actual Performance
                  <span className="text-[#DD1414]">*</span>
                </span>
                <span className="mr-3 break-words font-regular italic text-sm text-[#2c2c2c]">
                  Please enter the actual performance as a percentage without
                  including the '%' symbol.
                </span>
                <input
                  type="number"
                  value={learningActualPerformance}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  min="1"
                  max="100"
                  onChange={handleLearningActualPerformanceChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mt-10 gap-10">
              <button
                onClick={handleLearningSaveScorecard}
                className="bg-[#FAD655] text-[#962203] font-semibold hover:bg-white border hover:border-yellow-500 px-4 py-2 mt-4 rounded-lg w-40"
              >
                {learningEditMode ? "Edit" : "Save"}
              </button>
              <button className="bg-[#FAD655] text-[#962203] font-semibold hover:bg-white border hover:border-yellow-500 px-4 py-2 mt-4 rounded-lg w-40">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
