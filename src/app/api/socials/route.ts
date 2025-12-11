import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Social } from '@/types/portfolio';

const dataPath = path.join(process.cwd(), 'src/data/socials.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read socials' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newSocial: Social = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        const socials: Social[] = JSON.parse(data);

        newSocial.id = Date.now().toString();
        socials.push(newSocial);

        await fs.writeFile(dataPath, JSON.stringify(socials, null, 2));
        return NextResponse.json({ success: true, data: newSocial });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add social' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedSocial: Social = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        let socials: Social[] = JSON.parse(data);

        socials = socials.map(s => s.id === updatedSocial.id ? updatedSocial : s);

        await fs.writeFile(dataPath, JSON.stringify(socials, null, 2));
        return NextResponse.json({ success: true, data: updatedSocial });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update social' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const data = await fs.readFile(dataPath, 'utf-8');
        let socials: Social[] = JSON.parse(data);

        socials = socials.filter(s => s.id !== id);

        await fs.writeFile(dataPath, JSON.stringify(socials, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete social' }, { status: 500 });
    }
}
