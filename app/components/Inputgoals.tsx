'use client'

import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { getSession, useSession } from "next-auth/react";
import { useEffect } from 'react';


export default function Inputgoals() {

  const {data: session,status, update } = useSession();
  console.log("useSession Hook session object", session)
 
  let user;
  if(session?.user?.name) 
    user = JSON.parse(session?.user?.name as string);

  const [isEditing, setIsEditing] = React.useState(true)
  const [officeVision, setOfficeVision] = React.useState('')
  const [valueProposition, setValueProposition] = React.useState('')
  const [strategicGoals, setStrategicGoals] = React.useState('')
  const [strategicGoals2, setStrategicGoals2] = React.useState('')
  const [strategicGoals3, setStrategicGoals3] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(new Date());


  const department_id= user?.department_id;
    console.log("User Parsed: ", user);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`../api/checkGoals/${department_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data.vision) { // Adjust this condition based on your response structure
        setOfficeVision(data.vision);
        setValueProposition(data.proposition);
        setStrategicGoals(data.goals);
        setStrategicGoals2(data.goals2);
        setStrategicGoals3(data.goals3);
        setSelectedDate(new Date(data.startDate));
        setSelectedEndDate(new Date(data.endDate));
        setIsEditing(false);
      } else {
        console.error('Error fetching input goals data:', response.statusText);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, show error message to the user, etc.
      }
    }
    fetchData();
  }, [department_id]);
    

    
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()


    if (!officeVision || !valueProposition || !strategicGoals) {
      alert('Please fill out all fields')
      return;
    }
  
    try {
      const response = await fetch('api/inputGoals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          officeVision: officeVision,
          valueProposition: valueProposition,
          strategicGoals: strategicGoals,
          strategicGoals2: strategicGoals2,
          strategicGoals3: strategicGoals3,
          selectedDate: selectedDate,
          selectedEndDate: selectedEndDate,
          department_id: department_id
        })
      })
      if (response.ok) {
        alert('Goal setting saved successfully')
        setIsEditing(false)
      } else {
        alert('Failed to save goal setting')
      }
    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  
  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
 
    try {

    const formattedStartDate = selectedDate?.toISOString().split('T')[0];
    const formattedEndDate = selectedEndDate?.toISOString().split('T')[0];

      const res = await fetch("../api/getGoals", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          officeVision: officeVision,
          valueProposition: valueProposition,
          strategicGoals: strategicGoals,
          strategicGoals2: strategicGoals2,
          strategicGoals3: strategicGoals3,
          selectedDate: formattedStartDate,
          selectedEndDate: formattedEndDate,
          department_id: department_id
        }),
      });

      if (res.ok) {
        console.log("Edit successful");
        setIsEditing(false);
      } else {
        console.log("User goals failed.");
      }
    } catch (error) {
      console.log("Error during saving goals", error);
    }
  };

  const toggleEditing = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };


  return (
    <div className="flex flex-col items-center">
      <div className="ml-[-78rem] mb-5 mt-[0rem] inline-block break-words font-bold text-[3rem] text-[#000000]">
        GOAL SETTING
      </div>
      <div className="break-words font font-normal text-[1.3rem] text-[#504C4C] ml-[-2rem] mb-10">
        Goal setting involves defining specific objectives, outlining actionable steps, and establishing a timeframe for achievement. It provides direction and motivation <br />
        for personal or professional growth by creating clear targets to strive towards.
      </div>
      <div className="ml-10">
      <div className='ml-[-1rem] mb-10'>
      <div className="flex flex-col ml-72">
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
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="YYYY/MM/DD"
              className="break-words font-normal text-[0.9rem] text-[#807C7C] cursor-pointer w-[26.5rem]"
            />
          </div>
          <div className="rounded-[0.6rem] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)] border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative p-[0.9rem_1.1rem_0.8rem_1.1rem] w-[28.8rem] box-sizing-border">
            <DatePicker
              selected={selectedEndDate}
              onChange={(date: Date | null) => setSelectedEndDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="YYYY/MM/DD"
              className="break-words font-normal text-[0.9rem] text-[#807C7C] cursor-pointer w-[26.5rem]"
            />
          </div>
          </div>
          </div>
          </div>
        <div className="flex flex-col ml-20">
        <div className="m-[0_41.8rem_0.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
        <span className="m-[0_0.3rem_0_0] break-words font-semibold text-[1.3rem] text-[#000000]">
          Office Vision
        </span>
        <div className="m-[0.2rem_0_0.2rem_0] inline-block break-words font-semibold text-[0.9rem] text-[#DD1414]">
          *
        </div>
      </div>
      <div className="relative m-[0_23.7rem_0.7rem_0] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
        A brief statement articulating the company&#39;s long-term goals and values.
      </div>
      </div>
      <textarea
        value={officeVision}
        onChange={(e) => setOfficeVision(e.target.value)}
        disabled={!isEditing} // Disable input when not editing
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[102rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
        ${!isEditing ? 'bg-gray-300' : ''}`}
      />
      <div className="flex flex-col ml-20">
      <div className="m-[0_38.8rem_0.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
        <span className="m-[0_0.5rem_0_0] break-words font-semibold text-[1.3rem] text-[#000000]">
          Value Proposition
        </span>
        <div className="m-[0.1rem_0_0.3rem_0] inline-block break-words font-semibold text-[0.9rem] text-[#DD1414]">
          *
        </div>
      </div>
      <div className="m-[0_14.8rem_0.8rem_0] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
        A concise statement that communicates the unique benefits and advantages of your service.
      </div>
      </div>

      <textarea
        value={valueProposition}
        onChange={(e) => setValueProposition(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C] 
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[102rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </textarea>

      <div className="flex flex-col ml-20">
        <div className="m-[0_41.1rem_0.5rem_0] inline-block break-words font-semibold text-[1.3rem] text-[#000000]">
          Strategic Goals
        </div>
        <div className="m-[0_12.7rem_0.6rem_0] inline-block break-words font-normal text-[1rem] text-[#807C7C]">
          A guiding principles for decision-making, driving the organization towards its desired future state.
        </div>
      </div>

      <textarea
        value={strategicGoals}
        onChange={(e) => setStrategicGoals(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C]
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[102rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
        ${!isEditing ? 'bg-gray-300' : ''} `}>
      </textarea>

      <textarea
        value={strategicGoals2}
        onChange={(e) => setStrategicGoals2(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C]
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[102rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </textarea>

      <textarea
        value={strategicGoals3}
        onChange={(e) => setStrategicGoals3(e.target.value)}
        disabled={!isEditing}
        className={`mx-auto rounded-[0.6rem] ml-[5rem] border-[0.1rem_solid_#807C7C]
        bg-[#FFFFFF] relative m-[0_3.1rem_1.6rem_3.1rem] self-end w-[102rem] h-[8rem] p-2 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]
        ${!isEditing ? 'bg-gray-300' : ''}`}>
      </textarea>
      </div>

      <div className="m-[0_0_0_10.3rem] ml-[5rem] mb-20 flex flex-row w-[25.8rem] box-sizing-border">
      {isEditing ? (
        // saves the newly added text
    <button onClick={handleSave} disabled={!officeVision || !valueProposition || !strategicGoals} className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]">
      <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
        Save
      </span>
    </button>
  ) : (
    // saves the edited text
    <button onClick={handleEdit} className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]">
      <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
        Save Edit
      </span>
    </button>
  )}
  <button onClick={toggleEditing} className="rounded-[0.6rem] bg-[#FAD655] relative m-[0_2.9rem_0_0] flex flex-row justify-center p-[0.8rem_0.1rem_0.8rem_0] w-[11.4rem] box-sizing-border hover:bg-[#FFFFFF] shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.10)]">
    <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
      {isEditing ? "Cancel" : "Edit"}
    </span>
  </button>

       
      </div>
    </div>
  )
}