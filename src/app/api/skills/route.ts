import { NextResponse } from 'next/server';
import { readBlobData, writeBlobData } from '@/lib/blob';

interface SkillsData {
    skills: Array<{ id: string; name: string; icon: string }>;
    techStack: Array<{ id: string; name: string; items: string[] }>;
}

export async function GET() {
    try {
        const data = await readBlobData<SkillsData>('skills.json');
        return NextResponse.json(data);
    } catch (error) {
        console.error('Failed to read skills:', error);
        return NextResponse.json({ error: 'Failed to read skills' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await writeBlobData('skills.json', body);
        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error('Failed to update skills:', error);
        return NextResponse.json({ error: 'Failed to update skills' }, { status: 500 });
    }
}
