import {NextResponse} from "next/server"
import Swot from '../../models/Swot';

export async function POST(req) {
    try {
        const { value, department_id } = await req.json();
        const newWeakness = await Swot.addWeakness(value, department_id);
        console.log("Results:", newWeakness);
        return NextResponse.json({ message: "Weakness added successfully.", newWeakness }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in adding weakness." }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, newValue, department_id } = await req.json();
        const updatedwks = await Swot.editWeakness(id, newValue, department_id);
        console.log("Results:", updatedwks);
        console.log("ResultsWithID:", updatedwks.updatedWeakness.id);
        return NextResponse.json({ message: "Weakness updated successfully.", updatedwks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in updating weakness." }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id, department_id } = await req.json();
        await Swot.deleteWeakness(id, department_id);
        return NextResponse.json({ message: "Weakness deleted successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in deleting weakness." }, { status: 500 });
    }
}