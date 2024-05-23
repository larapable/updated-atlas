import { NextResponse } from "next/server";
import Department from "@/models/department";

// GET function
export async function GET(req, { params }) {
  try {
    const departmentId = params;
    console.log("Fetching department image for departmentId:", departmentId);

    // Check if departmentId is undefined
    if (!departmentId) {
      console.error("Department ID is undefined.");
      return NextResponse.json(
        { message: "Department ID is required." },
        { status: 400 }
      );
    }

    // Fetch department image from the database
    const departmentImage = await Department.getDepartmentImage(departmentId);

    if (!departmentImage) {
      console.error("Image not found for departmentId:", departmentId);
      return NextResponse.json(
        { message: "Image not found." },
        { status: 404 }
      );
    }
    const { imageData, imageFormat } = departmentImage;

    console.log("Returning department image for departmentId:", departmentId);

    // Convert the image data to a base64 string
    const base64Image = Buffer.from(imageData).toString("base64");

    // Return the base64 image data and format
    return NextResponse.json(
      { imageData: base64Image, imageFormat },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching department image:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching department image." },
      { status: 500 }
    );
  }
}
