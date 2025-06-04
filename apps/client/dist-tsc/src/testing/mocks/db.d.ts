declare const models: {
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
};
export declare const db: import("@mswjs/data/lib/glossary").FactoryAPI<{
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
}>;
export type Model = keyof typeof models;
export declare const loadDb: () => Promise<any>;
export declare const storeDb: (data: string) => Promise<void>;
export declare const persistDb: (model: Model) => Promise<void>;
export declare const initializeDb: () => Promise<void>;
export declare const resetDb: () => void;
export {};
//# sourceMappingURL=db.d.ts.map