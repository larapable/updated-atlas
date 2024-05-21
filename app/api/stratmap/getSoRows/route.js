import { NextResponse } from 'next/server';
import getSoRows from '/models/stratmap/getSoRows.js';

export async function GET(req) {
    try {
        const rows = await getSoRows.getRows();
    
        return NextResponse.json({ rows });
    } catch (error) {
        console.error("Error getting rows:", error);
        return NextResponse.json({ message: "An error occurred while getting rows." }, { status: 500 });
    }
}
