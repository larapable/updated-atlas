import {NextResponse} from "next/server"
import Swot from '/models/Swot';

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


export async function PUT(req) {
    try {
        const { id, newValue, department_id } = await req.json();
        const updatedthr = await Swot.editThreats(id, newValue, department_id);
        console.log("Results:", updatedthr);
        console.log("ResultsWithID:", updatedthr.updatedThreats.id);
        return NextResponse.json({ message: "Threats updated successfully.", updatedthr }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in updating threats." }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id, department_id } = await req.json();
        await Swot.deleteThreats(id, department_id);
        return NextResponse.json({ message: "Threats deleted successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred in deleting threats." }, { status: 500 });
    }
}
