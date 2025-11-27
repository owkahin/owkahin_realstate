import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id: targetUserId } = await params;
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = decoded.userId;

    // Remove from following of current user
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    });

    // Remove from followers of target user
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUserId },
    });

    return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
