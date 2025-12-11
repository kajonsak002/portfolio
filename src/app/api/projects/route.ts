import { NextResponse } from 'next/server';
import { readBlobData, writeBlobData } from '@/lib/blob';
import { Project } from '@/types/portfolio';

export async function GET() {
    try {
        const projects = await readBlobData<Project[]>('projects.json');
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Failed to read projects:', error);
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProject: Project = await request.json();
        const projects = await readBlobData<Project[]>('projects.json');

        newProject.id = Date.now().toString();
        projects.push(newProject);

        await writeBlobData('projects.json', projects);
        return NextResponse.json({ success: true, data: newProject });
    } catch (error) {
        console.error('Failed to add project:', error);
        return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedProject: Project = await request.json();
        let projects = await readBlobData<Project[]>('projects.json');

        projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);

        await writeBlobData('projects.json', projects);
        return NextResponse.json({ success: true, data: updatedProject });
    } catch (error) {
        console.error('Failed to update project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        let projects = await readBlobData<Project[]>('projects.json');
        projects = projects.filter(p => p.id !== id);

        await writeBlobData('projects.json', projects);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
