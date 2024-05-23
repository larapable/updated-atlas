import { NextResponse } from "next/server";
import Swot from '/models/swot.js';


export async function GET(req, { params }) {
  try {
    const { department_id } = params;
    console.log("GET:", department_id);

   
    const { success, weaknesses, message } = await Swot.getWeaknessByDepartmentId(department_id);

    if (success) {

      return NextResponse.json(weaknesses);
    } else {

      return NextResponse.error(new Error(message));
    }
  } catch (error) {
    console.error('Error fetching weakness:', error);
    return NextResponse.error(new Error('An unexpected error occurred'));
  }
}