import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";

export default function Inputgoals() {
  const { data: session, status, update } = useSession();
  console.log("useSession Hook session object", session);

  let user;
  if (session?.user?.name) user = JSON.parse(session?.user?.name as string);

  const [isEditing, setIsEditing] = React.useState(true);
  const [officeVision, setOfficeVision] = React.useState("");
  const [valueProposition, setValueProposition] = React.useState("");
  const [strategicGoals, setStrategicGoals] = React.useState("");
  const [strategicGoals2, setStrategicGoals2] = React.useState("");
  const [strategicGoals3, setStrategicGoals3] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(null);

  const [successModal, setSuccessModal] = React.useState(false);

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
  };
  const department_id = user?.department_id;
  console.log("User Parsed: ", user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`../api/checkGoals/${department_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.vision) {
          // Adjust this condition based on your response structure
          setOfficeVision(data.vision);
          setValueProposition(data.proposition);
          setStrategicGoals(data.goals);
          setStrategicGoals2(data.goals2);
          setStrategicGoals3(data.goals3);
          setSelectedDate(new Date(data.startDate));
          setSelectedEndDate(new Date(data.endDate));
          setIsEditing(false);
        } else {
          console.error(
            "Error fetching input goals data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show error message to the user, etc.
      }
    };
    fetchData();
  }, [department_id]);

  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
    event.preventDefault();

    // Check if any input field is empty
    if (!officeVision || !valueProposition || !strategicGoals) {
        alert("Please fill out all fields");
        return;
    }

    try {
        const response = await fetch("api/inputGoals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                officeVision: officeVision,
                valueProposition: valueProposition,
                strategicGoals: strategicGoals,
                strategicGoals2: strategicGoals2,
                strategicGoals3: strategicGoals3,
                selectedDate: selectedDate, // Send selectedDate as is
                selectedEndDate: selectedEndDate, // Send selectedEndDate as is
                department_id: department_id, // Include the user's ID
            }),
        });

        if (response.ok) {
            // Show success modal
            setSuccessModal(true);
            // Update state to keep input values and disable editing
            setIsEditing(false);
        } else {
            alert("Failed to save goal setting");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

  const handleAddNew = () => {
    // Check if any input field is empty
    if (!officeVision || !valueProposition || !strategicGoals) {
      alert("Please fill out all fields");
      return;
    }

    // Clear all input fields
    setOfficeVision("");
    setValueProposition("");
    setStrategicGoals("");
    setStrategicGoals2("");
    setStrategicGoals3("");
    setSelectedDate(new Date()); // Set start date to default (today)
    setSelectedEndDate(null); // Clear the target completion date

    setIsEditing(true);
  };

  const toggleEditing = async () => {
    if (isEditing) {
      // Fetch data from the database and reset the state variables
      try {
        const response = await fetch(`../api/checkGoals/${department_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.vision) {
          setOfficeVision(data.vision);
          setValueProposition(data.proposition);
          setStrategicGoals(data.goals);
          setStrategicGoals2(data.goals2);
          setStrategicGoals3(data.goals3);
          setSelectedDate(new Date(data.startDate));
          setSelectedEndDate(new Date(data.endDate));
          setIsEditing(false);
        } else {
          console.error(
            "Error fetching input goals data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show error message to the user, etc.
      }
    } else {
      setIsEditing((prevIsEditing) => !prevIsEditing);
    }
  };

  return (
    <div className="flex flex-col items-center ml-28">
      <div className="ml-[-78rem] mb-5 mt-[0rem] inline-block break-words font-bold text-[3rem] text-[#000000]">
        GOAL SETTING
      </div>
      <div className="break-words font font-normal text-[1.3rem] text-[#504C4C] mb-10 mr-5">
        <span>
          Goal setting involves defining specific objectives, outlining
          actionable steps, and establishing a timeframe for achievement. It
          provides direction and motivation for personal or professional growth
          by creating clear targets to strive towards.
        </span>
      </div>
      <div>
        <div className="ml-[-1rem] mb-10">
          <div className="flex flex-col ml-52">
            <div className="flex flex-row justify-between w-[38rem] mb-3">
              <span className="m-[0_0.8rem_0_0] ml-[-12rem] w-[31.4rem] break-words font-semibold text-[1.3rem] text-[#000000]">
                Start Date
              </span>
              <span className="break-words font-semibold text-[1.3rem] text-[#000000]">
                Target Completion Date
              </span>
            </div>
            <div className="flex flex-row justify-between  w-[52rem]">
              <div className="rounded-[0.6rem] ml-[-12rem] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)] border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative p-[0.9rem_1.1rem_0.8rem_1.1rem] w-[28.8rem] box-sizing-border">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    let today = new Date();
                    let startOfDay = new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate()
                    );
                    if (date && date < startOfDay) {
                      // If selected date is in the past, don't update selectedDate
                      toast.error("Please select a future or today's date.");
                    } else {
                      setSelectedDate(date);
                    }
                  }}
                  minDate={new Date()} // Set minDate to today's date
                  dateFormat="yyyy/MM/dd"
                  placeholderText="YYYY/MM/DD"
                  className="break-words font-normal text-[0.9rem] text-[#807C7C] cursor-pointer w-[26.5rem] focus:outline-none"
                />
              </div>
              <div className="rounded-[0.6rem] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)] border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative p-[0.9rem_1.1rem_0.8rem_1.1rem] w-[28.8rem] box-sizing-border">
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date: Date | null) => {
                    setSelectedEndDate(date); // Allow the user to choose any date
                  }}
                  minDate={new Date()} // Set minDate to today's date
                  dateFormat="yyyy/MM/dd"
                  placeholderText="YYYY/MM/DD"
                  className="break-words font-normal text-[0.9rem] text-[#807C7C] cursor-pointer w-[26.5rem] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="m-[0_41.8rem_0.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
            <span className="m-[0_0.3rem_0_0] break-words font-semibold text-[1.3rem] text-[#000000]">
              Office Vision
            </span>
            <div className="m-[0.2rem_0_0.2rem_0] inline-block break-words font-semibold text-[0.9rem] text-[#DD1414]">
              *
            </div>
          </div>
          <div className="relative m-[0_23.7rem_0.7rem_0] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
            A brief statement articulating the company&#39;s long-term goals and
            values.
          </div>
        </div>
        <textarea
          value={officeVision}
          onChange={(e) => setOfficeVision(e.target.value)}
          disabled={!isEditing}
          className={`mx-auto rounded-[0.6rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[94rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
          ${!isEditing ? "bg-gray-300" : ""}`}
        />
        <div className="flex flex-col">
          <div className="m-[0_38.8rem_0.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
            <span className="m-[0_0.5rem_0_0] break-words font-semibold text-[1.3rem] text-[#000000]">
              Value Proposition
            </span>
            <div className="m-[0.1rem_0_0.3rem_0] inline-block break-words font-semibold text-[0.9rem] text-[#DD1414]">
              *
            </div>
          </div>
          <div className="m-[0_14.8rem_0.8rem_0] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
            A concise statement that communicates the unique benefits and
            advantages of your service.
          </div>
        </div>

        <textarea
          value={valueProposition}
          onChange={(e) => setValueProposition(e.target.value)}
          disabled={!isEditing}
          className={`mx-auto rounded-[0.6rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[94rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
         ${!isEditing ? "bg-gray-300" : ""}`}
        ></textarea>

        <div className="flex flex-col">
          <div className="m-[0_41.1rem_0.5rem_0] inline-block break-words font-semibold text-[1.3rem] text-[#000000]">
            Strategic Goals
          </div>
          <div className="m-[0_12.7rem_0.6rem_0] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
            A guiding principles for decision-making, driving the organization
            towards its desired future state.
          </div>
        </div>

        <textarea
          value={strategicGoals}
          onChange={(e) => setStrategicGoals(e.target.value)}
          disabled={!isEditing}
          className={`mx-auto rounded-[0.6rem] border-[0.1rem_solid_#807C7C]
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[94rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
          ${!isEditing ? "bg-gray-300" : ""} `}
        ></textarea>

        <textarea
          value={strategicGoals2}
          onChange={(e) => setStrategicGoals2(e.target.value)}
          disabled={!isEditing}
          className={`mx-auto rounded-[0.6rem] border-[0.1rem_solid_#807C7C]
          bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[94rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
          ${!isEditing ? "bg-gray-300" : ""}`}
        ></textarea>

        <textarea
          value={strategicGoals3}
          onChange={(e) => setStrategicGoals3(e.target.value)}
          disabled={!isEditing}
          className={`mx-auto rounded-[0.6rem] border-[0.1rem_solid_#807C7C]
          bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[94rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
          ${!isEditing ? "bg-gray-300" : ""}`}
        ></textarea>
      </div>

      <div className="m-[0_0_0_10.3rem] ml-[-2rem] mb-20 flex flex-row">
        {isEditing ? (
          // saves the newly added text
          <button
            onClick={handleSave}
            disabled={
              !isEditing ||
              !(officeVision && valueProposition && strategicGoals)
            }
            className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]"
          >
            <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
              Save
            </span>
          </button>
        ) : (
          // saves the edited text
          <button
            onClick={handleAddNew}
            className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]"
          >
            <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
              Add New Goals
            </span>
          </button>
        )}
        <button
          onClick={toggleEditing}
          className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]"
        >
          <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
            {isEditing ? "Cancel" : "Edit"}
          </span>
        </button>
      </div>
      <Modal
        open={successModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className=" bg-white p-8 rounded-lg shadow-md h-72 w-[40rem] text-center relative">
            <button
              onClick={handleCloseSuccessModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
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
            <p id="success-modal-title" className="text-3xl font-bold mb-4">
              Success!
            </p>
            <p id="success-modal-description" className=" text-xl mb-4 mt-8">
              Goal Successfully Saved.
            </p>
            <button
              className="rounded-xl bg-[#8a252c] text-white text-xl w-40 px-4 py-2 border[0.1rem] border-white hover:bg-[#a8444b] font-medium hover:text-[#fffff] focus:outline-none h-12 mt-5"
              onClick={handleCloseSuccessModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
