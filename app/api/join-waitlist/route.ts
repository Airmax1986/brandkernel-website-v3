import { NextRequest, NextResponse } from 'next/server';

// Types for the API
interface WaitlistRequest {
  email: string;
  source?: string;
  timestamp?: string;
  sendWelcomeEmail?: boolean;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    position?: number;
    totalSignups?: number;
    emailSent?: boolean;
  };
  error?: string;
}

// In-memory storage (replace with database in production)
let waitlistEmails: Set<string> = new Set();
let signupCount = 247; // Starting count

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send welcome email via Resend (simplified version)
async function sendWelcomeEmail(email: string, position: number): Promise<boolean> {
  try {
    // Check if Resend API key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not found, skipping email send');
      return false;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BrandKernel <noreply@brandkernel.com>',
        to: [email],
        subject: 'Welcome to BrandKernel Waitlist! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #957FFF; font-size: 28px; margin: 0;">BrandKernel</h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #DAFF96 0%, #957FFF 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h2 style="color: #000000; font-size: 24px; margin: 0 0 10px 0;">Welcome to the Waitlist!</h2>
              <p style="color: #000000; font-size: 16px; margin: 0;">You're now part of our exclusive early access community.</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #000000; font-size: 20px; margin-bottom: 15px;">What's Next?</h3>
              <ul style="color: #666666; font-size: 16px; line-height: 1.6; padding-left: 20px;">
                <li>We'll keep you updated on our progress</li>
                <li>You'll get early access when we launch</li>
                <li>Exclusive previews and behind-the-scenes content</li>
                <li>Special launch pricing just for waitlist members</li>
              </ul>
            </div>
            
            <div style="background: #EEEEF0; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
              <p style="color: #666666; font-size: 14px; margin: 0; text-align: center;">
                <strong>Your Position:</strong> You're #${position} on our waitlist!
              </p>
            </div>
            
            <div style="text-align: center; margin-bottom: 20px;">
              <p style="color: #666666; font-size: 14px;">
                Follow us for updates:
              </p>
              <div>
                <a href="#" style="color: #957FFF; text-decoration: none; margin: 0 10px;">Twitter</a>
                <a href="#" style="color: #957FFF; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                <a href="#" style="color: #957FFF; text-decoration: none; margin: 0 10px;">Instagram</a>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #EEEEF0;">
              <p style="color: #999999; font-size: 12px; margin: 0;">
                This email was sent to ${email} because you joined our waitlist.
                <br>
                BrandKernel Team
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('Welcome email sent successfully:', result.id);
    return true;

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistRequest = await request.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email is required',
          message: 'Please provide a valid email address'
        } as WaitlistResponse,
        { status: 400 }
      );
    }

    // Validate email format
    const email = body.email.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format',
          message: 'Please provide a valid email address'
        } as WaitlistResponse,
        { status: 400 }
      );
    }

    // Check if email already exists
    if (waitlistEmails.has(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email already registered',
          message: 'This email is already on our waitlist'
        } as WaitlistResponse,
        { status: 409 }
      );
    }

    // Add email to waitlist
    waitlistEmails.add(email);
    signupCount++;
    const position = signupCount;

    // Send welcome email if requested
    let emailSent = false;
    if (body.sendWelcomeEmail !== false) {
      emailSent = await sendWelcomeEmail(email, position);
    }

    // Log signup (replace with database insert in production)
    console.log(`New waitlist signup: ${email} (Position: ${position}, Email sent: ${emailSent})`);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: emailSent 
          ? 'Successfully joined the waitlist! Check your email for confirmation.'
          : 'Successfully joined the waitlist!',
        data: {
          email,
          position,
          totalSignups: signupCount,
          emailSent
        }
      } as WaitlistResponse,
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
      } as WaitlistResponse,
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve waitlist stats (optional)
export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: {
          totalSignups: signupCount,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist stats API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
