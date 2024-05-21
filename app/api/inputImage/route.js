import { NextResponse } from "next/server";
import Department from "@/models/department";

// POST function
export async function POST(req) {
  try {
    const formData = await req.formData();
    const departmentId = formData.get("department_id");
    const image = formData.get("image");
    const imageFormat = formData.get("image_format"); // Get the image format from the form data

    console.log("Received departmentId for image:", departmentId);
    console.log("Received image:", image); // Check if the image data is being received correctly
    console.log("Received image format:", imageFormat); // Log the received image format

    // Read the image data and convert it to a Buffer
    const chunks = [];
    for await (const chunk of image.stream()) {
      chunks.push(chunk);
    }
    const imageData = Buffer.concat(chunks);

    // Fetch department details from the database
    const department = await Department.getDepartmentDetailsById(departmentId);

    if (!department) {
      console.error("Department not found for departmentId:", departmentId);
      return NextResponse.json(
        { message: "Department not found." },
        { status: 404 }
      );
    }

    console.log("Saving department image for departmentId:", departmentId);

    // Check if an image already exists for the department
    const imageExists = await Department.imageExists(departmentId);

    let result;
    if (imageExists) {
      // If an image exists, update it
      result = await Department.updateDepartmentImage(departmentId, imageData, imageFormat);
    } else {
      // If no image exists, insert a new one
      result = await Department.insertDepartmentImage(departmentId, imageData, imageFormat);
    }

    if (result) {
      console.log("Department image saved successfully.");
      return NextResponse.json(
        { message: "Department image saved successfully." },
        { status: 200 }
      );
    } else {
      console.error(
        "Failed to save department image for departmentId:",
        departmentId
      );
      return NextResponse.json(
        { message: "Failed to save department image." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error saving department image:", error);
    return NextResponse.json(
      { message: "An error occurred while saving department image." },
      { status: 500 }
    );
  }
}