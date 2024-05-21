import { NextResponse } from "next/server";
import Goals from '/models/goals.js';

export async function POST(req) {
    try {
        const {
            officeVision,
            valueProposition,
            strategicGoals,
            strategicGoals2,
            strategicGoals3,
            selectedDate,
            selectedEndDate,
            department_id,
        } = await req.json();

        // Parse selectedDate and selectedEndDate without modification
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedEndDate);

        await Goals.postGoals(
            officeVision,
            valueProposition,
            strategicGoals,
            strategicGoals2,
            strategicGoals3,
            startDate,
            endDate,
            department_id
        );

        return NextResponse.json(
            { message: "New goals created." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "An error occurred while handling the request." },
            { status: 500 }
        );
    }
}
