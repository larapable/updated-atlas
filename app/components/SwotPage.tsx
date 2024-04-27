import React from 'react'

const SwotPage = () => {
  return (
    <div className="lg:items-center align-middle justify-center self-center">
        {/* SWOT CONTAINER */}
        <div className="lg:flex flex-row box-sizing-border gap-10 mr-10">
            <div className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative flex flex-row justify-between pt-5 pr-7 pl-7 w-[25rem] h-[23.9rem] box-sizing-border">
                <div className="rounded-[0.6rem] bg-[#962203] absolute left-2 top-4 w-96 h-[2.5rem]">
                </div>
                    <span className="relative w-[13.8rem] break-words font-semibold text-[1.3rem] text-[#FFFFFF]">
                            Strengths
                    </span>
                        {/* IMAGE HERE KATONG PLUS <img className="relative m-[0.3rem_0_0.4rem_0] w-[0.8rem] h-[0.9rem]" /> */}
                    </div>
                    <div className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative flex flex-row justify-between pt-5 pr-7 pl-7 w-[25rem] h-[23.9rem] box-sizing-border">
                        <div className="rounded-[0.6rem] bg-[#962203] absolute top-4 right-2 w-96 h-[2.5rem]">
                        </div>
                        <span className="relative w-[13.8rem] break-words font-semibold text-[1.3rem] text-[#FFFFFF]">
                            Weaknesses
                        </span>
                        {/* IMAGE HERE KATONG PLUS <img className="relative m-[0.3rem_0_0.4rem_0] w-[0.8rem] h-[0.9rem]" /> */}
                    </div>
                    <div className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative flex flex-row justify-between p-[1.4rem_1.5rem_0_1.8rem]  w-[25rem] h-[23.9rem] box-sizing-border">
                        <div className="rounded-[0.6rem] bg-[#962203] absolute top-4 right-2 w-96 h-[2.5rem]">
                        </div>
                        <span className="relative w-[13.8rem] break-words font-semibold text-[1.3rem] text-[#FFFFFF]">
                            Opportunities
                        </span>
                        {/* IMAGE HERE KATONG PLUS <img className="relative m-[0.3rem_0_0.4rem_0] w-[0.8rem] h-[0.9rem]" /> */}
                    </div>
                    <div className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border border-[0.1rem_solid_#807C7C] bg-[#FFFFFF] relative flex flex-row justify-between p-[1.3rem_1.8rem_0_1.6rem]  w-[25rem] h-[23.9rem] box-sizing-border">
                        <div className="rounded-[0.6rem] bg-[#962203] absolute top-4 right-2 w-96 h-[2.5rem]">
                        </div>
                        <span className="relative w-[13.8rem] break-words font-semibold text-[1.3rem] text-[#FFFFFF]">
                            Threats
                        </span>
                        {/* IMAGE HERE KATONG PLUS <img className="relative m-[0.3rem_0_0.4rem_0] w-[0.8rem] h-[0.9rem]" /> */}
                    </div>
                </div>
                {/* ayaw nalang pag agmit atong button uy kay murag shudi need pa irefresh ang page para mopakita, i link nalang ni NIYA KABAW NAKAS DESIGN, LIKE KUNG HOVER CHURVA */}
                <div className="lg:mb-0 mb-6 shadow-[0rem_0.3rem_0.3rem_0rem_rgba(0,0,0,0.25)] rounded-[0.6rem] border-[0.1rem_solid_#EFAF21] bg-[#FAD655] mt-10 relative flex flex-row justify-center self-center pt-3 pb-4 pl-1 w-[24.1rem] box-sizing-border ml-[38%]">
                    <span className="break-words font-semibold text-[1.3rem] text-[#962203]">
                    Generate Strategies
                    {/* if iclick kay maopen dapat ang strategies, ilink nalang guro ni ari */}
                    </span>
                </div>
    </div>
  )
}

export default SwotPage