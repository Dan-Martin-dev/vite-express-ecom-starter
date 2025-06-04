import React from 'react';
import { render as rtlRender, RenderResult, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createDiscussion as generateDiscussion, createUser as generateUserFromDataGen } from './data-generators';
type BaseUser = ReturnType<typeof generateUserFromDataGen>;
type AuthenticatedUser = Omit<BaseUser, 'password'> & {
    jwt: string;
};
type InitializedAppUser = AuthenticatedUser | null;
interface AppRenderOptions extends RenderOptions {
    user?: BaseUser | null | undefined;
    url?: string;
    path?: string;
}
type AppRenderResult = RenderResult & {
    user: InitializedAppUser;
};
export declare const createUser: (userProperties?: Partial<BaseUser>) => Promise<BaseUser>;
export declare const createDiscussion: (discussionProperties?: Partial<ReturnType<typeof generateDiscussion>>) => Promise<ReturnType<typeof generateDiscussion>>;
export declare const loginAsUser: (user: BaseUser) => Promise<AuthenticatedUser>;
export declare const waitForLoadingToFinish: () => Promise<void>;
export declare const renderApp: (ui: React.ReactElement, options?: AppRenderOptions) => Promise<AppRenderResult>;
export * from '@testing-library/react';
export { userEvent, rtlRender };
//# sourceMappingURL=test-utils.d.ts.map