import { NextResponse } from "next/server";
import User from "@/models/user.js";
import Department from "@/models/department.js";

export async function POST(req) {
  try {
    const { username, email, password, department_id } = await req.json();

    await User.register(username, email, password, department_id);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured while registering the user.",
      },
      { status: 500 }
    );
  }
}