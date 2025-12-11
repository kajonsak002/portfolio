import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { generateAccessToken, validateAccessToken } from '@/lib/auth';

const adminPath = path.join(process.cwd(), 'src/data/admin.json');

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
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');

    if (session?.value && validateAccessToken(session.value)) {
        return NextResponse.json({ authenticated: true, valid: true });
    }

    return NextResponse.json({ authenticated: false, valid: false });
}
