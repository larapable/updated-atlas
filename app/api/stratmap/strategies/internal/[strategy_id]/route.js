import { NextResponse } from "next/server";
import InternalProcess from "/models/stratmap/internalProcess.js";

export async function DELETE(req, { params }) {
  const id = params.strategy_id;
  try {
    // Extract id from the request body
    const success = await InternalProcess.deleteIPEntity(id); // Pass id to deleteFinancialEntity
    if (success) {
      return NextResponse.json({ message: "IP entity deleted." }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An error occurred while deleting the IP entity." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the IP entity." },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.strategy_id;
    const { input, departmentId } = await req.json();
    const result = await InternalProcess.editIPentity(id, input, departmentId);
    if (result.success) {
      return NextResponse.json({ updatedIP: result.updatedIP }, { status: 200 });
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
