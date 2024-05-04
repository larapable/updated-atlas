import { NextResponse } from "next/server";
import STStrat from '/models/stStrategy.js';

  export async function POST(req) {
    try {
      const body = await req.json();
      const { id, response: newStrategy } = body;

      try {
        // Assuming your model has a method to insert a new strategy
        const insertedId = await STStrat.postSTStrat(id, newStrategy);

        if (insertedId) {
          return NextResponse.json({ message: "S-T Strategy created successfully", id: insertedId });
        } else {
          return NextResponse.json({ message: "Failed to create S-T Strategy" }, { status: 500 });
        }
      } catch (error) {
        console.error("Error creating S-T Strategy:", error);
        return NextResponse.json({ message: "An error occurred while creating the S-T Strategy." }, { status: 500 });
      }
    } catch (error) {
      console.error("Error handling request:", error);
      return NextResponse.json({ message: "An error occurred while handling the request." }, { status: 500 });
    }
  }

export async function PUT(req) {
    try {
      const body = await req.json();
      const { id, response: updatedStrategy } = body; // Get ID and updated strategy text from the request body
  
      try {
        // Assuming your model has a method to update by ID
        const updatedCount = await STStrat.updateSTStratById(id, updatedStrategy);
  
        if (updatedCount > 0) {
          return NextResponse.json({ message: "S-T Strategy updated successfully" });
        } else {
          return NextResponse.json({ message: "S-T Strategy not found" }, { status: 404 });
        }
      } catch (error) {
        console.error("Error updating S-T Strategy:", error);
        return NextResponse.json({ message: "An error occurred while updating the S-T Strategy." }, { status: 500 });
      }
    } catch (error) {
      console.error("Error handling request:", error);
      return NextResponse.json({ message: "An error occurred while handling the request." }, { status: 500 });
    }
  }