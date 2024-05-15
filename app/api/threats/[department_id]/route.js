import { NextResponse } from "next/server";
import Swot from '/models/Swot.js';


export async function GET(req, { params }) {
  try {
    const { department_id } = params;
    console.log("GET:", department_id);

   
    const { success, threats, message } = await Swot.getThreatsByDepartmentId(department_id);

    if (success) {

      return NextResponse.json(threats);
    } else {

      return NextResponse.error(new Error(message));
    }
  } catch (error) {
    console.error('Error fetching threats:', error);
    return NextResponse.error(new Error('An unexpected error occurred'));
  }
}