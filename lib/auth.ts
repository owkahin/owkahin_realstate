import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export function verifyToken(req: NextRequest): DecodedToken | null {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
}

// For mobile app - authenticate from Authorization header
export async function authenticateToken(req: NextRequest): Promise<{ userId: string } | NextResponse> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return NextResponse.json(
        { error: 'Access token required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    return { userId: decoded.userId };
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 403 }
    );
  }
}
