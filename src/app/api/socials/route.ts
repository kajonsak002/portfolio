import { NextResponse } from 'next/server';
import { readBlobData, writeBlobData } from '@/lib/blob';
import { Social } from '@/types/portfolio';

export async function GET() {
    try {
        const socials = await readBlobData<Social[]>('socials.json');
        return NextResponse.json(socials);
    } catch (error) {
        console.error('Failed to read socials:', error);
        return NextResponse.json({ error: 'Failed to read socials' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newSocial: Social = await request.json();
        const socials = await readBlobData<Social[]>('socials.json');

        newSocial.id = Date.now().toString();
        socials.push(newSocial);

        await writeBlobData('socials.json', socials);
        return NextResponse.json({ success: true, data: newSocial });
    } catch (error) {
        console.error('Failed to add social:', error);
        return NextResponse.json({ error: 'Failed to add social' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedSocial: Social = await request.json();
        let socials = await readBlobData<Social[]>('socials.json');

        socials = socials.map(s => s.id === updatedSocial.id ? updatedSocial : s);

        await writeBlobData('socials.json', socials);
        return NextResponse.json({ success: true, data: updatedSocial });
    } catch (error) {
        console.error('Failed to update social:', error);
        return NextResponse.json({ error: 'Failed to update social' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        let socials = await readBlobData<Social[]>('socials.json');
        socials = socials.filter(s => s.id !== id);

        await writeBlobData('socials.json', socials);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete social:', error);
        return NextResponse.json({ error: 'Failed to delete social' }, { status: 500 });
    }
}
