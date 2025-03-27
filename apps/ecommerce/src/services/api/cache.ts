interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class ApiCache {
  private static instance: ApiCache;
  private cache: Map<string, CacheItem<any>>;
  private readonly TTL: number;

  private constructor() {
    this.cache = new Map();
    this.TTL = 1000 * 60 * 60;
  }

  static getInstance(): ApiCache {
    if (!ApiCache.instance) {
      ApiCache.instance = new ApiCache();
    }
    return ApiCache.instance;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}
