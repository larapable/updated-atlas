import { NextResponse } from "next/server";
import Bsc from "@/models/bsc.js";

export async function GET(req, { params }) {
  try {
    const department_id = params;
    console.log(
      "Fetching learning scorecard for department ID: ",
      department_id
    );

    if (!department_id) {
      console.error("Department ID is undefined.");
      return NextResponse.json(
        { message: "Department ID is required." },
        { status: 400 }
      );
    }

    const learning_bsc = await Bsc.getLearningBSCByDepartmentId(department_id);

    if (!learning_bsc) {
      console.error(
        "Learning Scorecard not found for department ID: ",
        department_id
      );
      return NextResponse.json(
        { message: "Learning Scorecard not found." },
        { status: 404 }
      );
    }
    console.log("Learning Scorecard: ", learning_bsc);
    return NextResponse.json({ learning_bsc }, { status: 200 });
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
