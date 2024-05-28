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
            isNew,
        } = await req.json();
 
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedEndDate);
 
        if (isNew) {
            // Insert new goals
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
            return NextResponse.json({ message: "New goals added." }, { status: 201 });
        } else {
            // Update existing goals
            const existingData = await Goals.getLatestGoalsByDepartmentId(department_id);
            if (existingData) {
                const { id } = existingData; // Extract the ID from the existing data
                await Goals.updateGoalsById(id, officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, startDate, endDate);
                return NextResponse.json({ message: "Goals updated." }, { status: 200 });
            } else {
                return NextResponse.json({ message: "No existing goals found to update." }, { status: 404 });
            }
 
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "An error occurred while handling the request." },
            { status: 500 }
        );
    }
}