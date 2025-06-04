import * as React from 'react';
import { Comment, User } from '@/types/api';
export declare enum ROLES {
    ADMIN = "ADMIN",
    USER = "USER"
}
type RoleTypes = keyof typeof ROLES;
export declare const POLICIES: {
    'comment:delete': (user: User, comment: Comment) => boolean;
};
export declare const useAuthorization: () => {
    checkAccess: ({ allowedRoles }: {
        allowedRoles: RoleTypes[];
    }) => boolean;
    role: "ADMIN" | "USER";
};
type AuthorizationProps = {
    forbiddenFallback?: React.ReactNode;
    children: React.ReactNode;
} & ({
    allowedRoles: RoleTypes[];
    policyCheck?: never;
} | {
    allowedRoles?: never;
    policyCheck: boolean;
});
export declare const Authorization: ({ policyCheck, allowedRoles, forbiddenFallback, children, }: AuthorizationProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=authorization.d.ts.map