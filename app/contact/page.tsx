import React from 'react'
import { Button } from "@mui/material";
import ContactsPage from '../components/ContactsPage';
import Link from 'next/link'

const page = () => {
  return (
    <div className="h-screen flex lg:flex-row md:flex-col">
      <div className="flex flex-col items-center lg:ml-60 lg:mt-28 md:mt-8 md:ml-13 ">
        <div className="font-bold lg:text-[4.1rem] lg:mb-18 md:text-[4rem] md:mb-10 mt-[-3rem]">Contact our team</div>
        <div className="m-[-2rem_0_3rem_0.3rem] inline-block break-words font-normal text-[1.3rem] text-[#686666]">
          Let’s explore how the team can work for you.
        </div>
          <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[50rem] flex items-center mb-6 py-4">
          <div className="flex flex-row items-center ml-5">
          <img className="m-[1rem_1.2rem_2.7rem_0] w-[1.5rem] h-[1.5rem]" 
            src="c-check.png"
            alt="Maroon Check"
          />
          <span className="break-words font-normal text-[1.3rem] text-[#000000]">
              Our team comprises highly skilled professionals
              with expertise in their respective fields, ensuring
              top-notch quality and results for our clients.
            </span>
          </div>
          </div>
        <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[50rem] mb-6 py-4 flex items-center">
        <div className="flex flex-row items-center ml-5">
        <img className="m-[1rem_1.2rem_2.7rem_0] w-[1.5rem] h-[1.5rem]" 
          src="c-check.png"
          alt="Maroon Check"
        />
        <span className="break-words font-normal text-[1.3rem] text-[#000000]">
            We value collaboration and work closely with our 
            clients every step of the way, ensuring their vision 
            and goals are met with precision and excellence.
          </span>
        </div>
        </div>

        <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[50rem] mb-6 py-4 flex items-center">
        <div className="flex flex-row items-center ml-5">
        <img className="m-[1rem_1.2rem_2.7rem_0] w-[1.5rem] h-[1.5rem]" 
          src="c-check.png"
          alt="Maroon Check"
        />
        <span className="break-words font-normal text-[1.3rem] text-[#000000]">
            Our clients are at the heart of everything we do. 
            We prioritize their needs, preferences, and 
            satisfaction.
          </span>
        </div>
        </div> 

        <Button className="rounded-lg bg-[#8a252c] text-white font-bold text-xl w-[38rem] px-12 py-5 border[0.1rem] border-white mb-4 hover:bg-[#eec160] hover:text-[#8a252c] mt-10">
          <Link href="/team">View Team</Link>
        </Button>

        <div className="flex flex-row items-center">
          <div className="flex-1 bg-[#807979] h-0.5 w-[17.3rem]"></div>
          <div className="mx-4 text-bold">or</div>
          <div className="flex-1 bg-[#807979] h-0.5 w-[17.3rem]"></div>
        </div>
        <a
          href="/"
          className="text-2xl text-[#8a252c] font-bold lg:mt-4 md:mb-16 hover:underline"
        >
          Back Home
        </a>
      </div>
      <ContactsPage />
    </div>
  )
}

export default page