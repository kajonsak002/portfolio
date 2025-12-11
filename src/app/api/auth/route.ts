import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const adminPath = path.join(process.cwd(), 'src/data/admin.json');

// Generate a secure access token
function generateAccessToken(username: string): string {
    const timestamp = Date.now();
    const payload = `${username}:${timestamp}`;
    const secret = process.env.AUTH_SECRET || 'portfolio-admin-secret-key';
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return Buffer.from(`${payload}:${signature}`).toString('base64');
}

// Validate access token
export function validateAccessToken(token: string): boolean {
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const parts = decoded.split(':');

        if (parts.length !== 3) return false;

        const [username, timestamp, signature] = parts;
        const payload = `${username}:${timestamp}`;
        const secret = process.env.AUTH_SECRET || 'portfolio-admin-secret-key';
        const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

        // Check signature
        if (signature !== expectedSignature) return false;

        // Check if token is expired (24 hours)
        const tokenTime = parseInt(timestamp);
        const now = Date.now();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (now - tokenTime > maxAge) return false;

        return true;
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const data = await fs.readFile(adminPath, 'utf-8');
        const admin = JSON.parse(data);

        if (username === admin.username && password === admin.password) {
            // Generate secure access token
            const accessToken = generateAccessToken(username);

            const response = NextResponse.json({
                success: true,
                access_token: accessToken
            });

            response.cookies.set('admin_session', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');
    return response;
}

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (session?.value && validateAccessToken(session.value)) {
        return NextResponse.json({ authenticated: true, valid: true });
    }

    return NextResponse.json({ authenticated: false, valid: false });
}
