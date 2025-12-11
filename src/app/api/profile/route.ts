import { NextResponse } from 'next/server';
import { readBlobData, writeBlobData } from '@/lib/blob';
import { Profile } from '@/types/portfolio';

export async function GET() {
    try {
        const profile = await readBlobData<Profile>('profile.json');
        return NextResponse.json(profile);
    } catch (error) {
        console.error('Failed to read profile:', error);
        return NextResponse.json({ error: 'Failed to read profile' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await writeBlobData('profile.json', body);
        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error('Failed to update profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
