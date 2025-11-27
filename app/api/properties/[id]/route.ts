import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Property from '@/models/Property';
import User from '@/models/User'; // Import User to ensure schema is registered for populate

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Ensure User model is registered before population
    // This is sometimes needed in serverless environments if User hasn't been used yet
    const _ = User; 

    const property = await Property.findById(params.id).populate('owner', 'username email profilePicture');
    
    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
