import {NextResponse} from "next/server"
import Swot from '@/models/Swot.js';

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