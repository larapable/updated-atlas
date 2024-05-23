'use client';
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Financial from "../components/Financial";
import Learning from "../components/Learning";
import Stakeholder from "../components/Stakeholder";
import Internal from "../components/Internal";

const ScorecardPage = () => {
  const [displayBSFinancial, setDisplayBSFinancial] = useState(false);
  const [displayBSStakeholder, setDisplayBSStakeholder] = useState(false);
  const [displayBSInternal, setDisplayBSInternal] = useState(false);
  const [displayBSLearning, setDisplayBSLearning] = useState(false);

  const changeComponent = (componentName: string) => {
    localStorage.setItem("lastComponent", componentName);
    switch (componentName) {
      case "Financial":
        setDisplayBSFinancial(true);
        setDisplayBSStakeholder(false);
        setDisplayBSInternal(false);
        setDisplayBSLearning(false);
        break;
      case "Stakeholder":
        setDisplayBSFinancial(false);
        setDisplayBSStakeholder(true);
        setDisplayBSInternal(false);
        setDisplayBSLearning(false);
        break;
      case "Internal":
        setDisplayBSFinancial(false);
        setDisplayBSStakeholder(false);
        setDisplayBSInternal(true);
        setDisplayBSLearning(false);
        break;
      case "Learning":
        setDisplayBSFinancial(false);
        setDisplayBSStakeholder(false);
        setDisplayBSInternal(false);
        setDisplayBSLearning(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const lastComponent = localStorage.getItem("lastComponent");
    if (lastComponent) {
      changeComponent(lastComponent);
    } else {
      setDisplayBSFinancial(true); // Default component
    }
  }, []);

  return (
    <div className="flex flex-row w-full">
      <Navbar />
      <div className="flex-1 flex flex-col mt-8 ml-80">
        <div className="mb-5 mt-[0rem] inline-block break-words font-bold text-[3rem] text-[#000000]">
          BALANCE SCORECARD
        </div>
        <div className="break-words font font-normal text-[1.3rem] text-[#504C4C] mb-10">
          Explore the Balanced Scorecard feature to gain a comprehensive view of
          your organization&apos;s performance across different dimensions. Use it to
          set clear objectives, track progress, and drive strategic initiatives
          for success.
        </div>
        {/* perspectives toggle */}
        <div className=" flex flex-row self-start box-sizing-border mt-5 mb-5">
          <div
            className="flex flex-row box-sizing-border mr-10"
            onClick={() => changeComponent("Financial")}
          >
            <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
              FINANCIAL
            </div>
          </div>
          <div
            className="flex flex-row box-sizing-border mr-10"
            onClick={() => changeComponent("Stakeholder")}
          >
            <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
              STAKEHOLDER
            </div>
          </div>
          <div
            className="flex flex-row box-sizing-border mr-10"
            onClick={() => changeComponent("Internal")}
          >
            <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
              INTERNAL PROCESS
            </div>
          </div>
          <div
            className="flex flex-row box-sizing-border"
            onClick={() => changeComponent("Learning")}
          >
            <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
              LEARNING & GROWTH
            </div>
          </div>
        </div>
        {/* end of perspectives toggle */}

        <div className="shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] border border-gray-300 bg-[#FFFFFF] relative mr-10 flex flex-col pt-4 pr-3 pl-3 pb-5 w-[98%] h-[100%] mb-10 rounded-lg">
          {displayBSFinancial && <Financial />}
          {displayBSStakeholder && <Stakeholder />}
          {displayBSInternal && <Internal />}
          {displayBSLearning && <Learning />}
        </div>
      </div>
    </div>
  );
};

export default ScorecardPage;
