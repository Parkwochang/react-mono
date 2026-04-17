export function getSessionStorage<T>(key: string): T | null;
export function getSessionStorage<T>(key: string, defaultValue: T): T;

export function getSessionStorage(key: string, defaultValue = null) {
  if (typeof window === "undefined") return defaultValue;
  const value = sessionStorage.getItem(key);

  if (!value) return defaultValue;

  return JSON.parse(value);
}

// ----------------------------------------------------------------------

export const setSessionStorage = <T = any>(
  key: string,
  value: T,
  defaultValue?: T,
) => {
  if (typeof window === "undefined") {
    console.error("can not access without window");
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(value || defaultValue));
};

// ----------------------------------------------------------------------

export const removeSessionStorage = (key: string) => {
  if (typeof window === "undefined") {
    console.error("can not access without window");
    return;
  }
  sessionStorage.removeItem(key);
};

// ----------------------------------------------------------------------

export class StorageManager {
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  getItem<T>(key: string, defaultValue = null, isJson = false): T | null {
    if (typeof window === "undefined") return defaultValue;

    const value = this.storage.getItem(key);

    if (value === null) return defaultValue;

    return (isJson ? JSON.parse(value) : value) as T;
  }

  setItem<T>(key: string, value: T, defaultValue?: T, isJson = false) {
    if (typeof window === "undefined") {
      console.error("can not access without window");
      return;
    }

    const finalValue = value ?? defaultValue;

    if (!finalValue) {
      return this.storage.removeItem(key);
    }

    const stringValue = isJson
      ? JSON.stringify(finalValue)
      : String(finalValue);
    this.storage.setItem(key, stringValue);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
