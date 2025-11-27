import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const decoded = verifyToken(req);

    // If authenticated, exclude self from recommendations
    const currentUserId = decoded?.userId;

    let query = {};
    if (currentUserId) {
      query = { _id: { $ne: currentUserId } };
    }

    // Simple recommendation: just return latest users
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-password');

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
