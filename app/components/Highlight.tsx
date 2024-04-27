import React from 'react'
import '@/app/page.css'

const Highlight = () => {
  return (
    <div className='hidden gap-12 lg:flex'>
        <div className="rounded-[1.3rem] bg-[rgba(180,54,54,0.31)] relative m-[10rem_2.1rem_6.6rem_2.4rem] flex flex-row p-[2.1rem_0_1.6rem_1.8rem] h-80 w-[180rem] padding-container ">
        <div className="bg-[url('/strategy.png')] bg-[50%_50%] bg-cover bg-no-repeat m-[2rem_2rem_1.1rem_0] w-[7rem] h-[10rem] hidden gap-12 lg:flex align-middle justify-center">
        </div>

        <div className="m-[0_0.8rem_0.8rem_0] flex flex-col box-sizing-border align-middle justify-center">
          <div className="m-[0_0_0.6rem_0] inline-block self-start break-words font-bold text-[1.8rem] text-[#FFFFFF] hidden gap-12 lg:flex">
            Your Ultimate Strategy <br />
            Partner
          </div>
          <span className="break-words font-normal text-[1.4rem] text-[#FFFFFF] m-[0_2rem_0_0]">
            ATLAS offers tools and insights <br />
            to optimize decision-making <br />
            and drive success.
          </span>
        </div>
        <div className="bg-[#FFFFFF] m-[-1rem_1.9rem_0_5rem] w-[0.1rem] h-[17rem]">
        </div>
        <div className="flex flex-row ml-10">
        <div className="bg-[url('/robot.png')] bg-[50%_50%] bg-cover bg-no-repeat m-[2rem_0_1.1rem_1rem] w-[7rem] h-[10rem] hidden gap-12 lg:flex">
        </div>
        <div className="m-[0_1.2rem_0.8rem_0] flex flex-col box-sizing-border align-middle justify-center">
          <div className="m-[0_0.3rem_2.1rem_2.5rem] inline-block self-start break-words font-bold text-[1.8rem] text-[#FFFFFF] hidden gap-12 lg:flex">
            AI-Powered Strategy
          </div>
          <span className="break-words font-normal text-[1.4rem] text-[#FFFFFF] m-[0_0_0_2.5rem]">
            ATLAS leverages advanced <br />
            algorithms to analyze data, <br />
            generate insights.
          </span>
        </div>
        </div>
        <div className="bg-[#FFFFFF] m-[-1rem_1.5rem_0_5rem] w-[0.1rem] h-[17rem]">
        </div>
        <div className="flex flex-row ml-10">
        <div className="bg-[url('/user-friendly.png')] bg-[50%_50%] bg-cover bg-no-repeat m-[2rem_1rem_1.1rem_2rem] w-[7rem] h-[10rem] hidden gap-12 lg:flex">
        </div>
        <div className="mb-2 ml-5 flex flex-col box-sizing-border align-middle justify-center ">
          <div className="m-[0_0_0.6rem_1rem] inline-block self-start break-words font-bold text-[1.8rem] text-[#FFFFFF] hidden gap-12 lg:flex">
            Always Ahead of the <br />
            Curve
          </div>
          <span className="break-words font-normal text-[1.4rem] text-[#FFFFFF] m-[0_0_0_1rem]">
            ATLAS stays ahead by <br />
            continuously adapting to <br />
            changing environments
          </span>
        </div>
        </div>

        
      </div>

    </div>
  )
}

export default Highlight