import { NextResponse } from "next/server";
import FinancialEntity from "/models/stratmap/financial.js";

export async function DELETE(req, { params }) {
  const id = params.strategy_id;
  try {
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

export async function PUT(req, { params }) {
  try {
    const id = params.strategy_id;
    const { input, departmentId } = await req.json();
    const result = await FinancialEntity.editFinancialEntity(id, input, departmentId);
    if (result.success) {
      return NextResponse.json({ updatedFinancial: result.updatedFinancial }, { status: 200 });
    } else {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the financial entity." },
      { status: 500 }
    );
  }
}
