import { NextResponse } from "next/server";
import LearningGrowthEntity from "/models/stratmap/learningGrowth.js";

export async function DELETE(req, { params }) {
  const id = params.strategy_id;
  try {
    // Extract id from the request body
    const success = await LearningGrowthEntity.deleteLGEntity(id); // Pass id to deleteFinancialEntity
    if (success) {
      return NextResponse.json({ message: "LG entity deleted." }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An error occurred while deleting the LG entity." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the LG entity." },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.strategy_id;
    const { input, departmentId } = await req.json();
    const result = await LearningGrowthEntity.editLGEntity(id, input, departmentId);
    if (result.success) {
      return NextResponse.json({ updatedLG: result.updatedLG }, { status: 200 });
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
