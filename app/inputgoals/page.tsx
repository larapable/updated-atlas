"use client";
import Navbar from "../components/Navbar";
import Inputgoals from "../components/Inputgoals";

export default function page() {
    return (
        <div className="flex flex-row bg-[#E9E9E9]">
            <div className="fixed top-0 left-0 w-full z-10">
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col mt-8 ml-[23.5rem]">
                <Inputgoals />
            </div>
        </div>
    );
}