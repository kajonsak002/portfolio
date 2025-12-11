import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Project } from '@/types/portfolio';

const dataPath = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProject: Project = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        const projects: Project[] = JSON.parse(data);

        newProject.id = Date.now().toString();
        projects.push(newProject);

        await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));
        return NextResponse.json({ success: true, data: newProject });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedProject: Project = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        let projects: Project[] = JSON.parse(data);

        projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);

        await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));
        return NextResponse.json({ success: true, data: updatedProject });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const data = await fs.readFile(dataPath, 'utf-8');
        let projects: Project[] = JSON.parse(data);

        projects = projects.filter(p => p.id !== id);

        await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
