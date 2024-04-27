"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {

   const[newName, setName] = useState("");
   const {data: session,status, update } = useSession();
   console.log("useSession Hook session object", session)

   const username = session?.user?.email;

   return (
    <>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      <h2>Hi! {username}</h2>
    </>
  );
  
}
  