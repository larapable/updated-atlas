"use client";
import Navbar from "../components/Navbar";
import Inputgoals from "../components/Inputgoals";

export default function page() {
    return (
        <div className="flex flex-row bg-[#E9E9E9]">
            <Navbar />
            <div className="flex-1 flex flex-col mt-8 ml-10">
                <Inputgoals />
            </div>
        </div>
    );
}