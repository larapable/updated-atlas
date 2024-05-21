"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FinancialDataItem {
  id: number;
  input: string;
  department_id: number;
}

interface FinancialScorecard {
  id: number;
  targetCode: string;
  startDate: Date;
  targetCompletionDate: Date;
  officeTarget: string;
  status: string;
  kpi: string;
  targetPerformance: string;
  actualPerformance: string;
}
export default function Financial() {
  const { data: session, status, update } = useSession();
  console.log("useSession Hook session object", session);
  let user;
  if (session?.user?.name) user = JSON.parse(session?.user?.name as string);
  const department_id = user?.department_id;

  // open modal
  const [financialModalOpen, setFinancialModalOpen] = useState(false);
  // financial values
  const [financialTargetCode, setFinancialTargetCode] = useState("");
  const [financialStartDate, setFinancialStartDate] = useState<Date | null>(
    new Date()
  );
  const [financialTargetCompletionDate, setFinancialTargetCompletionDate] =
    useState<Date | null>(new Date());
  const [financialOfficeTarget, setFinancialOfficeTarget] = useState("");
  const [financialStatus, setFinancialStatus] = useState("");
  const [financialKPI, setFinancialKPI] = useState("");
  const [financialTargetPerformance, setFinancialTargetPerformance] =
    useState("");
  const [financialActualPerformance, setFinancialActualPerformance] =
    useState("");
  const [financialLevelOfAttainment, setFinancialLevelOfAttainment] =
    useState("");
  const [financialSavedScorecards, setFinancialSavedScorecards] = useState<
    FinancialScorecard[]
  >([]);

  const [financialEditMode, setFinancialEditMode] = useState<number | null>(
    null
  ); // Track edit mode

  const handleFinancialCloseModal = () => {
    setFinancialModalOpen(false);
  };
  // mo add ug scorecard : open modal
  const handleFinancialAddMoreScorecard = () => {
    setFinancialEditMode(null);
    setFinancialModalOpen(true);
  };

  // to get the level of attainment kay you need to divide actual performance to target performance and need sad siya percentage
  // wala pa na apply
  const calculateFinancialLevelOfAttainment = (
    actualFinancialPerformance: number,
    targetFinancialPerformance: number
  ): string => {
    const levelOfAttainmentFinancial =
      (actualFinancialPerformance / targetFinancialPerformance) * 100;
    return levelOfAttainmentFinancial.toFixed(2) + "%";
  };

  // displays the updated level of attainment base sa actual performance
  const handleFinancialActualPerformanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newActualPerformanceFinancial = parseFloat(e.target.value); // Parse the input value to a number
    setFinancialActualPerformance(newActualPerformanceFinancial.toString()); // Update the state with the parsed value
    const newLevelOfAttainmentFinancial = calculateFinancialLevelOfAttainment(
      newActualPerformanceFinancial,
      parseFloat(financialTargetPerformance)
    );
    setFinancialLevelOfAttainment(newLevelOfAttainmentFinancial.toString());
  };

  // Save Financial Inputs
  const handleFinancialSaveScorecard = async () => {
    // Check if all fields are filled
    if (
      !financialTargetCode ||
      !financialStartDate ||
      !financialTargetCompletionDate ||
      !financialOfficeTarget ||
      !financialTargetPerformance ||
      !financialStatus ||
      !financialKPI ||
      !financialActualPerformance
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send the POST request to the server
      const response = await fetch("/api/financial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department_id: department_id, // Ensure you have this variable defined or passed in
          target_code: financialTargetCode,
          office_target: financialOfficeTarget,
          start_date: financialStartDate,
          completion_date: financialTargetCompletionDate,
          status: financialStatus,
          key_performance_indicator: financialKPI,
          target_performance: financialTargetPerformance,
          actual_performance: financialActualPerformance,
        }),
      });

      // Parse the JSON response
      const result = await response.json();

      // Handle the response based on the status code
      if (response.ok) {
        console.log("Financial scorecard data submitted successfully:", result);
        // Perform any success actions, like state updates or alerts
        // Update the state to include the new scorecard
        setFinancialSavedScorecards([...financialSavedScorecards, result.data]);
      } else {
        console.error(
          "Failed to submit financial scorecard data:",
          result.message
        );
        // Perform any error actions, like alerts or state updates
      }
    } catch (error) {
      console.error("Error submitting financial scorecard data:", error);
      // Handle network errors here
    }

    // Reset modal state for the next input
    setFinancialModalOpen(false);
  };

  const [financialData, setFinancialData] = useState<FinancialDataItem[]>([]);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(`../api/getFinancialBSC/${department_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch financial data");
        }
        const data = await response.json();
        setFinancialData(data.financial_entity);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchFinancialData();
  }, [department_id]);

  // edit sa financial scorecard to be implemented by Arziel
  // const handleFinancialEditScorecard = (index: number) => {
  //   const FinancialScorecardData = financialSavedScorecards[index]
  //     .split(" ")
  //     .map((item) => item.trim());
  //   setFinancialTargetCode(FinancialScorecardData[0]);
  //   setFinancialStartDate(new Date(FinancialScorecardData[1]));
  //   setFinancialTargetCompletionDate(new Date(FinancialScorecardData[2]));
  //   setFinancialOfficeTarget(FinancialScorecardData[3]);
  //   setFinancialTargetPerformance(FinancialScorecardData[4]);
  //   setFinancialStatus(FinancialScorecardData[5]);
  //   setFinancialKPI(FinancialScorecardData[6]);
  //   setFinancialActualPerformance(FinancialScorecardData[7]);
  //   setFinancialLevelOfAttainment(FinancialScorecardData[8]);

  //   setFinancialModalOpen(true);
  //   setFinancialEditMode(index);
  // };

  return (
    <div className="flex flex-col">
      <div className="rounded-[0.3rem] bg-[#8A252C] relative flex flex-row justify-between pt-2 pl-3 pb-2 w-[100%]">
        <span className="m-[0_0.8rem_0_0] w-[58.7rem] break-words font-bold text-[1.3rem] text-[#FFFFFF]">
          Financial Scorecard Overview
        </span>
      </div>
      <div className="flex flex-row self-start box-sizing-border mt-5 mb-5">
        {/* Add More Scorecard Button */}
        <button
          className="flex flex-row break-words font-normal text-[1rem] text-[#686666]"
          onClick={handleFinancialAddMoreScorecard}
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
        {financialData &&
          financialData.length > 0 &&
          financialData.map((item) => {
            const parsedLevelOfAttainment = parseFloat(
              financialLevelOfAttainment
            ); // Convert to a number

            // Validate and limit the values to the range of 1-100
            const validatedTargetPerformance = Math.min(
              Math.max(parseInt(financialTargetPerformance), 1),
              100
            );
            const validatedActualPerformance = Math.min(
              Math.max(parseInt(financialActualPerformance), 1),
              100
            );
            const validatedLevelOfAttainment = Math.min(
              Math.max(parseFloat(financialLevelOfAttainment), 1),
              100
            );

            const progressColor =
              validatedLevelOfAttainment >= 50 ? "bg-green-500" : "bg-red-500";
            const progressBarWidth = `${
              (validatedLevelOfAttainment / 100) * 20
            }rem`; // Adjust the width of the progress bar

            return (
              <div
                key={item.id}
                className="bg-[#ffffff] relative ml-2 flex flex-row pt-4 pb-4 w-[100rem] h-auto box-sizing-border"
              >
                <div className="mr-5 gap-10">
                  <p className="flex flex-row">
                    <div className="w-[57rem] flex flex-row">
                      <span className="font-bold bg-yellow-200 pt-2 pb-2 pr-1 pl-2 text-[#962203] mt-[-0.5rem] mr-3 ml-1">
                        {item.id}:{" "}
                      </span>
                      <span className="font-regular">
                        {item.input.length > 60
                          ? `${item.input.substring(0, 60)}...`
                          : item.input}{" "}
                      </span>
                    </div>
                    <div className="flex items-center w-[35rem]">
                      <span className="font-regular mr-5 ml-10">
                        {financialTargetCompletionDate
                          ? financialTargetCompletionDate.toLocaleDateString()
                          : ""}
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
                        {financialStatus}{" "}
                      </div>
                    </div>
                  </p>
                </div>
                <button /*onClick={() => handleFinancialEditScorecard(index)}*/>
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

      {financialModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 h-[50rem] w-[96rem]">
            <div className="flex flex-row">
              <h2 className="text-2xl mb-10 font-semibold">Financial</h2>
              <button
                onClick={handleFinancialCloseModal}
                className="ml-[85rem] mt-[-5rem] text-gray-500 hover:text-gray-700"
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
                  value={financialTargetCode}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[25rem]"
                  onChange={(e) => setFinancialTargetCode(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Start Date
                </span>
                <DatePicker
                  selected={financialStartDate}
                  onChange={(date) => setFinancialStartDate(date)}
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
                  selected={financialTargetCompletionDate}
                  onChange={(date) => setFinancialTargetCompletionDate(date)}
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
              value={financialOfficeTarget}
              className="border border-gray-300 px-3 py-2 pl-2 pr-2 mt-1 rounded-lg w-[91rem] h-[10rem]"
              onChange={(e) => setFinancialOfficeTarget(e.target.value)}
            />
            <div className=" mt-10 flex flex-row gap-36">
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Status
                  <span className="text-[#DD1414]">*</span>
                </span>
                <select
                  value={financialStatus}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  onChange={(e) => setFinancialStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
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
                  value={financialKPI}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  onChange={(e) => setFinancialKPI(e.target.value)}
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
                  value={financialTargetPerformance}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  min="1"
                  max="100"
                  onChange={(e) =>
                    setFinancialTargetPerformance(e.target.value)
                  }
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
                  value={financialActualPerformance}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  min="1"
                  max="100"
                  onChange={handleFinancialActualPerformanceChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mt-10 gap-10">
              <button
                onClick={handleFinancialSaveScorecard}
                className="bg-[#FAD655] text-[#962203] font-semibold hover:bg-white border hover:border-yellow-500 px-4 py-2 mt-4 rounded-lg w-40"
              >
                {financialEditMode ? "Edit" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
