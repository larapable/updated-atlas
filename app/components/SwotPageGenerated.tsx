import { Card } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa";

const SwotPageGenerated = () => {
  return (
    <div className="flex flex-col">
      {/* STRATEGIES CONTAINER */}
      <div className="flex flex-row gap-[5rem]">
        <Card className="flex align-center mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-xl border  border-[0.1rem_solid_#807C7C] justify-between bg-white w-[45rem] h-[14rem]">
          <div className="flex flex-col">
            <div className="flex flex-row mt-4 mx-3 p-2 rounded-[0.6rem] bg-[#962203] w-[43.3rem] h-10 justify-between items-center">
              <span className="ml-2 relative font-semibold text-[1.3rem] text-[#FFFFFF]">
                S - O Strategies
              </span>
              <FaPlus className="text-white w-6 h-6 cursor-pointer relative" />
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SwotPageGenerated;
