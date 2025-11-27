import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Fallback for dev

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, email, password, fullName } = await req.json();

    // Validate input
    if (!username || !email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      fullName,
    });

    // Generate Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Return user info (excluding password) and token
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    };

    const response = NextResponse.json(
      { message: 'User registered successfully', user: userResponse, token }, // Include token for mobile apps
      { status: 201 }
    );

    // Set HTTP-only cookie for web
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
