export declare const paths: {
    readonly home: {
        readonly path: "/";
        readonly getHref: () => string;
    };
    readonly auth: {
        readonly register: {
            readonly path: "/auth/register";
            readonly getHref: (redirectTo?: string | null | undefined) => string;
        };
        readonly login: {
            readonly path: "/auth/login";
            readonly getHref: (redirectTo?: string | null | undefined) => string;
        };
    };
    readonly app: {
        readonly root: {
            readonly path: "/app";
            readonly getHref: () => string;
        };
        readonly dashboard: {
            readonly path: "";
            readonly getHref: () => string;
        };
        readonly discussions: {
            readonly path: "discussions";
            readonly getHref: () => string;
        };
        readonly discussion: {
            readonly path: "discussions/:discussionId";
            readonly getHref: (id: string) => string;
        };
        readonly users: {
            readonly path: "users";
            readonly getHref: () => string;
        };
        readonly profile: {
            readonly path: "profile";
            readonly getHref: () => string;
        };
    };
};
//# sourceMappingURL=paths.d.ts.map