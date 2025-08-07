import { NextRequest, NextResponse } from 'next/server';
import { getFinalEmailList } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Get all emails from the final email list
    const emails = await getFinalEmailList();
    
    return NextResponse.json({
      success: true,
      data: {
        emails: emails,
        count: emails.length,
        timestamp: new Date().toISOString()
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching final email list:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch email list'
    }, { status: 500 });
  }
}