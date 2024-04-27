'use client';
import Link from 'next/link'
import React from 'react'
import '@/app/page.css'

const NavigateBusiness = () => {
  return (
    <div >
      <div className="relative m-[2rem_4.2rem_1.8rem_4.2rem] self-start break-words font-extrabold text-[6.3rem] text-[#FFFFFF]">
        <span className="navigate-your-business-success-sub-2">
          <div>NAVIGATE YOUR <br/> <span className="business-success-text">BUSINESS SUCCESS</span></div>  
        </span><span></span>
      </div>
      <div className="m-[-0.8rem_4.4rem_2.4rem_4.4rem] inline-block self-start break-words font-medium text-[1.5rem] text-[#e7dddd]">
        Welcome to Atlas, your all-in-one solution for tracking, analyzing, and optimizing <br />
        your business performance. Gain valuable insights, make informed decisions, and <br />
        chart your course to success with our intuitive scorecard platform. Atlas empowers you to <br />
        navigate the complexities of business with confidence and clarity. Start your journey today.
      </div>
      <div className="bg-[url('/welcome-image.png')] absolute right-1 md:right-10 xl:top-5 xl:right-16 h-[45rem] w-[45rem] m-[18rem] mr-[1rem] mt-[3rem] bg-pattern-2 bg-cover hidden lg:flex  transform transition-transform hover:scale-110 transition duration-300 ease-in-out">
      </div>
      <div className="m-[-0.5rem_0_1rem_4.4rem] flex flex-row self-start w-[26rem] box-sizing-border">
        <Link href="/login">
        <div className="rounded-[2rem] bg-[#EFAF21] relative m-[0_1.9rem_0_0] flex flex-row justify-center p-[1.1rem_0.7rem_1.1rem_0] w-[20rem] h-[5rem] box-sizing-border transform transition-transform hover:scale-110 transition duration-300 ease-in-out">
          <div className="flex flex-row justify-center box-sizing-border">
            <span className="relative m-[0_3.5rem_2rem_3.6rem] break-words font-semibold text-[1.5rem] text-[#962203]">
              Login
            </span>
          </div>
        </div>
        </Link>
        <Link href="/signup">
        <div className="rounded-[2rem] bg-[#FFFFFF] relative flex flex-row justify-center p-[1.1rem_0.3rem_1.1rem_0] w-[20rem] h-[5rem] box-sizing-border transform transition-transform hover:scale-110 transition duration-300 ease-in-out">
          <div className="flex flex-row justify-center box-sizing-border">
            <span className="relative m-[0rem_4.2rem_2rem_3.6rem] break-words font-semibold text-[1.5rem] text-[#962203]">
              Sign up
            </span>
          </div>
        </div>
        </Link>
      </div>

    </div>
  )
}

export default NavigateBusiness

