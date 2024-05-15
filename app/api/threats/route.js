import {NextResponse} from "next/server"
import Swot from '@/models/Swot.js';

export async function POST(req) {
    try {
        const { value, department_id } = await req.json();
        const newThreats = await Swot.addThreats(value, department_id);
        console.log("Results:", newThreats);
        return NextResponse.json({ message: "Threats added successfully.", newThreats }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in adding threats." }, { status: 500 });
    }
}
