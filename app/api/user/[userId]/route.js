import { NextResponse } from 'next/server';
import excuteQuery from '@/lib/db.js';

export async function GET(request, { params }) {
  try {
    const userId = params.userId;

    // Fetch the user data from the database
    const [user] = await excuteQuery({
      query: 'SELECT generatedAiStrats FROM users WHERE id = ?',
      values: [userId],
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Return the generatedAiStrats value
    return NextResponse.json({ generatedAiStrats: user.generatedAiStrats });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}