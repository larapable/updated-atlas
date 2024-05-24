import { NextResponse } from "next/server";
import StakeholderEntity from "/models/stratmap/stakeholder.js";

export async function DELETE(req, { params }) {
  const id = params.strategy_id;
  try {
    // Extract id from the request body
    const success = await StakeholderEntity.deleteStakeholderEntity(id); // Pass id to deleteFinancialEntity
    if (success) {
      return NextResponse.json({ message: "Stakeholder entity deleted." }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An error occurred while deleting the Stakeholder entity." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the Stakeholder entity." },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.strategy_id;
    const { input, departmentId } = await req.json();
    const result = await StakeholderEntity.editStakeholderEntity(id, input, departmentId);
    if (result.success) {
      return NextResponse.json({ stakeholderUpdated: result.stakeholderUpdated }, { status: 200 });
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
