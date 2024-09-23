import NodeCache from 'node-cache';

const isDev = process.env.NODE_ENV === 'development';
const cache = isDev ? null : new NodeCache();

async function getCache<T>(key: string): Promise<T | null> {
    if (isDev || !cache) {
        return null;
    }
    const data = cache.get<string>(key);
    if (data) {
        return JSON.parse(data) as T;
    }
    return null;
}

async function setCache<T>(key: string, value: T, duration: number): Promise<void> {
    if (isDev || !cache) {
        return;
    }
    cache.set(key, JSON.stringify(value), duration / 1000); // Duration in seconds
}

export { getCache, setCache };
