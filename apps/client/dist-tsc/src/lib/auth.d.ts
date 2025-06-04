import { z } from 'zod';
import { User } from '@/types/api';
export declare const loginInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export declare const registerInputSchema: z.ZodIntersection<z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}>, z.ZodUnion<[z.ZodObject<{
    teamId: z.ZodString;
    teamName: z.ZodDefault<z.ZodNull>;
}, "strip", z.ZodTypeAny, {
    teamId: string;
    teamName: null;
}, {
    teamId: string;
    teamName?: null | undefined;
}>, z.ZodObject<{
    teamName: z.ZodString;
    teamId: z.ZodDefault<z.ZodNull>;
}, "strip", z.ZodTypeAny, {
    teamId: null;
    teamName: string;
}, {
    teamName: string;
    teamId?: null | undefined;
}>]>>;
export type RegisterInput = z.infer<typeof registerInputSchema>;
export declare const useUser: (options?: Omit<import("@tanstack/react-query").UseQueryOptions<User, unknown, User, readonly unknown[]>, "queryKey" | "queryFn"> | undefined) => import("@tanstack/react-query").UseQueryResult<User, unknown>, useLogin: (options?: Omit<import("@tanstack/react-query").UseMutationOptions<User, unknown, {
    email: string;
    password: string;
}, unknown>, "mutationFn"> | undefined) => import("@tanstack/react-query").UseMutationResult<User, unknown, {
    email: string;
    password: string;
}, unknown>, useLogout: (options?: import("@tanstack/react-query").UseMutationOptions<unknown, unknown, unknown, unknown> | undefined) => import("@tanstack/react-query").UseMutationResult<unknown, unknown, unknown, unknown>, useRegister: (options?: Omit<import("@tanstack/react-query").UseMutationOptions<User, unknown, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
} & ({
    teamId: string;
    teamName: null;
} | {
    teamId: null;
    teamName: string;
}), unknown>, "mutationFn"> | undefined) => import("@tanstack/react-query").UseMutationResult<User, unknown, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
} & ({
    teamId: string;
    teamName: null;
} | {
    teamId: null;
    teamName: string;
}), unknown>, AuthLoader: ({ children, renderLoading, renderUnauthenticated, renderError, }: {
    children: React.ReactNode;
    renderLoading: () => JSX.Element;
    renderUnauthenticated?: () => JSX.Element;
    renderError?: ((error: unknown) => JSX.Element) | undefined;
}) => JSX.Element | null;
export declare const ProtectedRoute: ({ children }: {
    children: React.ReactNode;
}) => string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import("react").ReactNode> | null | undefined;
//# sourceMappingURL=auth.d.ts.map