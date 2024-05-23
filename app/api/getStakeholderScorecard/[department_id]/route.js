import { NextResponse } from "next/server";
import Bsc from "@/models/bsc.js";

export async function GET(req, { params }) {
  try {
    const department_id = params;
    console.log(
      "Fetching stakeholder scorecard for department ID: ",
      department_id
    );

    if (!department_id) {
      console.error("Department ID is undefined.");
      return NextResponse.json(
        { message: "Department ID is required." },
        { status: 400 }
      );
    }

    const stakeholder_bsc = await Bsc.getStakeholderBSCByDepartmentId(
      department_id
    );

    if (!stakeholder_bsc) {
      console.error(
        "Stakeholder Scorecard not found for department ID: ",
        department_id
      );
      return NextResponse.json(
        { message: "Stakeholder Scorecard not found." },
        { status: 404 }
      );
    }
    console.log("Stakeholder Scorecard: ", stakeholder_bsc);
    return NextResponse.json({ stakeholder_bsc }, { status: 200 });
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
