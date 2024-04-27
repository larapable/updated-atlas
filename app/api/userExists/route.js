// route.js
import { NextResponse } from "next/server";
import User from '@/models/user.js';

export async function POST(req) {
    try {
        const { email } = await req.json();

        const user = await User.findOne(email);

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            message: "An error occurred while querying the user.",
            status: 500
        });
    }
}
