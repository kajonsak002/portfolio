import { put, list, del } from '@vercel/blob';

const BLOB_PREFIX = 'portfolio-data/';

// Default data for initial seeding
const defaultData: Record<string, unknown> = {
    'profile.json': {
        name: "Kajonsak",
        title: "Full-Stack Developer",
        bio: "21 years old Full-stack Developer from Thailand. Passionate about building modern web applications with React, Node.js, and Next.js. Love coding with AI and always learning new technologies.",
        location: "Bangkok, Thailand",
        email: "hello@example.com",
        resumeUrl: "/Resume.pdf"
    },
    'skills.json': {
        skills: [
            { id: "1", name: "React", icon: "⚛️" },
            { id: "2", name: "Next.js", icon: "▲" },
            { id: "3", name: "Node.js", icon: "🟢" },
            { id: "4", name: "TypeScript", icon: "📘" },
            { id: "5", name: "Python", icon: "🐍" }
        ],
        techStack: [
            { id: "1", name: "Frontend", items: ["React", "Next.js", "Vue"] },
            { id: "2", name: "Backend", items: ["Node.js", "Express", "NestJS"] },
            { id: "3", name: "Database", items: ["PostgreSQL", "MongoDB"] }
        ]
    },
    'projects.json': [],
    'socials.json': []
};

/**
 * Read JSON data from Vercel Blob
 */
export async function readBlobData<T>(key: string): Promise<T> {
    try {
        const { blobs } = await list({ prefix: BLOB_PREFIX + key });

        if (blobs.length === 0) {
            // No blob found, return default data
            const defaultValue = defaultData[key];
            if (defaultValue !== undefined) {
                // Seed the data to blob
                await writeBlobData(key, defaultValue);
                return defaultValue as T;
            }
            throw new Error(`No data found for ${key}`);
        }

        // Get the most recent blob
        const blob = blobs[0];
        const response = await fetch(blob.url);
        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error(`Error reading blob ${key}:`, error);
        // Return default data as fallback
        const defaultValue = defaultData[key];
        if (defaultValue !== undefined) {
            return defaultValue as T;
        }
        throw error;
    }
}

/**
 * Write JSON data to Vercel Blob
 */
export async function writeBlobData<T>(key: string, data: T): Promise<void> {
    try {
        // Delete existing blob(s) with this key
        const { blobs } = await list({ prefix: BLOB_PREFIX + key });
        for (const blob of blobs) {
            await del(blob.url);
        }

        // Write new blob
        await put(BLOB_PREFIX + key, JSON.stringify(data, null, 2), {
            access: 'public',
            contentType: 'application/json',
        });
    } catch (error) {
        console.error(`Error writing blob ${key}:`, error);
        throw error;
    }
}
