import { NextResponse } from "next/server";
import Bsc from "@/models/bsc.js";

export async function GET(req, { params }) {
  try {
    const department_id = params;
    console.log(
      "Fetching financial scorecard for department ID: ",
      department_id
    );

    if (!department_id) {
      console.error("Department ID is undefined.");
      return NextResponse.json(
        { message: "Department ID is required." },
        { status: 400 }
      );
    }

    const financial_bsc = await Bsc.getFinancialBSCByDepartmentId(
      department_id
    );

    if (!financial_bsc) {
      console.error(
        "Financial Scorecard not found for department ID: ",
        department_id
      );
      return NextResponse.json(
        { message: "Financial Scorecard not found." },
        { status: 404 }
      );
    }
    console.log("Financial Scorecard: ", financial_bsc);
    return NextResponse.json({ financial_bsc }, { status: 200 });
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
