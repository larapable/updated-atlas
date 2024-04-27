import { NextResponse } from "next/server";
import Goals from '/models/goals.js';

export async function POST(req) {
    try {

        const{officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate} = await req.json();
        
        console.log("Vision: ", officeVision);
        console.log("Proposition: ", valueProposition);
        console.log("Goals: ", strategicGoals);

        const startDate = new Date(selectedDate).toISOString().slice(0, 19).replace('T', ' ');
        const endDate = new Date(selectedEndDate).toISOString().slice(0, 19).replace('T', ' ');

        await Goals.postGoals(officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, startDate, endDate);

        return NextResponse.json({ message:"User registered."}, 
        {status: 201});
    } catch(error)  {
        return NextResponse.json({
            message: "An error occured while registering the user."},
            {status: 500});
    }
}