import { NextResponse } from "next/server";
import Swot from '@/models/Swot.js';


export async function GET(req, { params }) {
  try {
    const { department_id } = params;
    console.log("GET:", department_id);

    // Fetch department details from the database
    const { success, strengths, message } = await Swot.getStrengthsByDepartmentId(department_id);

    if (success) {
      // If successful, return a JSON response with the fetched strengths
      return NextResponse.json(strengths);
    } else {
      // If not successful, return an error response
      return NextResponse.error(new Error(message));
    }
  } catch (error) {
    console.error('Error fetching strengths:', error);
    // Return an error response if an unexpected error occurs
    return NextResponse.error(new Error('An unexpected error occurred'));
  }
}