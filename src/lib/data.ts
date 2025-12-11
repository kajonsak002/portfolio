import { promises as fs } from 'fs';
import path from 'path';
import { Profile, Skill, TechCategory, Project, Social } from '@/types/portfolio';

const dataDir = path.join(process.cwd(), 'src/data');

export async function getProfile(): Promise<Profile> {
    const data = await fs.readFile(path.join(dataDir, 'profile.json'), 'utf-8');
    return JSON.parse(data);
}

export async function getSkills(): Promise<{ skills: Skill[]; techStack: TechCategory[] }> {
    const data = await fs.readFile(path.join(dataDir, 'skills.json'), 'utf-8');
    return JSON.parse(data);
}

export async function getProjects(): Promise<Project[]> {
    const data = await fs.readFile(path.join(dataDir, 'projects.json'), 'utf-8');
    return JSON.parse(data);
}

export async function getSocials(): Promise<Social[]> {
    const data = await fs.readFile(path.join(dataDir, 'socials.json'), 'utf-8');
    return JSON.parse(data);
}
