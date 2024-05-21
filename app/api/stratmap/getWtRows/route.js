import { NextResponse } from 'next/server';
import getWtRows from '/models/stratmap/getWtRows.js';

export async function GET(req) {
    try {
        const rows = await getWtRows.getRows();

        return NextResponse.json({ rows });
    } catch (error) {
        console.error("Error getting rows:", error);
        return NextResponse.json({ message: "An error occurred while getting rows." }, { status: 500 });
    }
}
