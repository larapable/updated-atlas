import { NextResponse } from "next/server";
import FinancialEntity from '/models/stratmap/financial.js';

export async function POST(req) {
    try {
        const {input, department_id} = await req.json();

        const success = await FinancialEntity.postFinancialEntity(input, department_id);

        if (success) {
            return NextResponse.json({ message: "Financial entity registered." }, { status: 200 });
        } else {
            return NextResponse.json({ message: "An error occurred while registering the financial entity." }, { status: 500 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred while registering the financial entity." }, { status: 500 });
    }
}