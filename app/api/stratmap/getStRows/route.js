import { NextResponse } from 'next/server';
import getStRows from '/models/stratmap/getStRows.js';

export async function GET(req) {
    try {
        const rows = await getStRows.getRows();
    
        return NextResponse.json({ rows });
    } catch (error) {
        console.error("Error getting rows:", error);
        return NextResponse.json({ message: "An error occurred while getting rows." }, { status: 500 });
    }
}
