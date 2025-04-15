import PocketBase from 'pocketbase';
export declare const pb: PocketBase;
export declare function ensurePbAdminAuth(): Promise<void>;
export declare const isPocketBaseReady: () => boolean;
