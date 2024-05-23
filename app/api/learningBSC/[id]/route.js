import { NextResponse } from "next/server";
import Bsc from "@/models/bsc.js";

export async function PUT(req) {
  try {
    const {
      id, // Ensure you pass the unique identifier for the record you want to update
      target_code,
      office_target,
      start_date,
      completion_date,
      status,
      key_performance_indicator,
      target_performance,
      actual_performance,
    } = await req.json();

    // Log the data for debugging
    console.log("Updating data for ID:", id);

    // Update the data in the database
    const updatedData = await Bsc.updateLearningBscData(
      id,
      target_code,
      office_target,
      start_date,
      completion_date,
      status,
      key_performance_indicator,
      target_performance,
      actual_performance
    );

    // Check the result of the update operation
    if (updatedData) {
      console.log("Data updated successfully:", updatedData);
      // Return the updated data in the response
      return NextResponse.json(
        {
          message: "Data updated successfully",
          data: updatedData,
        },
        { status: 200 }
      );
    } else {
      console.log("Error occurred while updating data");
      throw new Error("Error occurred while updating data");
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
