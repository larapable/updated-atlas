import { NextResponse } from "next/server";
import WOStrat from '/models/woStrategy.js';

export async function GET(req, { params }) {
  try {
    const { department_id } = params;
    console.log("GET:", department_id);

    // Fetch W-T strategies by department_id
    const result = await WOStrat.getWOStrat(department_id);

    // Check if the result exists
    if (result) {
      // Return the fetched W-T strategies
      return NextResponse.json(result);
    } else {
      // Return an error if fetching fails
      return NextResponse.error(new Error('Failed to fetch W-O strategies'));
    }
  } catch (error) {
    console.error('Error fetching W-O strategies:', error);
    return NextResponse.error(new Error('An unexpected error occurred'));
  }
}
