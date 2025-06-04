export declare const encode: (obj: any) => string;
export declare const decode: (str: string) => any;
export declare const hash: (str: string) => string;
export declare const networkDelay: () => Promise<void>;
export declare const sanitizeUser: <O extends object>(user: O) => O;
export declare function authenticate({ email, password, }: {
    email: string;
    password: string;
}): {
    user: import("@mswjs/data/lib/glossary").Entity<{
        user: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            firstName: StringConstructor;
            lastName: StringConstructor;
            email: StringConstructor;
            password: StringConstructor;
            teamName: StringConstructor;
            teamId: StringConstructor;
            role: StringConstructor;
            bio: StringConstructor;
            createdAt: () => number;
        };
        team: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            name: StringConstructor;
            description: StringConstructor;
            createdAt: () => number;
        };
        discussion: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            title: StringConstructor;
            body: StringConstructor;
            authorId: StringConstructor;
            teamId: StringConstructor;
            createdAt: () => number;
        };
        comment: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            body: StringConstructor;
            authorId: StringConstructor;
            discussionId: StringConstructor;
            createdAt: () => number;
        };
    }, "user">;
    jwt: string;
};
export declare const AUTH_COOKIE = "bulletproof_react_app_token";
export declare function requireAuth(cookies: Record<string, string>): {
    error: string;
    user: null;
} | {
    user: import("@mswjs/data/lib/glossary").Entity<{
        user: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            firstName: StringConstructor;
            lastName: StringConstructor;
            email: StringConstructor;
            password: StringConstructor;
            teamName: StringConstructor;
            teamId: StringConstructor;
            role: StringConstructor;
            bio: StringConstructor;
            createdAt: () => number;
        };
        team: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            name: StringConstructor;
            description: StringConstructor;
            createdAt: () => number;
        };
        discussion: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            title: StringConstructor;
            body: StringConstructor;
            authorId: StringConstructor;
            teamId: StringConstructor;
            createdAt: () => number;
        };
        comment: {
            id: import("@mswjs/data/lib/primaryKey").PrimaryKey<string>;
            body: StringConstructor;
            authorId: StringConstructor;
            discussionId: StringConstructor;
            createdAt: () => number;
        };
    }, "user">;
    error?: undefined;
};
export declare function requireAdmin(user: any): void;
//# sourceMappingURL=utils.d.ts.map