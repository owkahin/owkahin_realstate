import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import { verifyToken } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiverId, content } = await req.json();

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'Receiver ID and content are required' },
        { status: 400 }
      );
    }

    const message = await Message.create({
      sender: decoded.userId,
      receiver: receiverId,
      content,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
