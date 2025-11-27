import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      );
    }

    if (!GOOGLE_CLIENT_ID) {
      return NextResponse.json(
        { error: 'Google OAuth is not configured' },
        { status: 500 }
      );
    }

    // Verify the Google ID token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      console.error('Google token verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      );
    }

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token payload' },
        { status: 401 }
      );
    }

    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email) {
      return NextResponse.json(
        { error: 'Email not provided by Google' },
        { status: 400 }
      );
    }

    // Check if user exists with this Google ID
    let user = await User.findOne({ googleId });

    if (!user) {
      // Check if user exists with this email (from local auth)
      user = await User.findOne({ email });

      if (user) {
        // Link Google account to existing user
        user.googleId = googleId;
        user.authProvider = 'google';
        user.emailVerified = email_verified || false;
        if (picture && !user.profilePic) {
          user.profilePic = picture;
        }
        await user.save();
      } else {
        // Create new user
        const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
        user = await User.create({
          username,
          email,
          fullName: name || email.split('@')[0],
          googleId,
          authProvider: 'google',
          emailVerified: email_verified || false,
          profilePic: picture || '',
        });
      }
    } else {
      // Update existing Google user info if needed
      if (picture && !user.profilePic) {
        user.profilePic = picture;
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Return user info and token
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      bio: user.bio,
      phone: user.phone,
      location: user.location,
    };

    const response = NextResponse.json(
      { message: 'Google authentication successful', user: userResponse, token },
      { status: 200 }
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
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
