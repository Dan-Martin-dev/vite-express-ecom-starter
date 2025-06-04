declare const generateUser: () => {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    teamId: string;
    teamName: string;
    role: string;
    bio: string;
    createdAt: number;
};
export declare const createUser: <T extends Partial<ReturnType<typeof generateUser>>>(overrides?: T) => {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    teamId: string;
    teamName: string;
    role: string;
    bio: string;
    createdAt: number;
};
declare const generateTeam: () => {
    id: string;
    name: string;
    description: string;
    createdAt: number;
};
export declare const createTeam: <T extends Partial<ReturnType<typeof generateTeam>>>(overrides?: T) => {
    id: string;
    name: string;
    description: string;
    createdAt: number;
};
declare const generateDiscussion: () => {
    id: string;
    title: string;
    body: string;
    createdAt: number;
};
export declare const createDiscussion: <T extends Partial<ReturnType<typeof generateDiscussion>>>(overrides?: T & {
    authorId?: string;
    teamId?: string;
}) => {
    id: string;
    title: string;
    body: string;
    createdAt: number;
    authorId?: string;
    teamId?: string;
};
declare const generateComment: () => {
    id: string;
    body: string;
    createdAt: number;
};
export declare const createComment: <T extends Partial<ReturnType<typeof generateComment>>>(overrides?: T & {
    authorId?: string;
    discussionId?: string;
}) => {
    id: string;
    body: string;
    createdAt: number;
    authorId?: string;
    discussionId?: string;
};
export {};
//# sourceMappingURL=data-generators.d.ts.map