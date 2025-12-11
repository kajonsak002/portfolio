// Portfolio Data Types

export interface Profile {
    name: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    resumeUrl: string;
}

export interface Skill {
    id: string;
    name: string;
    icon: string;
}

export interface TechCategory {
    id: string;
    name: string;
    items: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    featured: boolean;
}

export interface Social {
    id: string;
    name: string;
    url: string;
    icon: string;
}

export interface PortfolioData {
    profile: Profile;
    skills: Skill[];
    techStack: TechCategory[];
    projects: Project[];
    socials: Social[];
}
