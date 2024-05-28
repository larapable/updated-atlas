"use client";
import { LinearScale } from "chart.js";
import Chart from "chart.js/auto";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { toast } from "react-toastify";
// Register linear scale with Chart.js
Chart.register(LinearScale);

interface FinancialReport {
  id: number;
  title: string;
  dateCreated: Date | null;
  description: string;
  objectives: string[];
}
interface FinancialScorecard {
  id: number;
  target_code: string;
  start_date: Date;
  completion_date: Date;
  office_target: string;
  status: string;
  key_performance_indicator: string;
  target_performance: string;
  actual_performance: string;
}
export default function FinancialReport() {
  const { data: session } = useSession();

  let user;
  if (session?.user?.name) user = JSON.parse(session.user?.name as string);
  const department_id = user?.department_id;
  console.log(department_id);
  const username = user?.username;

  const [financialModalOpenReport, setFinancialModalOpenReport] =
    useState(false);
  const [financialID, setFinancialID] = useState(0); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  const [financialTitleReport, setFinancialTitleReport] = useState("");
  const [financialDateReport, setFinancialDateReport] = useState<Date | null>(
    null
  );
  const [financialDescriptionReport, setFinancialDescriptionReport] =
    useState("");
  const [
    financialSelectedObjectivesReport,
    setFinancialSelectedObjectivesReport,
  ] = useState<string[]>([]);
  const [isFinancialEditModeReport, setIsFinancialEditModeReport] =
    useState(false);
  const [financialReports, setFinancialReports] = useState<FinancialReport[]>(
    []
  );
  const [editingFinancialReport, setEditingFinancialReport] =
    useState<FinancialReport | null>(null);

  const handleCloseModalFinancialReport = () => {
    setFinancialModalOpenReport(false);
  };

  const handleAddMoreFinancialReport = () => {
    setFinancialModalOpenReport(true);
    setFinancialTitleReport("");
    setFinancialDateReport(null);
    setFinancialDescriptionReport("");
    setFinancialSelectedObjectivesReport([]);
    setIsFinancialEditModeReport(false);
  };

  const handleSaveFinancialReport = async () => {
    if (editingFinancialReport) {
      try {
        const id = financialID;
        const data = {
          title: financialTitleReport,
          //dateCreated: financialDateReport?.toISOString(),
          description: financialDescriptionReport,
          objectives: financialSelectedObjectivesReport,
          department_id: department_id,
        };
        //console.log("financial date: ", financialDateReport);
        const response = await fetch(`/api/report/financial/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // Send the updated report object
        });

        if (!response.ok) {
          throw new Error("Failed to update financial report");
        }

        // Handle success (e.g., display a success message)
        console.log("Financial report updated successfully");
        getAllFinancial(department_id);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error("Error updating financial report:", error);
      }
    } else {
      // Create a new report
      if (
        !financialDateReport ||
        !financialTitleReport ||
        !financialDescriptionReport ||
        financialSelectedObjectivesReport.length === 0
      ) {
        toast.error("Please fill out all the fields.");
        return;
      }

      try {
        const data = {
          title: financialTitleReport,
          dateCreated: financialDateReport?.toISOString(),
          description: financialDescriptionReport,
          objectives: financialSelectedObjectivesReport,
          department_id: department_id,
        };
        console.log("financial date: ", financialDateReport);
        const response = await fetch("/api/report/financial", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // Send the new report object
        });

        if (!response.ok) {
          throw new Error("Failed to create financial report");
        }
        getAllFinancial(department_id);

        // Handle success (e.g., display a success message)
        console.log("Financial report created successfully");
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error("Error creating financial report:", error);
      }
    }
    setFinancialModalOpenReport(false);
    setIsFinancialEditModeReport(false);
    setEditingFinancialReport(null);
  };

  const handleEditFinancialReport = (report: FinancialReport) => {
    // Set the modal variables with the selected report's data
    setEditingFinancialReport(report);
    setFinancialTitleReport(report.title);
    setFinancialDateReport(null);
    setFinancialDescriptionReport(report.description);
    setFinancialSelectedObjectivesReport(report.objectives);
    setFinancialID(report.id);
    setFinancialModalOpenReport(true);
    setIsFinancialEditModeReport(true);
  };

  const handleDeleteFinancialReport = async (report: FinancialReport) => {
    try {
      const response = await fetch(`/api/report/financial/${report.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete financial report");
      }

      // Handle success (e.g., display a success message)
      console.log("Financial report deleted successfully");
      getAllFinancial(department_id);
      toast.success("Financial report deleted successfully");
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error deleting financial report:", error);
    }
  };

  const getAllFinancial = async (department_id: number) => {
    if (!department_id) {
      console.log("Department ID is not available yet.");
      return;
    }
    try {
      const response = await fetch(`/api/report/financial/${department_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch financial reports");
      }
      const data = await response.json();
      console.log("response data:", data);

      setFinancialReports(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching financial reports:", error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    console.log("Selected Start Date", date);
    if (date) {
      // Convert the selected date to UTC before saving it
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      setFinancialDateReport(utcDate);
    } else {
      setFinancialDateReport(null);
    }
  };

  useEffect(() => {
    getAllFinancial(department_id);
  }, [department_id, session]);

  const handleObjectiveChangeFinancial = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setFinancialSelectedObjectivesReport(selectedValues);
  };

  useEffect(() => {
    console.log("useEffect triggered"); // Check if this log appears

    const chartElement = document.getElementById(
      "chart"
    ) as HTMLCanvasElement | null;
    if (chartElement !== null) {
      const ctx = chartElement.getContext("2d");
      if (ctx !== null) {
        // Destroy existing chart instance
        const existingChart = Chart.getChart(chartElement);
        if (existingChart) {
          existingChart.destroy();
        }

        // Filter financial scorecards based on selected objectives
        const filteredScorecards = financialScorecards.filter(
          (scorecard) =>
            financialSelectedObjectivesReport?.includes(
              scorecard.id.toString()
            ) || false
        );

        console.log("Filtered scorecards:", filteredScorecards);
        const chartData = {
          labels: filteredScorecards.map((scorecard) => {
            const levelOfAttainment = calculateFinancialLevelOfAttainment(
              scorecard.target_performance,
              scorecard.actual_performance
            );
            return levelOfAttainment;
          }),
          datasets: [
            {
              label: "Financial Overview",
              data: filteredScorecards.map((scorecard) => {
                const levelOfAttainment = calculateFinancialLevelOfAttainment(
                  scorecard.target_performance,
                  scorecard.actual_performance
                );
                return parseFloat(levelOfAttainment);
              }),
              backgroundColor: "rgba(248, 224, 49, 0.5)",
              borderColor: "rgba(255, 99, 71, 1)",
              borderWidth: 1,
            },
          ],
        };

        new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: {
            responsive: true,
            indexAxis: "y",
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Value",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Objectives",
                },
              },
            },
          },
        });
      }
    }
  }, [financialSelectedObjectivesReport]);

  const [financialScorecards, setFinancialScorecards] = useState<
    FinancialScorecard[]
  >([]);
  // Fetch the saved financial scorecards from the server
  useEffect(() => {
    const fetchFinancialScorecards = async () => {
      if (!department_id) {
        console.log("Department ID is not available yet.");
        return;
      }

      try {
        const response = await fetch(
          `../api/getFinancialScorecard/${department_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch financial scorecards");
        }
        const data = await response.json();
        setFinancialScorecards(data.financial_bsc);
      } catch (error) {
        console.error("Error fetching financial scorecards:", error);
      }
    };

    fetchFinancialScorecards();
  }, [department_id, session]);

  const objectives = financialScorecards.map((scorecard, index) => ({
    value: scorecard.id.toString(),
    label: `${index + 1}: ${
      scorecard.office_target.length > 60
        ? `${scorecard.office_target.substring(0, 60)}...`
        : scorecard.office_target
    }`,
  }));

  const calculateFinancialLevelOfAttainment = (
    targetPerformance: string,
    actualPerformance: string
  ) => {
    if (targetPerformance === "0") {
      return "0%";
    }
    const target = parseFloat(targetPerformance);
    const actual = parseFloat(actualPerformance);
    const levelOfAttainment = (actual / target) * 100;
    return `${Math.round(levelOfAttainment)}%`; // Round to the nearest integer
  };

  return (
    <div className="flex flex-col">
      <div className="rounded-[0.3rem] relative flex flex-row bg-[#8A252C] justify-between pt-2 pl-3 pb-2 w-[100%]">
        <span className="m-[0_0.8rem_0_0] w-[58.7rem] break-words font-bold text-[1.3rem] text-[#FFFFFF]">
          Financial Report Overview
        </span>
      </div>
      <div className="flex flex-row self-start box-sizing-border mt-5 mb-5">
        <button
          className="flex flex-row break-words font-normal text-[1rem] text-[#686666]"
          onClick={handleAddMoreFinancialReport}
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
          <div className="mt-1">Add more report</div>
        </button>
      </div>

      {/* insert the data here */}
      {financialReports.map((report, index) => (
        <div
          key={index}
          className="bg-[#ffffff] gap-2 w-[1510px] h-[100%] flex flex-col pt-4 pr-3 pb-6 mb-5 box-sizing-border rounded-lg border border-yellow-500 overflow-y-auto overflow-x-hidden"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="ml-5">
              <p className="font-bold text-2xl mb-5">{report.title}</p>
              <div className="overflow-y-auto mr-5 mb-2">
                <p className="overflow-wrap break-word">{report.description}</p>
              </div>

              <p className="mt-1 text-gray-400">
                {report.dateCreated
                  ? new Date(report.dateCreated).toLocaleDateString()
                  : "No date"}
              </p>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => handleEditFinancialReport(report)}
                className="text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteFinancialReport(report)}
                className="text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      {financialModalOpenReport && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 h-[55rem] w-[96rem]">
            <div className="flex flex-row">
              <h2 className="text-2xl mb-5 mt-[-1rem] font-semibold">
                Financial
              </h2>
              <button
                onClick={handleCloseModalFinancialReport}
                className="ml-[84rem] mt-[-3rem] text-gray-500 hover:text-gray-700"
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
            <div className="flex flex-row gap-36 mb-5">
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Title
                  <span className="text-[#DD1414]">*</span>
                </span>
                <input
                  type="text"
                  value={financialTitleReport}
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  onChange={(e) => setFinancialTitleReport(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Date Created
                </span>
                <DatePicker
                  selected={financialDateReport}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={new Date()}
                  placeholderText="MM-DD-YYYY"
                  className="border border-gray-300 px-3 py-2 mt-1 rounded-lg w-[41rem]"
                  disabled={isFinancialEditModeReport}
                />
              </div>
            </div>
            <span className="mr-3 break-words font-regular text-md text-[#000000] mt-5">
              Description
              <span className="text-[#DD1414]">*</span>
            </span>
            <textarea
              value={financialDescriptionReport}
              onChange={(e) => setFinancialDescriptionReport(e.target.value)}
              className="border border-gray-300 px-3 py-2 pl-2 pr-2 mt-1 rounded-lg w-[91rem] h-[5rem]"
            />
            <div className=" mt-5 flex flex-row gap-36">
              <div className="flex flex-col">
                <span className="mr-3 break-words font-regular text-md text-[#000000]">
                  Choose Objectives
                  <span className="text-[#DD1414]">*</span>
                </span>
                <Select
                  options={objectives}
                  isMulti
                  onChange={handleObjectiveChangeFinancial}
                  value={objectives.filter((obj) =>
                    financialSelectedObjectivesReport.includes(obj.value)
                  )}
                  className="rounded-lg w-[91rem]"
                />
              </div>
            </div>
            <div className=" mt-5 flex flex-row gap-36">
              <div className="flex flex-col">
                <span className="mr-3 mt-3 break-words font-regular text-md text-[#000000]">
                  Chart
                </span>
                <div className="display: flex;">
                  <canvas id="chart" width="1000" height="400"></canvas>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-middle items-center">
              <button
                onClick={handleSaveFinancialReport}
                className="bg-[#FAD655] text-[#962203] font-semibold hover:bg-white border hover:border-yellow-500 px-4 py-2 mt-4 rounded-lg w-40 "
              >
                {isFinancialEditModeReport ? "Update Report" : "Save Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
