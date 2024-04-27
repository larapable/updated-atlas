"use client";
import UserHeader from "@/app/components/UserHeader";
import Navbar from "../components/Navbar";
import { Card } from "@mui/material";
import { useState } from "react";
import UserProfile from "@/app/components/UserProfile";

export default function Profile() {
  return (
    <div className="flex flex-row w-full bg-[#E9E9E9]">
      <Navbar />
      <div className="flex-1">
        <UserHeader />
        <div className="flex-1 flex flex-col mt-8 ml-10">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
