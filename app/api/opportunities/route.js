import {NextResponse} from "next/server"
import Swot from '/models/swot.js';

export async function POST(req) {
    try {
        const { value, department_id } = await req.json();
        const newOpportunities = await Swot.addOpportunities(value, department_id);
        console.log("Results:", newOpportunities);
        return NextResponse.json({ message: "Opportunities added successfully.", newOpportunities }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in adding opportunites." }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, newValue, department_id } = await req.json();
        const updatedOpp = await Swot.editOpportunities(id, newValue, department_id);
        console.log("Results:", updatedOpp);
        console.log("ResultsWithID:", updatedOpp.updatedOpportunities.id);
        return NextResponse.json({ message: "Opportunities updated successfully.", updatedOpp }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in updating opportunites." }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id, department_id } = await req.json();
        await Swot.deleteOpportunities(id, department_id);
        return NextResponse.json({ message: "Opportunities deleted successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in deleting opportunities." }, { status: 500 });
    }
}