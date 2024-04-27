"use client";
import UserHeader from "@/app/components/UserHeader";
import Navbar from "@/app/components/Navbar";
import UserEditProfile from "@/app/components/EditProfile";

export default function EditProfile() {
  return (
    <div className="flex flex-row w-full bg-[#E9E9E9]">
      <Navbar/>
      <div className="flex-1">
        <UserHeader />
        <div className="flex-1 flex flex-col mt-8 ml-10">
          <UserEditProfile />
        </div>
      </div>
    </div>
  );
}
