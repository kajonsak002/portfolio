import { put, list, del, head } from '@vercel/blob';

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

// Cache for blob URLs to avoid repeated list calls
const blobUrlCache: Record<string, { url: string; timestamp: number }> = {};
const CACHE_TTL = 5000; // 5 seconds cache

/**
 * Read JSON data from Vercel Blob
 */
export async function readBlobData<T>(key: string): Promise<T> {
    const fullKey = BLOB_PREFIX + key;

    try {
        // Check cache first
        const cached = blobUrlCache[fullKey];
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            try {
                const response = await fetch(cached.url);
                if (response.ok) {
                    return await response.json() as T;
                }
            } catch {
                // Cache miss, continue to list
            }
        }

        // List blobs with the prefix
        const { blobs } = await list({ prefix: fullKey });

        if (blobs.length === 0) {
            // No blob found, seed with default data
            const defaultValue = defaultData[key];
            if (defaultValue !== undefined) {
                console.log(`Seeding default data for ${key}`);
                await writeBlobData(key, defaultValue);
                return defaultValue as T;
            }
            throw new Error(`No data found for ${key}`);
        }

        // Get the first matching blob
        const blob = blobs[0];

        // Update cache
        blobUrlCache[fullKey] = { url: blob.url, timestamp: Date.now() };

        const response = await fetch(blob.url);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.status}`);
        }

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
    const fullKey = BLOB_PREFIX + key;

    try {
        // Delete existing blob(s) with this key first
        const { blobs } = await list({ prefix: fullKey });
        for (const blob of blobs) {
            try {
                await del(blob.url);
            } catch (deleteError) {
                console.warn(`Failed to delete old blob:`, deleteError);
            }
        }

        // Write new blob with addRandomSuffix: false to keep consistent naming
        const result = await put(fullKey, JSON.stringify(data, null, 2), {
            access: 'public',
            contentType: 'application/json',
            addRandomSuffix: false, // Important: keep consistent file path
        });

        // Update cache with new URL
        blobUrlCache[fullKey] = { url: result.url, timestamp: Date.now() };

        console.log(`Successfully wrote blob ${key} to ${result.url}`);
    } catch (error) {
        console.error(`Error writing blob ${key}:`, error);
        throw error;
    }
}
