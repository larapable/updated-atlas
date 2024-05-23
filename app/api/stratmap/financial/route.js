import { NextResponse } from "next/server";
import FinancialEntity from "/models/stratmap/financial.js";

export async function POST(req) {
  try {
    const { input, department_id } = await req.json();

    const success = await FinancialEntity.postFinancialEntity(input, department_id);

    if (success) {
      return NextResponse.json({ message: "Financial entity registered." }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An error occurred while registering the financial entity." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the financial entity." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, input, department_id } = await req.json();
    const success = await FinancialEntity.editFinancialEntity(id, input, department_id);
    if (success) {
      return NextResponse.json({ message: "Financial entity updated." }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An error occurred while updating the financial entity." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the financial entity." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    // Extract id from the request body
    const success = await FinancialEntity.deleteFinancialEntity(id); // Pass id to deleteFinancialEntity
    if (success) {
      return NextResponse.json({ message: "Financial entity deleted." }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An error occurred while deleting the financial entity." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the financial entity." },
      { status: 500 }
    );
  }
}
