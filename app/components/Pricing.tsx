import React from 'react'
import Link from 'next/link'

const Pricing = () => {
  return (
    <div id="pricing-section">
      <div className="m-[10rem_5.1rem_8.5rem_4.3rem] flex flex-row w-[fit-content] box-sizing-border">
        <div className="m-[5.4rem_3.6rem_5.8rem_-5rem] flex flex-col box-sizing-border w-[65rem]">
          <p className="m-[0_1.7rem_1.4rem_7rem] self-start text-center break-words font-extrabold text-[3.8rem] text-[#FFFFFF]">
            <span className="join-us-and-unlock-premium-benefits-sub-0">
              Join us and unlock<br/> <span className="premium-benefits-text">premium benefits</span> 
            </span><span></span>
          </p>
          <span className=" break-words font-regular text-[1.8rem] text-[#FFFFFF] ml-28 hidden lg:flex">
            Elevate your strategic management with advanced <br />
            features, personalized support, and exclusive insights.<br />
            Upgrade to premium and take your organization to the <br />
            next level.
          </span>
        </div>
        <div className="rounded-[1.3rem] border-[0.2rem_solid_#EFAF21] bg-[rgba(180,54,54,0.31)] relative m-[0_2.6rem_0.1rem_-5rem] h-[35rem] w-[25rem] flex flex-col items-center p-[2.3rem_0.5rem_2.2rem_0.8rem] box-sizing-border transform transition-transform hover:scale-110 transition duration-300 ease-in-out hover:bg-[rgb(231,145,87)] hidden lg:flex">
          <span className="m-[0_1.1rem_0_0] break-words font-light text-[1.5rem] text-[#FFFFFF]">
            BASIC
          </span>
          <div className="m-[0_0.4rem_0.5rem_0] inline-block break-words font-bold text-[4rem] text-[#FFFFFF]">
            FREE
          </div>
          <div className="m-[0_1.1rem_1.5rem_0] inline-block break-words font-light text-[1.5rem] text-[#FFFFFF]">
            per month
          </div>
          <div className="bg-[#FFFFFF] m-[0_0_1.3rem_0] w-[17.9rem] h-[0.3rem]">
          </div>
          <div className="justify-center align-middle items-center mt-5">
          <div className="m-[0_1.1rem_0.8rem_1.1rem] flex flex-row self-start w-[fit-content] box-sizing-border">
            <img className="m-[0_0.8rem_0_0.1rem] w-[1.5rem] h-[1.5rem]" 
              src="white-check.png"
              alt="White"
            />
            <span className="break-words font-light text-[1.3rem] text-[#FFFFFF]">
              Up to 2 SWOT analyses only
            </span>
          </div>
          <div className="m-[0_0.7rem_0.8rem_1.1rem] flex flex-row w-[fit-content] box-sizing-border">
            <img className="m-[0_0.8rem_0_0.1rem] w-[1.5rem] h-[1.5rem]" 
              src="white-check.png"
              alt="White"
            />
            <div className="m-[0_0_0.1rem_0] inline-block break-words font-light text-[1.3rem] text-[#FFFFFF]">
              Up to 5 organizational goals only
            </div>
          </div>
          <div className="m-[0_1.1rem_2.7rem_0] flex flex-row w-[fit-content] box-sizing-border">
            <img className="m-[0_0.8rem_0_1.3rem] w-[1.5rem] h-[1.5rem]" 
              src="white-check.png"
              alt="White"
            />
            <div className="m-[0_0_0.1rem_0] inline-block break-words font-light text-[1.3rem] text-[#FFFFFF]">
              Limited report customization 
            </div>
          </div>
          </div>
          <Link href="/signup">
          <div className="rounded-[1.3rem] bg-[#FFFFFF] relative m-[0_0_0_-10rem.2rem] flex flex-row justify-center p-[0.7rem_0_0.5rem_0] w-[14.1rem] box-sizing-border transform transition-transform hover:scale-110 transition duration-300 ease-in-out">
            <span className="break-words font-bold text-[1.3rem] text-[#962203]">
              SIGN UP
            </span>
          </div>
          </Link>
        </div>

        <div className="rounded-[1.3rem] border-[0.1rem_solid_#FFFFFF] bg-[rgba(180,54,54,0.31)] relative m-[0.1rem_0_0_0] h-[35rem] w-[25rem] flex flex-col items-center p-[1.8rem_0.6rem_2.3rem_0.6rem] box-sizing-border transform transition-transform hover:scale-110 transition duration-300 ease-in-out hover:bg-[rgb(231,145,87)] hidden lg:flex">
          <div className="m-[0_0_0.4rem_0.6rem] inline-block break-words font-light text-[1.5rem] text-[#FFFFFF]">
            PREMIUM
          </div>
          <div className="m-[0_0_0.5rem_0.4rem] inline-block break-words font-bold text-[4rem] text-[#FFFFFF]">
            $5.00
          </div>
          <div className="m-[0_0_1.4rem_0.6rem] inline-block break-words font-light text-[1.5rem] text-[#FFFFFF]">
            per month
          </div>
          <div className="bg-[#FFFFFF] m-[0_0.1rem_1.4rem_0] w-[17.9rem] h-[0.1rem]">
          </div>
          <div className="justify-center align-middle items-center mt-5">
          <div className="m-[0_1.3rem_0.8rem_1.3rem] flex flex-row self-start w-[fit-content] box-sizing-border">
            <img className="m-[0_0.7rem_0_0] w-[1.5rem] h-[1.5rem]" 
              src="white-check.png"
              alt="White"
            />
            <span className="break-words font-light text-[1.3rem] text-[#FFFFFF]">
              Unlimited SWOT analyses
            </span>
          </div>
          <div className="m-[0_1.3rem_0.7rem_1.3rem] flex flex-row self-start w-[fit-content] box-sizing-border">
            <img className="m-[0.1rem_0.6rem_0_0] w-[1.5rem] h-[1.5rem]" 
              src="white-check.png"
              alt="White"
            />
            <div className="m-[0_0_0.1rem_0] inline-block break-words font-light text-[1.3rem] text-[#FFFFFF]">
              Unlimited organizational goals
            </div>
          </div>
          <div className="m-[0_1.3rem_2.8rem_1.3rem] flex flex-row self-start w-[fit-content] box-sizing-border">
            <img className="m-[0.1rem_0.6rem_0_0] w-[1.5rem] h-[1.5rem]" 
              src="white-check.png"
              alt="White"
            />
            <div className="m-[0_0_0.1rem_0] inline-block break-words font-light text-[1.3rem] text-[#FFFFFF]">
              Unlimited report customization
            </div>
          </div>
          </div>
          <Link href="/signup">
          <div className="rounded-[1.3rem] bg-[#FFFFFF] relative m-[1rem_0_0_0.8rem] flex flex-row justify-center p-[0.7rem_0.2rem_0.6rem_0] w-[14.1rem] box-sizing-border transform transition-transform hover:scale-110 transition duration-300 ease-in-out">
            <span className="break-words font-bold text-[1.3rem] text-[#962203]">
              SIGN UP
            </span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Pricing