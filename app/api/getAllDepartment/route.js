import { NextResponse } from "next/server";
import Department from "@/models/department.js";

export async function GET(req) {
  try {
    const departments = await Department.getAllDepartments();

    console.log("Departments: ", departments);
    return NextResponse.json({ departments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while fetching departments.",
      },
      { status: 500 }
    );
  }
}