import { NextResponse } from "next/server";
import Bsc from "@/models/bsc.js";

export async function GET(req, { params }) {
  try {
    const department_id = params;
    console.log("Fetching financial data for department ID: ", department_id);

    if (!department_id) {
      console.error("Department ID is undefined.");
      return NextResponse.json(
        { message: "Department ID is required." },
        { status: 400 }
      );
    }

    const financial_entity = await Bsc.getFinancialByDepartmentId(department_id);

    if (!financial_entity) {
      console.error(
        "Financial data not found for department ID: ",
        department_id
      );
      return NextResponse.json(
        { message: "Financial data not found." },
        { status: 404 }
      );
    }
    console.log("Financial Data: ", financial_entity);
    return NextResponse.json({ financial_entity }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching bsc data.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
