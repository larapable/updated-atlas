import { NextResponse } from "next/server";
import Bsc from "@/models/bsc.js";

export async function POST(req) {
  try {

    const {
      department_id,
      target_code,
      office_target,
      start_date,
      completion_date,
      status,
      key_performance_indicator,
      target_performance,
      actual_performance,
    } = await req.json();


    console.log("DeptId: ", department_id);
    console.log("TargetCode: ", target_code);
    console.log("OfficeTarget: ", office_target);
    console.log("StartDate: ", start_date);
    console.log("CompletionDate: ", completion_date);
    console.log("Status: ", status);
    console.log("KPI: ", key_performance_indicator);
    console.log("TargetPerformance: ", target_performance);
    console.log("ActualPerformance: ", actual_performance);
    
    // Insert the data into the database
    const insertedData = await Bsc.insertFinancialBscData(
      department_id,
      target_code,
      office_target,
      start_date,
      completion_date,
      status,
      key_performance_indicator,
      target_performance,
      actual_performance
    );

    // Check the result of the insert operation
    if (insertedData) {
      console.log("Data inserted successfully:", insertedData);
      // Return the inserted data in the response
      return NextResponse.json(
        {
          message: "Data inserted successfully",
          data: insertedData,
        },
        { status: 200 }
      );
    } else {
      console.log("Error occurred while inserting data");
      throw new Error("Error occurred while inserting data");
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
