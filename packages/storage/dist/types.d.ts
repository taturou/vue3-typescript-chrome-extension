export interface StorageType {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    [prop: string]: any;
}
//# sourceMappingURL=types.d.ts.map