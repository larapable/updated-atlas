import excuteQuery from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const username = params.username;

    // Fetch the user data from the database
    const [user] = await excuteQuery({
      query: "SELECT generatedAiStrats FROM users WHERE username = ?",
      values: [username],
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Return the generatedAiStrats value
    return NextResponse.json({ generatedAiStrats: user.generatedAiStrats });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const username = params.username;

    // Fetch the user data from the database
    const [user] = await excuteQuery({
      query: "SELECT generatedAiStrats FROM users WHERE username = ?",
      values: [username],
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // If generatedAiStrats is 0, update it to 1
    if (user.generatedAiStrats === 0) {
      await excuteQuery({
        query: "UPDATE users SET generatedAiStrats = 1 WHERE username = ?",
        values: [username],
      });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
