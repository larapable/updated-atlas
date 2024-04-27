// departmentExist.js
import { NextResponse } from "next/server";
import Department from '@/models/department.js';

export async function GET(req) {
    try {
        const { departmentId } = req.params; // Assuming departmentId is passed as a parameter

        // Fetch department details from the database
        const department = await Department.findById(departmentId);

        // If department is found, return its name
        if (department) {
            return NextResponse.json({ name: department.department_name });
        } else {
            // If department is not found, return a 404 error
            return NextResponse.json({
                message: "Department not found",
                status: 404
            });
        }
    } catch (error) {
        // If an error occurs, log it and return a 500 error
        console.error("Error:", error);
        return NextResponse.json({
            message: "An error occurred while processing the request.",
            status: 500
        });
    }
}
