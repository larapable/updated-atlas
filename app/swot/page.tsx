"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import UserHeader from "../components/UserHeader";
import { FaPlus } from "react-icons/fa";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";
import { getSession, useSession } from "next-auth/react";

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

  const { data: session } = useSession();
 



  let user;
  if(session?.user?.name) 
    user = JSON.parse(session?.user?.name as string);
    const department_id = user?.department_id;
   

    
  const generateStrategies = async () => {
  
  }

  // Reusable SWOT function
  const useSwot = (initialItems: SwotItem[] = []) => {
    const [items, setItems] = useState<SwotItem[]>(initialItems);
    const [newItem, setNewItem] = useState("");
    const [isAdding, setIsAdding] = useState(false);


    const handleAddClick = () => {
      setIsAdding(!isAdding);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewItem(event.target.value);
    };

    const add = async (event: React.KeyboardEvent, category: string) => {
      if (event.key === "Enter" && newItem.trim()) {
    if (fetchedStrengths.length >= 5) {
              toast.error("Maximum limit of 5 items reached");
            } else {
        try {
          // Send data to backend
          const response = await fetch(`api/${category}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: newItem.trim(), department_id: department_id }),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to add ${category}. Please try again.`);
          }
    
          const { message, newItem: newItemData } = await response.json();
          console.log(`Added ${category}:`, newItemData);
    
          if (response.status === 201) {
            // Update the appropriate state based on the category
            updateState(category, newItemData);
            setNewItem("");
            setIsAdding(false);
            toast.success(message);
          } else {
            console.error(`Error adding ${category}:`, message);
            toast.error(message);
          }
    
        } catch (error: any) {
          console.error(`Error adding ${category}:`, error.message);
          toast.error('An unexpected error occurred');
        }
       }
      }
    };
    
    const updateState = (category: string, newItemData: any) => {
      switch (category) {
        case 'strengths':
          setFetchedStrengths(prevStrengths => [...prevStrengths, newItemData]);
          fetchUpdatedData('strengths'); // Fetch updated strengths data
          break;
        case 'weakness':
          setFetchedWeaknesses(prevWeaknesses => [...prevWeaknesses, newItemData]);
          fetchUpdatedData('weakness'); // Fetch updated weaknesses data
          break;
        case 'opportunities':
          setFetchedOpportunities(prevOpportunities => [...prevOpportunities, newItemData]);
          fetchUpdatedData('opportunities'); // Fetch updated opportunities data
          break;
        case 'threats':
          setFetchedThreats(prevThreats => [...prevThreats, newItemData]);
          fetchUpdatedData('threats'); // Fetch updated threats data
          break;
        default:
          break;
      }
    };
    
    const addStrength = async (event: React.KeyboardEvent) => {
      await add(event, 'strengths');
    };
    
    const addWeakness = async (event: React.KeyboardEvent) => {
      await add(event, 'weakness');
    };

    const addOpportunities = async (event: React.KeyboardEvent) => {
      await add(event, 'opportunities');
    };

    const addThreats = async (event: React.KeyboardEvent) => {
      await add(event, 'threats');
    };

    const edit = async (id: string, newValue: string, department_id: string, endpoint: string) => {
      try {
    
        const response = await fetch(`api/${endpoint}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id, newValue: newValue, department_id: department_id }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update item. Please try again.');
        }
    
        const updatedStrength = await response.json();
    
        // Add the prefix back to the id of the updated strength
        updatedStrength.id = id.charAt(0) + updatedStrength.id;
    
        // Update fetchedStrengths state
        setFetchedStrengths(prevStrengths =>
          prevStrengths.map(strength => strength.id === id ? updatedStrength : strength)
        );
    
        // Use updatedStrength to update items state
        setItems(prevItems =>
          prevItems.map(item => item.id === id ? updatedStrength : item)
        );
    
        console.log(`${endpoint} updated successfully`);
      } catch (error:any) {
        console.error('Error updating item:', error.message);
      }
    };
    
    
    
    
    const EditStrength = async (id: string, newValue: string, department_id: string) => {
      await edit(id, newValue, department_id, 'strengths');
    };

    const EditWeakness = async (id: string, newValue: string, department_id: string) => {
      await edit(id, newValue, department_id, 'weakness');
    }; 

    const EditOpportunities = async (id: string, newValue: string, department_id: string) => {
      await edit(id, newValue, department_id, 'opportunites');
    }; 
   
    const EditThreats = async (id: string, newValue: string, department_id: string) => {
      await edit(id, newValue, department_id, 'threats');
    }; 
   
   

    const deleteItem = async (id: string, department_id: string, endpoint: string) => {
      try {
    
        const response = await fetch(`api/${endpoint}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id, department_id: department_id }),
        });
    
        if (response.ok) {
          // If the delete operation was successful, update the state to reflect the change
          setItems((prevItems) => prevItems.filter((item) => item.id !== id));
          console.log(`${endpoint} deleted successfully`);
        } else {
          console.error(`Error deleting ${endpoint}`, response);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error(`Error deleting ${endpoint}`, error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    const deleteStrength = async (id: string, department_id: string) => {
      await deleteItem(id, department_id, 'strengths');
    };
  
    const deleteWeakness = async (id: string, department_id: string) => {
      await deleteItem(id, department_id, 'weakness');
    };

     const deleteOpportunities = async (id: string, department_id: string) => {
      await deleteItem(id, department_id, 'opportunities');
    };
    
    const deleteThreats = async (id: string, department_id: string) => {
      await deleteItem(id, department_id, 'threats');
    };
   
    return { items, newItem, isAdding, handleAddClick,handleChange, addStrength, EditStrength, deleteStrength, addWeakness, EditWeakness, deleteWeakness, addOpportunities, EditOpportunities, deleteOpportunities, addThreats, EditThreats, deleteThreats};
  };

  const [fetchedStrengths, setFetchedStrengths] = useState<SwotItem[]>([]);
  const [fetchedWeaknesses, setFetchedWeaknesses] = useState<SwotItem[]>([]);
  const [fetchedOpportunities, setFetchedOpportunities] = useState<SwotItem[]>([]);
  const [fetchedThreats, setFetchedThreats] = useState<SwotItem[]>([]);
  const [lastFetchedDepartmentId, setLastFetchedDepartmentId] = useState<string | number | null>(null); 
  
  useEffect(() => {
    const fetchStrengths = async () => {
      try {
        const response = await fetch(`api/strengths/${department_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch strengths');
        }
        const data = await response.json();
        console.log('Fetched strengths data:', data); // Log the fetched data
        setFetchedStrengths(data); // Store fetched strengths in state
        setLastFetchedDepartmentId(department_id); // Store the department_id associated with the fetched strengths
      } catch (error: any) {
        console.error('Error fetching strengths:', error.message);
      }
    };
  
    // Fetch strengths if the department_id has changed or when fetchedStrengths is updated
    if (department_id !== lastFetchedDepartmentId || fetchedStrengths.length === 0) {
      fetchStrengths();
    }
  }, [department_id, lastFetchedDepartmentId, fetchedStrengths.length]);


  useEffect(() => {
    const FetchWeaknesses = async () => {
      try {
        const response = await fetch(`api/weakness/${department_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weakness');
        }
        const data = await response.json();
        console.log('Fetched weakness data:', data); 
        setFetchedWeaknesses(data); 
        setLastFetchedDepartmentId(department_id); 
      } catch (error: any) {
        console.error('Error fetching weakness:', error.message);
      }
    };
  
    // Fetch strengths if the department_id has changed or when fetchedStrengths is updated
    if (department_id !== lastFetchedDepartmentId || fetchedWeaknesses.length === 0) {
      FetchWeaknesses();
    }
  }, [department_id, lastFetchedDepartmentId, fetchedWeaknesses.length]);

  useEffect(() => {
    const FetchOpportunites = async () => {
      try {
        const response = await fetch(`api/opportunities/${department_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        const data = await response.json();
        console.log('Fetched opportunities data:', data); 
        setFetchedOpportunities(data); 
        setLastFetchedDepartmentId(department_id); 
      } catch (error: any) {
        console.error('Error fetching opportunities:', error.message);
      }
    };
  
    if (department_id !== lastFetchedDepartmentId || fetchedOpportunities.length === 0) {
      FetchOpportunites();
    }
  }, [department_id, lastFetchedDepartmentId, fetchedOpportunities.length]);

  useEffect(() => {
    const FetchThreats = async () => {
      try {
        const response = await fetch(`api/threats/${department_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch threats');
        }
        const data = await response.json();
        console.log('Fetched threats data:', data); 
        setFetchedThreats(data); 
        setLastFetchedDepartmentId(department_id); 
      } catch (error: any) {
        console.error('Error fetching threats:', error.message);
      }
    };
  
    if (department_id !== lastFetchedDepartmentId || fetchedThreats.length === 0) {
      FetchThreats();
    }
  }, [department_id, lastFetchedDepartmentId, fetchedThreats.length]);


  const fetchUpdatedData = async (category: string) => {
    try {
      const response = await fetch(`api/${category}/${department_id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch updated ${category}`);
      }
      const data = await response.json();
      switch (category) {
        case 'strengths':
          setFetchedStrengths(data);
          break;
        case 'weakness':
          setFetchedWeaknesses(data);
          break;
        case 'opportunities':
          setFetchedOpportunities(data);
          break;
        case 'threats':
          setFetchedThreats(data);
          break;
        default:
          break;
      }
    } catch (error: any) {
      console.error(`Error fetching updated ${category}:`, error.message);
    }
  };
  
  const strengths = useSwot(fetchedStrengths);
  const weaknesses = useSwot(fetchedWeaknesses);
  const opportunities = useSwot(fetchedOpportunities);
  const threats = useSwot(fetchedThreats);

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
                          onKeyDown={strengths.addStrength}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>


                    <div className=" flex flex-col overflow-auto ">
                  
                    {fetchedStrengths.map((strength) => (
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
                                      strengths.EditStrength(strength.id, newValue, department_id); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => strengths.deleteStrength(strength.id, department_id)} 
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
                          onKeyDown={weaknesses.addWeakness}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>

                    <div className=" flex flex-col overflow-auto ">
                      {fetchedWeaknesses.map((weakness) => (
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
                                      weaknesses.EditWeakness(weakness.id, newValue, department_id); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => weaknesses.deleteWeakness(weakness.id,department_id )} 
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
                          onKeyDown={opportunities.addOpportunities}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {fetchedOpportunities.map((opportunity) => (
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
                                      opportunities.EditOpportunities(opportunity.id, newValue, department_id); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => opportunities.deleteOpportunities(opportunity.id, department_id)} 
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

                {/* Threats Card (similar structure to Strengths Card) */}
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
                          onKeyDown={threats.addThreats}
                          className=" mt-4 bg-white absolute p-4 shadow-2xl font-semibold rounded-md"
                          style={{
                            width: "calc(100% - 1.5rem)",
                            marginLeft: "1.5rem",
                          }}
                        />
                      )}
                    </div>
                    <div className=" flex flex-col overflow-auto ">
                      {fetchedThreats.map((threat) => (
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
                                      threats.EditThreats(threat.id, newValue, department_id); 
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 w-full text-left" 
                                  onClick={() => threats.deleteThreats(threat.id, department_id)} 
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

              {/* Generate Strategies Button */}
              <div className="flex justify-center ml-[-3rem]"> 
                <button 
                  onClick={generateStrategies}
                  className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border-[0.1rem_solid_#EFAF21] bg-[#FAD655] mt-10 relative flex flex-row justify-center self-center pt-3 pb-4 pl-1 w-[24.1rem] box-sizing-border" 
                >
                  <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Generate Strategies 
                  </span>
                </button>
              </div> 
            </div> 
          ) : (
            // STRATEGIES CONTAINER (similar structure to SWOT CONTAINER)
            <div className="flex flex-col">
              <div className="flex flex-row gap-[5rem]">
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        S - O Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                      <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                        {soApiResponse}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        W - O Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                      </div>
                        <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {woApiResponse}
                          </p>
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
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {stApiResponse}
                          </p>
                    </div>
                  </div>
                </Card>
                <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
                      <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                        W - T Strategies
                      </span>
                      <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mx-3 mt-4">
                          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {wtApiResponse}
                          </p>
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