import crypto from 'crypto';

// Generate a secure access token
export function generateAccessToken(username: string): string {
    const timestamp = Date.now();
    const payload = `${username}:${timestamp}`;
    const secret = process.env.AUTH_SECRET || 'portfolio-admin-secret-key';
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return Buffer.from(`${payload}:${signature}`).toString('base64');
}

// Validate access token
export function validateAccessToken(token: string): boolean {
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const parts = decoded.split(':');

        if (parts.length !== 3) return false;

        const [username, timestamp, signature] = parts;
        const payload = `${username}:${timestamp}`;
        const secret = process.env.AUTH_SECRET || 'portfolio-admin-secret-key';
        const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

        // Check signature
        if (signature !== expectedSignature) return false;

        // Check if token is expired (24 hours)
        const tokenTime = parseInt(timestamp);
        const now = Date.now();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (now - tokenTime > maxAge) return false;

        return true;
    } catch {
        return false;
    }
}
