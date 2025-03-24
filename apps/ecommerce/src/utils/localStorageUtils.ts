class LocalStorageUtils {
  private static instance: LocalStorageUtils;

  private constructor() {}

  public static getInstance(): LocalStorageUtils {
    if (!LocalStorageUtils.instance) {
      LocalStorageUtils.instance = new LocalStorageUtils();
    }
    return LocalStorageUtils.instance;
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageUtils = LocalStorageUtils.getInstance();
