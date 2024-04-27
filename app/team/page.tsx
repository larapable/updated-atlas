import TeamsPage from '../components/TeamsPage'
import React from 'react'
import Link from 'next/link'
import { Button } from "@mui/material";

const page = () => {
  return (
      <div className="h-screen flex lg:flex-row md:flex-col">
      <div className="flex flex-col items-center lg:ml-[15rem] lg:mt-28 md:mt-8 md:ml-13 ">
      <div className="m-[1.3rem_0_0.6rem_0] flex flex-col items-center box-sizing-border">
        <div className="m-[-5rem_0_1.4rem_0] flex flex-row w-[fit-content] box-sizing-border">
          <div className="rounded-[1.3rem] bg-[#FCF3D5] relative m-[0_2.9rem_0.3rem_0] flex flex-col p-[12.4rem_0.6rem_0.8rem_1.4rem] h-[25rem] w-72 box-sizing-border">
            <div className="bg-[url('/profile-lara.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[0.6rem] top-[0.3rem] right-[0.6rem] h-[12.6rem]">
            </div>
            <div className="relative m-[0_0_0.3rem_0] inline-block self-start break-words font-regular text-[0.8rem] text-[#A09696]">
              Developer / Designer
            </div>
            <div className="m-[0_0_0.3rem_0] inline-block self-start break-words font-bold text-[1.3rem] text-[#962203]">
              Lara Pable
            </div>
            <div className="m-[0_0_0.6rem_0] inline-block break-words font-light text-[0.9rem] text-[#282626]">
              Lara, our visionary leader, <br />
              excels in strategic planning <br />
              and possesses a keen analytical <br />
              mind.
            </div>
            <div className="m-[0_2.1rem_0_0] flex flex-row self-center w-[3.6rem] box-sizing-border">
              <div className="m-[0_0.2rem_0_0] flex flex-row justify-center w-[2rem] h-[2rem] box-sizing-border">
              <a href="https://www.facebook.com/lara.pable" target="_blank" rel="noopener noreferrer">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-fb.png"
                alt="FB Icon"
                />
                </a>
              </div>
              <div className="flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-insta.png"
                alt="Insta Icon"
                />
              </div>
              
            </div>
          </div>
          <div className="rounded-[1.3rem] bg-[#FCF3D5] relative m-[0.3rem_3.1rem_0_0] flex flex-col p-[12.4rem_1.6rem_1.1rem_1.4rem] h-[25rem] w-72 box-sizing-border">
            <div className="bg-[url('/profile-ebeb.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[0.6rem] top-[0.3rem] right-[0.6rem] h-[12.6rem]">
            </div>
            <div className="relative m-[0_0_0.3rem_0] inline-block self-start break-words font-regular text-[0.8rem] text-[#A09696]">
              Developer / Designer
            </div>
            <div className="m-[0_0_0.3rem_0] inline-block self-start break-words font-bold text-[1.3rem] text-[#962203]">
              Genevieve Miao
            </div>
            <div className="m-[0_0_1.4rem_0] inline-block break-words font-light text-[0.9rem] text-[#282626]">
              Genevieve, our UI design <br />
              enthusiast, brings creativity <br />
              and innovation to every project.
            </div>
            <div className="m-[0_0.9rem_0_0] flex flex-row self-center w-[3.6rem] box-sizing-border">
              <div className="m-[0_0.2rem_0_0] flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
              <a href="https://www.facebook.com/genevieve.miao.14/" target="_blank" rel="noopener noreferrer">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-fb.png"
                alt="FB Icon"
                />
              </a>
              </div>
              <div className="flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-insta.png"
                alt="Insta Icon"
                />
              </div>
            </div>
          </div>
          <div className="rounded-[1.3rem] bg-[#FCF3D5] relative m-[0.3rem_0_0_0] flex flex-col p-[12.4rem_0.6rem_1.1rem_1.4rem] h-[25rem] w-72 box-sizing-border">
            <div className="bg-[url('/profile-arziel.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[0.6rem] top-[0.3rem] right-[0.6rem] h-[12.6rem]">
            </div>
            <div className="relative m-[0_0_0.3rem_0] inline-block self-start break-words font-regular text-[0.8rem] text-[#A09696]">
              Developer / Designer
            </div>
            <div className="m-[0_0_0.3rem_0] inline-block self-start break-words font-bold text-[1.3rem] text-[#962203]">
              Arziel Lawas
            </div>
            <div className="m-[0_0_1.4rem_0] inline-block break-words font-light text-[0.9rem] text-[#282626]">
              Arziel, our versatile UI designer, <br />
              is dedicated to creating intuitive <br />
              and user-friendly interfaces.
            </div>
            <div className="m-[0_0.9rem_0_0] flex flex-row self-center w-[3.6rem] box-sizing-border">
              <div className="m-[0_0.2rem_0_0] flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
              <a href="https://www.facebook.com/arzielmae.lawas.1" target="_blank" rel="noopener noreferrer">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-fb.png"
                alt="FB Icon"
                />
              </a>
              </div>
              <div className="flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-insta.png"
                alt="Insta Icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="m-[0_0_0_0.1rem] flex flex-row w-[fit-content] box-sizing-border">
          <div className="rounded-[1.3rem] bg-[#FCF3D5] relative m-[0_2.7rem_0.4rem_0] flex flex-col p-[12.4rem_0.8rem_0.8rem_1.3rem] h-[25rem] w-72 box-sizing-border">
            <div className="bg-[url('/profile-lyndon.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[0.6rem] top-[0.3rem] w-[15.6rem] h-[12.6rem]">
            </div>
            <div className="relative m-[0_0_0.3rem_0] inline-block self-start break-words font-regular text-[0.8rem] text-[#A09696]">
              Developer / Designer
            </div>
            <div className="m-[0_0.1rem_0.3rem_0.1rem] inline-block self-start break-words font-bold text-[1.3rem] text-[#962203]">
              Lyndon Trocio
            </div>
            <div className="m-[0_0_1.8rem_0] inline-block break-words font-light text-[0.9rem] text-[#282626]">
              Lyndon, our proficient back-end <br />
              developer, ensures that our <br />
              projects progress smoothly.
            </div>
            <div className="m-[0_1.7rem_0_0] flex flex-row self-center w-[3.6rem] box-sizing-border">
              <div className="m-[0_0.2rem_0_0] flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
              <a href="https://www.facebook.com/lyndonroy.trocio" target="_blank" rel="noopener noreferrer">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-fb.png"
                alt="FB Icon"
                />
              </a>
              </div>
              <div className="flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-insta.png"
                alt="Insta Icon"
                />
              </div>
            </div>
          </div>
          <div className="rounded-[1.3rem] bg-[#FCF3D5] relative m-[0.4rem_0_0_0] flex flex-col p-[12.4rem_0.8rem_0.9rem_1.4rem] h-[25rem] w-72 box-sizing-border">
            <div className="bg-[url('/profile-arvin.png')] bg-[50%_50%] bg-cover bg-no-repeat absolute left-[0.6rem] top-[0.3rem] w-[15.6rem] h-[12.6rem]">
            </div>
            <div className="relative m-[0_0_0.3rem_0] inline-block self-start break-words font-regular text-[0.8rem] text-[#A09696]">
              Developer / Designer
            </div>
            <div className="m-[0_0_0.3rem_0] inline-block self-start break-words font-bold text-[1.3rem] text-[#962203]">
              Arvin Santillan
            </div>
            <div className="m-[0_0_0.4rem_0] inline-block break-words font-light text-[0.9rem] text-[#282626]">
              Arvin, our proactive back-end <br />
              developer, consistently delivers <br />
              exceptional results ahead of <br />
              schedule.
            </div>
            <div className="m-[0_1rem_0_0] flex flex-row self-center w-[3.6rem] box-sizing-border">
              <div className="m-[0_0.2rem_0_0] flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
              <a href="https://www.facebook.com/arvinsantillan24" target="_blank" rel="noopener noreferrer">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-fb.png"
                alt="FB Icon"
                />
              </a>
              </div>
              <div className="flex flex-row justify-center w-[1.7rem] h-[1.7rem] box-sizing-border">
                <img className="w-[1.7rem] h-[1.7rem]" 
                src="c-insta.png"
                alt="Insta Icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      </div>
      <TeamsPage />
    </div>
  )
}

export default page