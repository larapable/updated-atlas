"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UserHeader from "../components/UserHeader";
import StrategyMapping from "../components/StrategyMapping";
import SwotPage from "../components/SwotPage";
import SwotPageGenerated from "../components/SwotPageGenerated";

const Swot = () => {
    const [displaySwot, setDisplaySwot] = useState(true);

    return (
        <div className="lg:flex flex-row w-full bg-[#f7f6f6] overflow-auto">
          <Navbar/>
            <div className="flex-1 h-screen">
              <UserHeader />
                <div className="flex-1 flex flex-col mt-8 ml-10 ">
                <div className="flex flex-col w-[fit-content] box-sizing-border mb-16">
                    <div className="mb-5 inline-block self-start break-words font-bold text-[1.9rem] text-[#000000]">
                    SWOT Analysis
                    </div>
                    <span className="break-words font font-normal text-[1.3rem] text-[#504C4C]">
                    Assess your project&#39;s strengths, weaknesses, opportunities, and threats effortlessly. Our AI-powered tool generates insightful strategies
                    tailored to your analysis, empowering <br/>you to make informed decisions and drive your project forward with confidence.
                    </span>
                </div>
                {/* IF I HOVER OR ICLICK ANG SWOT OR STRATEGIES KAY NAAY UNDERLINE MAG STAY BELOW SA WORD, PWEDE KA MAG INSERT UG ICON BEFORE SA WORDS */}
                <div className=" flex flex-row self-start box-sizing-border mb-5">
                    <div className="flex flex-row box-sizing-border mr-10" onClick={() => setDisplaySwot(true)}>
                        <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
                            SWOT
                        </div>
                    </div>
                    <div className="flex flex-row box-sizing-border" onClick={() => setDisplaySwot(false)}>
                        <div className="inline-block break-words font-bold text-[1.3rem] text-[#807C7C] cursor-pointer pb-1.5 transition-all hover:font-extrabold hover:underline hover:text-[#000000]">
                            STRATEGIES
                        </div>
                    </div>
                </div>

                {displaySwot ? <SwotPage /> : <SwotPageGenerated />}


                </div>
            </div>
        </div>
      )
}

export default Swot