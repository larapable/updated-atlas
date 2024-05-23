import {NextResponse} from "next/server"
import Swot from '../models/Swot.js';

export async function POST(req) {
    try {
        const { value, department_id } = await req.json();
        const newStrength = await Swot.addStrength(value, department_id);
        console.log("Results:", newStrength);
        console.log("New Strength ID:", newStrength.data.id);
        return NextResponse.json({ message: "Strength added successfully.", newStrength }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in adding strength." }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, newValue, department_id } = await req.json();
        const updatedstr= await Swot.editStrength(id, newValue, department_id);
        console.log("Results:", updatedstr);
        console.log("ResultsWithID:", updatedstr.updatedStrength.id);
        return NextResponse.json({ message: "Strength updated successfully.", updatedstr }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in updating strength." }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id, department_id } = await req.json();
        await Swot.deleteStrength(id, department_id);
        return NextResponse.json({ message: "Strength deleted successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in deleting strength." }, { status: 500 });
    }
}