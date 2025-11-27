import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = decoded.userId;

    // Find all messages where current user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    }).sort({ createdAt: -1 });

    // Extract unique user IDs
    const userIds = new Set();
    messages.forEach((msg) => {
      if (msg.sender.toString() !== currentUserId) userIds.add(msg.sender.toString());
      if (msg.receiver.toString() !== currentUserId) userIds.add(msg.receiver.toString());
    });

    // Fetch user details
    const users = await User.find({ _id: { $in: Array.from(userIds) } }).select(
      'username fullName profilePic'
    );

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
