import { useRef, useEffect } from 'react';
import '@/app/page.css'

const AboutUs = () => {


  return (
    <div id="strategic-management-section">
    <div className="m-[-3rem_0_0_0]">
      <div className="m-[10rem_0.9rem_2.8rem_20rem] flex flex-row w-[fit-content] box-sizing-border">
        <div className="m-[0.8rem_3.5rem_0.9rem_0] flex flex-col items-center box-sizing-border hidden lg:flex">
          <p className="m-[0_0_3.2rem_0] text-center break-words font-extrabold text-[3.8rem] text-[#FFFFFF]">
            <span className="agroundbreaking-approach-to-strategic-management-sub-0">
              A Ground Breaking Approach <br/> to <span className="strategic-management-text">Strategic Management</span>  
            </span><span></span>
          </p>
          <span className="m-[0_0.8rem_0_0.6rem] text-center break-words font-medium text-[1.5rem] text-[#FFFFFF]">
            Welcome to Atlas, your all-in-one solution for streamlined Balanced <br/>Scorecard management  and analytics. Our user-friendly platform <br />
            empowers organizations to make data-driven decisions and achieve <br/>strategic goals with ease.
          </span>
        </div>
        <div className="rounded-[1.3rem] border-[0.2rem_solid_#EFAF21] bg-[#A7472D] relative flex flex-col items-center p-[0.7rem_0_1.4rem_1.3rem] m-[5rem_0_0_0] h-[20rem] w-[23rem] box-sizing-border hidden gap-12 lg:flex transform transition-transform hover:scale-110 transition duration-300 ease-in-out hover:bg-[rgb(231,145,87)]">
          <div className="m-[0_0_4.9rem_0] flex flex-row w-[fit-content] box-sizing-border">
            <div className="m-[0.9rem_3.5rem_3.1rem_0] inline-block break-words font-semibold text-[1.5rem] text-[#FFFFFF]">
              Main Feature 1
            </div>
            <div className="bg-[url('/wc-screen-swot.png')] bg-[50%_50%] bg-cover bg-no-repeat w-[5rem] h-[5rem] m-[1rem_1rem_0_0]">
            </div>
          </div>
          <span className="m-[-2rem_5.5rem_0_0] break-words font-extrabold text-[2rem] text-[#FFFFFF]">
            Swot Analysis<br />
            Matrix
          </span>
        </div>
      </div>

      <div className="m-[-5rem_0.9rem_2.8rem_22rem] flex flex-row gap-[0_5rem] w-[fit-content] box-sizing-border">
        <div className="rounded-[1.3rem] border-[0.2rem_solid_#EFAF21] bg-[#A7472D] relative flex flex-col p-[0.7rem_0_1.4rem_1.3rem] m-[5rem_0_0_0] h-[20rem] w-[23rem] box-sizing-border hidden gap-12 lg:flex transform transition-transform hover:scale-110 transition duration-300 ease-in-out hover:bg-[rgb(231,145,87)]">
          <div className="relative m-[0_0_5.2rem_0.4rem] flex flex-row w-[fit-content] box-sizing-border">
            <div className="m-[1.3rem_3.1rem_2.8rem_0] inline-block break-words font-semibold text-[1.5rem] text-[#FFFFFF]">
              Main Feature 2
            </div>
            <div className="bg-[url('/wc-screen-scorecard.png')] bg-[50%_50%] bg-cover bg-no-repeat w-[5rem] h-[5rem] m-[0_1rem_0_0]">
            </div>
          </div>
          <span className="m-[-2rem_5.5rem_0_1rem] relative self-start break-words font-extrabold text-[2rem] text-[#FFFFFF]">
            Balanced<br />
            Scorecards
          </span>
        </div>
        <div className="rounded-[1.3rem] border-[0.2rem_solid_#EFAF21] bg-[#A7472D] relative flex flex-col p-[0.7rem_0_1.4rem_1.3rem] m-[5rem_0_0_0] h-[20rem] w-[23rem] box-sizing-border hidden gap-12 lg:flex transform transition-transform hover:scale-110 transition duration-300 ease-in-out hover:bg-[rgb(231,145,87)]">
          <div className="relative m-[0_0_5.2rem_0.4rem] flex flex-row w-[fit-content] box-sizing-border">
            <div className="m-[1.3rem_3.1rem_2.8rem_0] inline-block break-words font-semibold text-[1.5rem] text-[#FFFFFF]">
              Main Feature 3
            </div>
            <div className="bg-[url('/wc-screen-report.png')] bg-[50%_50%] bg-cover bg-no-repeat w-[5rem] h-[5rem] m-[0_1rem_0_0]">
            </div>
          </div>
          <span className="m-[-2rem_5.5rem_0_1rem] relative self-start break-words font-extrabold text-[2rem] text-[#FFFFFF]">
            Report<br />
            Analysis
          </span>
        </div>
        <div className="rounded-[1.3rem] border-[0.2rem_solid_#EFAF21] bg-[#A7472D] relative flex flex-col p-[0.7rem_0_1.4rem_1.3rem] m-[5rem_0_0_0] h-[20rem] w-[23rem] box-sizing-border hidden gap-12 lg:flex transform transition-transform hover:scale-110 transition duration-300 ease-in-out hover:bg-[rgb(231,145,87)]">
          <div className="m-[0_0_4.9rem_0.3rem] flex flex-row w-[fit-content] box-sizing-border">
            <div className="m-[1rem_3rem_3rem_0] inline-block break-words font-semibold text-[1.5rem] text-[#FFFFFF]">
              Main Feature 4
            </div>
            <div className="bg-[url('/wc-screen-stratmap.png')] bg-[50%_50%] bg-cover bg-no-repeat w-[5rem] h-[5rem] m-[0_1rem_0_0]">
            </div>
          </div>
          <span className="m-[-2rem_5.8rem_0_1rem] self-start break-words font-extrabold text-[2rem] text-[#FFFFFF]">
            Strategic<br />
            Maps
          </span>
        </div>
      </div>

    </div>
    </div>
  )
}

export default AboutUs