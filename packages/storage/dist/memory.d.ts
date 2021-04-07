import type { StorageType } from './types';
declare class Storage implements StorageType {
    private data;
    constructor();
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
}
export default Storage;
//# sourceMappingURL=memory.d.ts.map