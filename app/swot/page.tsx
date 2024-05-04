"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Card, TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { wrap } from "module";

interface SwotItem {
  id: string;
  value: string;
}

const Swot = () => {
  const [displaySwot, setDisplaySwot] = useState(true);
  const [soApiResponse, setSoApiResponse] = useState("");
  const [woApiResponse, setWoApiResponse] = useState("");
  const [stApiResponse, setStApiResponse] = useState("");
  const [wtApiResponse, setWtApiResponse] = useState("");
  const [counter, setCounter] = useState(1);
  const delay = (ms: number | undefined) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const generateStrategies = async () => {
    callSOAPI();
    await delay(1000); // Delay before calling the second function
    callWOAPI();
    await delay(1000); // Delay before calling the third function
    callSTAPI();
    await delay(1000); // Delay before calling the fourth function
    callWTAPI();
  }

  const callWTAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that mitigate your weaknesses (W) to avoid threats (T) and must keep your entire response within 1 sentence. No extra words. If the text is blank, output 'Field is blank.'.  Do not output any markdown. You should output in this format: W1T1: sentence here. '(||)' (new line here) W2T2: sentence here.";
  
      const weaknessesInput = weaknesses.items
        .map(
          (weakness, index) =>
            `${index + 1}. ${weakness.id}: ${weakness.value}`
        )
        .join("\n");
  
      const threatsInput = threats.items
        .map(
          (threats, index) =>
            `${index + 1}. ${threats.id}: ${threats.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nWeaknesses:\n${weaknessesInput}\n\nThreats:\n${threatsInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";

      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("(||)");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/wtStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setWtApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setWtApiResponse("An error occurred while calling the API");
    }
  }

  const callSTAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that leverage your strengths (S) to avoid threats (T) and must keep your entire response within 1 sentence. No extra words. If the text is blank, output 'Field is blank.'. Do not output any markdown. You should output in this format: S1T1: sentence here. '(||)' (new line here)S2T2: sentence here.";
  
      const strengthsInput = strengths.items
        .map(
          (strengths, index) =>
            `${index + 1}. ${strengths.id}: ${strengths.value}`
        )
        .join("\n");
  
      const threatsInput = threats.items
        .map(
          (threats, index) =>
            `${index + 1}. ${threats.id}: ${threats.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nStrengths:\n${strengthsInput}\n\nThreats:\n${threatsInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
  
      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("(||)");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/stStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setStApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setStApiResponse("An error occurred while calling the API");
    }
  }

  const callWOAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that mitigate your weaknesses (W) to capitalize on opportunities (O) and must keep your entire response within 1 sentence. No extra words. If the text is blank, output 'Field is blank.'. Do not output any markdown. You should output in this format: W1O1: sentence here. '(||)' (new line here)W2O2: sentence here.";
  
      const weaknessesInput = weaknesses.items
        .map(
          (weakness, index) =>
            `${index + 1}. ${weakness.id}: ${weakness.value}`
        )
        .join("\n");
  
      const opportunitiesInput = opportunities.items
        .map(
          (opportunities, index) =>
            `${index + 1}. ${opportunities.id}: ${opportunities.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nWeaknesses:\n${weaknessesInput}\n\nOpportunities:\n${opportunitiesInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
  
      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("(||)");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/woStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setWoApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setWoApiResponse("An error occurred while calling the API");
    }
  }

  const callSOAPI = async () => {
    try {
      const systemPrompt =
        "You will provide specific actionable strategies that leverage your strengths (S) to capitalize on opportunities (O) and must keep your entire response within 1 sentence. No extra words. If the text is blank, output 'Field is blank.'.  Do not output any markdown. You should output in this format: S1O1: sentence here. '(||)' (new line here)S2O2: sentence here.";
  
      const strengthsInput = strengths.items
        .map(
          (strength, index) =>
            `${index + 1}. ${strength.id}: ${strength.value}`
        )
        .join("\n");
  
      const opportunitiesInput = opportunities.items
        .map(
          (opportunities, index) =>
            `${index + 1}. ${opportunities.id}: ${opportunities.value}`
        )
        .join("\n");
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=AIzaSyDYX9gQuAiwDoEx3gtvhJNwnb1cpcTTXDo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt} \n\nStrengths:\n${strengthsInput}\n\nOpportunities:\n${opportunitiesInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      
      const data = await response.json();
      const apiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
  
      // Split the API response by (||) and store in an array
      const responseArray = apiResponse.split("(||)");

      // Save each response from the array individually to the database
      for (const response of responseArray) {
        const databaseResponse = await fetch("/api/soStrategy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response }),
        });

        if (!databaseResponse.ok) {
          console.error("Error saving response to database", databaseResponse);
        }
      }

      setSoApiResponse(apiResponse);
      console.log(responseArray); // Log the array of responses
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setSoApiResponse("An error occurred while calling the API");
    }
  };

  // Reusable SWOT function
  const useSwot = (idPrefix: string, initialItems: SwotItem[] = []) => {
    const [items, setItems] = useState<SwotItem[]>(initialItems);
    const [newItem, setNewItem] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const handleAddClick = () => {
      setIsAdding(!isAdding);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewItem(event.target.value);
    };

    const addSTItem = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && newItem.trim() !== '') {
        try {
          const response = await fetch('/api/stStrategy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response: newItem.trim() }),
          });
    
          if (response.ok) {
            setItems([...items, { id: `ST${counter}`, value: newItem.trim() }]);
            setCounter(counter + 1); // Increment the counter
            setNewItem('');
          } else {
            console.error('Error saving response to database', response);
          }
        } catch (error) {
          console.error('Error saving response to database', error);
        }
      }
    };

    const handleSTEdit = async (id: string, newValue: string) => {
      try {
        const response = await fetch('/api/stStrategy', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, response: newValue }),
        });
    
        if (response.ok) {
          // Handle successful update, e.g., update the state or show a success message
          console.log('S-T Strategy updated successfully');
        } else {
          console.error('Error updating S-T Strategy', response);
          // You might want to display an error message to the user here
        }
      } catch (error) {
        console.error('Error updating S-T Strategy', error);
        // Handle error (e.g., display an error message)
      }
    };

    const addSOItem = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && newItem.trim() !== '') {
        try {
          const response = await fetch('/api/soStrategy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response: newItem.trim() }),
          });
    
          if (response.ok) {
            setItems([...items, { id: `SO${counter}`, value: newItem.trim() }]);
            setCounter(counter + 1); // Increment the counter
            setNewItem('');
          } else {
            console.error('Error saving response to database', response);
          }
        } catch (error) {
          console.error('Error saving response to database', error);
        }
      }
    }

    const addWOItem = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && newItem.trim() !== '') {
        try {
          const response = await fetch('/api/woStrategy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response: newItem.trim() }),
          });
    
          if (response.ok) {
            setItems([...items, { id: `WO${counter}`, value: newItem.trim() }]);
            setCounter(counter + 1); // Increment the counter
            setNewItem('');
          } else {
            console.error('Error saving response to database', response);
          }
        } catch (error) {
          console.error('Error saving response to database', error);
        }
      }
    }

    const addWTItem = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && newItem.trim() !== '') {
        try {
          const response = await fetch('/api/wtStrategy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response: newItem.trim() }),
          });
    
          if (response.ok) {
            setItems([...items, { id: `WT${counter}`, value: newItem.trim() }]);
            setCounter(counter + 1); // Increment the counter
            setNewItem('');
          } else {
            console.error('Error saving response to database', response);
          }
        } catch (error) {
          console.error('Error saving response to database', error);
        }
      }
    }

    const addItem = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && newItem.trim()) {
        if (items.length >= 5) {
          toast.error("Maximum limit of 5 items reached");
        } else {
          setItems((prevItems) => [
            ...prevItems,
            { id: `${idPrefix}${prevItems.length + 1}`, value: newItem.trim() },
          ]);
          setNewItem("");
          setIsAdding(false);
        }
      }
    };
    
    const handleEdit = (id: string, newValue: string) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, value: newValue } : item))
      );


    };

    const handleDelete = (id: string) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return { items, newItem, isAdding, handleAddClick, handleChange, addItem, addSTItem, addSOItem, addWOItem, addWTItem, handleEdit, handleSTEdit, handleDelete };
  };

  // Use the reusable SWOT function for each category
  const strengths = useSwot("S");
  const weaknesses = useSwot("W");
  const opportunities = useSwot("O");
  const threats = useSwot("T");
  //For Strategies
  const strengthsOpportunities = useSwot("SO");
  const weaknessOpportunities = useSwot("WO");
  const strengthsThreats = useSwot("ST");
  const weaknessThreats = useSwot("WT");

  const [showOptions, setShowOptions] = useState(null);

  const toggleOptions = (id: any) => {
    setShowOptions(showOptions === id ? null : id);
  };

  return (
    <div className="flex flex-row w-full h-screen bg-[#eeeeee]">
      <Navbar />
      <div className="flex-1">
        {/* <UserHeader /> */}
        <div className="flex-1 flex flex-col mt-8 ml-80 ">
          <div className="flex flex-col mb-16">
            <div className="mb-5 inline-block self-start break-words font-bold text-[3rem] text-[#000000]">
              SWOT ANALYSIS
            </div>
            <span className="break-words font font-normal text-[1.3rem] text-[#504C4C]">
              Assess your project&#39;s strengths, weaknesses, opportunities,
              and threats effortlessly. Our AI-powered tool generates insightful
              strategies tailored to your analysis, empowering you to make
              informed decisions and drive your project forward with confidence.
            </span>
          </div>
          {/* IF I HOVER OR ICLICK ANG SWOT OR STRATEGIES KAY NAAY UNDERLINE MAG STAY BELOW SA WORD, PWEDE KA MAG INSERT UG ICON BEFORE SA WORDS */}
          <div className=" flex flex-row self-start box-sizing-border mt-5 mb-5">
            <div
              className="flex flex-row box-sizing-border mr-10"
              onClick={() => setDisplaySwot(true)}
            >
              <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
                SWOT
              </div>
            </div>
            <div
              className="flex flex-row box-sizing-border"
              onClick={() => setDisplaySwot(false)}
            >
              <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
                STRATEGIES
              </div>
            </div>
          </div>
          {displaySwot ? (
            <div className="flex flex-col">
              {/* SWOT CONTAINER */}
              <div className="flex flex-row gap-4 ml-2">
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Strengths
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={strengths.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {strengths.isAdding && (
                        <input
                          placeholder="Type strength and press Enter"
                          value={strengths.newItem}
                          onChange={strengths.handleChange}
                          onKeyDown={strengths.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {strengths.items.map((strength) => (
                        <div
                          key={strength.id}
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {strength.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {strength.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(strength.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>

                            {showOptions === strength.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                  onClick={() => {
                                    const newValue = prompt("Enter new value:", strength.value);
                                    if (newValue !== null) {
                                      strengths.handleEdit(strength.id, newValue); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => strengths.handleDelete(strength.id)} 
                                >
                                  Delete 
                                </button> 
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Weaknesses
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={weaknesses.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {weaknesses.isAdding && (
                        <input
                          placeholder="Type weakness and press Enter"
                          value={weaknesses.newItem}
                          onChange={weaknesses.handleChange}
                          onKeyDown={weaknesses.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {weaknesses.items.map((weakness) => (
                        <div
                          key={weakness.id}
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {weakness.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {weakness.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(weakness.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>
                            {showOptions === weakness.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                  onClick={() => {
                                    const newValue = prompt("Enter new value:", weakness.value);
                                    if (newValue !== null) {
                                      weaknesses.handleEdit(weakness.id, newValue); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => weaknesses.handleDelete(weakness.id)} 
                                >
                                  Delete 
                                </button> 
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Opportunities
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={opportunities.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {opportunities.isAdding && (
                        <input
                          placeholder="Type strength and press Enter"
                          value={opportunities.newItem}
                          onChange={opportunities.handleChange}
                          onKeyDown={opportunities.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {opportunities.items.map((opportunity) => (
                        <div
                          key={opportunity.id}
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {opportunity.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {opportunity.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(opportunity.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>
                            {showOptions === opportunity.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                  onClick={() => {
                                    const newValue = prompt("Enter new value:", opportunity.value);
                                    if (newValue !== null) {
                                      opportunities.handleEdit(opportunity.id, newValue); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => opportunities.handleDelete(opportunity.id)} 
                                >
                                  Delete 
                                </button> 
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className=" flex align-center shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between py-5 px-2 bg-white w-[23rem] h-[30rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row rounded-xl bg-[#962203] w-[21.8rem] h-10 items-center p-1 justify-between">
                      <span className="ml-2 font-semibold text-[1.3rem] text-[#FFFFFF]">
                        Threats
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={threats.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {threats.isAdding && (
                        <TextField
                          autoFocus
                          fullWidth
                          variant="standard"
                          placeholder="Type strength and press Enter"
                          value={threats.newItem}
                          onChange={threats.handleChange}
                          onKeyDown={threats.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {threats.items.map((threat) => (
                        <div
                          key={threat.id}
                          className="flex justify-between items-center m-1 w-[21rem] "
                        >
                          <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                            <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                              {threat.id}:
                            </div>
                            <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                              {threat.value}
                            </div>
                          </div>

                          <div className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => toggleOptions(threat.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                              />
                            </svg>
                            {showOptions === threat.id && (
                              <div className="flex flex-col">
                                <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                  onClick={() => {
                                    const newValue = prompt("Enter new value:", threat.value);
                                    if (newValue !== null) {
                                      threats.handleEdit(threat.id, newValue); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => threats.handleDelete(threat.id)} 
                                >
                                  Delete 
                                </button> 
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-center ml-[-4rem]">
                <button
                  onClick={generateStrategies}
                  className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border-[0.1rem_solid_#EFAF21] bg-[#FAD655] mt-10 relative flex flex-row justify-center self-center pt-3 pb-4 pl-1 w-[24.1rem] box-sizing-border"
                >
                  <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Generate Strategies
                    {/* if iclick kay maopen dapat ang strategies, ilink nalang guro ni ari */}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* STRATEGIES-OPPORTUNITY CONTAINER */}
              <div className="flex flex-row gap-[5rem]">
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        S - O Strategies
                      </span>
                      <FaPlus
                        className="text-white w-6 h-6 cursor-pointer relative"
                        onClick={strengthsOpportunities.handleAddClick}
                      />
                    </div>
                    <div className="relative">
                      {strengthsOpportunities.isAdding && (
                        <input
                          placeholder="Type SO and press Enter"
                          value={strengthsOpportunities.newItem}
                          onChange={strengthsOpportunities.handleChange}
                          onKeyDown={strengthsOpportunities.addSOItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                          {soApiResponse}
                        </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                      <div className=" flex flex-col overflow-auto ">
                        {strengthsOpportunities.items.map((strengthsOpportunity) => (
                          <div
                            key={strengthsOpportunity.id}
                            className="flex justify-between items-center m-1 w-[21rem] "
                          >
                            <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                              <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                                {strengthsOpportunity.id}:
                              </div>
                              <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                                {strengthsOpportunity.value}
                              </div>
                            </div>

                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => toggleOptions(strengthsOpportunity.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>

                              {showOptions === strengthsOpportunity.id && (
                                <div className="flex flex-col">
                                  <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => {
                                      const newValue = prompt("Enter new value:", strengthsOpportunity.value);
                                      if (newValue !== null) {
                                        strengthsOpportunities.handleEdit(strengthsOpportunity.id, newValue); 
                                      }
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                    onClick={() => strengthsOpportunities.handleDelete(strengthsOpportunity.id)} 
                                  >
                                    Delete 
                                  </button> 
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        W - O Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative"
                              onClick={weaknessOpportunities.handleAddClick} />
                    </div>
                    <div className="relative">
                      {weaknessOpportunities.isAdding && (
                        <input
                          placeholder="Type WT and press Enter"
                          value={weaknessOpportunities.newItem}
                          onChange={weaknessOpportunities.handleChange}
                          onKeyDown={weaknessOpportunities.addWOItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                      <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                          {woApiResponse}
                        </p>
                      </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                      <div className=" flex flex-col overflow-auto ">
                        {weaknessOpportunities.items.map((weaknessOpportunity) => (
                          <div
                            key={weaknessOpportunity.id}
                            className="flex justify-between items-center m-1 w-[21rem] "
                          >
                            <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                              <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                                {weaknessOpportunity.id}:
                              </div>
                              <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                                {weaknessOpportunity.value}
                              </div>
                            </div>

                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => toggleOptions(weaknessOpportunity.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>

                              {showOptions === weaknessOpportunity.id && (
                                <div className="flex flex-col">
                                  <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => {
                                      const newValue = prompt("Enter new value:", weaknessOpportunity.value);
                                      if (newValue !== null) {
                                        weaknessOpportunities.handleEdit(weaknessOpportunity.id, newValue); 
                                      }
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                    onClick={() => weaknessOpportunities.handleDelete(weaknessOpportunity.id)} 
                                  >
                                    Delete 
                                  </button> 
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex flex-row gap-[5rem]">
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        S - T Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative"
                              onClick={strengthsThreats.handleAddClick} />
                    </div>
                    <div className="relative">
                      {strengthsThreats.isAdding && (
                        <input
                          placeholder="Type ST and press Enter"
                          value={strengthsThreats.newItem}
                          onChange={strengthsThreats.handleChange}
                          onKeyDown={strengthsThreats.addSTItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {stApiResponse}
                          </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                      <div className=" flex flex-col overflow-auto ">
                        {strengthsThreats.items.map((strengthsThreat) => (
                          <div
                            key={strengthsThreat.id}
                            className="flex justify-between items-center m-1 w-[40.5rem] "
                          >
                            <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                              <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                                {strengthsThreat.id}:
                              </div>
                              <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                                {strengthsThreat.value}
                              </div>
                            </div>

                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => toggleOptions(strengthsThreat.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>

                              {showOptions === strengthsThreat.id && (
                                <div className="flex flex-col">
                                  <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => {
                                      const newValue = prompt("Enter new value:", strengthsThreat.value);
                                      if (newValue !== null) {
                                        strengthsThreats.handleEdit(strengthsThreat.id, newValue); 
                                        strengthsThreats.handleSTEdit(strengthsThreat.id, newValue);
                                      }
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                    onClick={() => strengthsThreats.handleDelete(strengthsThreat.id)} 
                                  >
                                    Delete 
                                  </button> 
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        W - T Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative"
                              onClick={weaknessThreats.handleAddClick} />
                    </div>
                    <div className="relative">
                      {weaknessThreats.isAdding && (
                        <input
                          placeholder="Type ST and press Enter"
                          value={weaknessThreats.newItem}
                          onChange={weaknessThreats.handleChange}
                          onKeyDown={weaknessThreats.addItem}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {wtApiResponse}
                          </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                      <div className=" flex flex-col overflow-auto ">
                        {weaknessThreats.items.map((weaknessThreat) => (
                          <div
                            key={weaknessThreat.id}
                            className="flex justify-between items-center m-1 w-[21rem] "
                          >
                            <div className="flex flex-row text-[1.3rem] overflow-y-auto">
                              <div className="bg-[rgba(239,175,33,0.5)] pt-1 pb-1 pr-2 pl-2 font-semibold text-[#962203]">
                                {weaknessThreat.id}:
                              </div>
                              <div className=" pt-1 pb-1 pr-2 pl-2 break-words overflow-y-auto">
                                {weaknessThreat.value}
                              </div>
                            </div>

                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => toggleOptions(weaknessThreat.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>

                              {showOptions === weaknessThreat.id && (
                                <div className="flex flex-col">
                                  <div className="absolute mt-2 w-20 bg-white rounded-md overflow-hidden shadow-lg">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left"
                                    onClick={() => {
                                      const newValue = prompt("Enter new value:", weaknessThreat.value);
                                      if (newValue !== null) {
                                        weaknessThreats.handleEdit(weaknessThreat.id, newValue); 
                                      }
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                    onClick={() => weaknessThreats.handleDelete(weaknessThreat.id)} 
                                  >
                                    Delete 
                                  </button> 
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Swot;
