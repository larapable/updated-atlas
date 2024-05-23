import { NextResponse } from "next/server";
import Swot from '/models/swot.js';


export async function GET(req, { params }) {
  try {
    const { department_id } = params;
    console.log("GET:", department_id);

   
    const { success, opportunities, message } = await Swot.getOpportunitiesByDepartmentId(department_id);

    if (success) {

      return NextResponse.json(opportunities);
    } else {

      return NextResponse.error(new Error(message));
    }
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.error(new Error('An unexpected error occurred'));
  }
}