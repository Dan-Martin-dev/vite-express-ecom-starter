import React from 'react';
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
  RenderResult,
  RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { AppProvider } from '@/app/provider';

import {
  createDiscussion as generateDiscussion,
  createUser as generateUserFromDataGen, // Renamed to avoid conflict
} from './data-generators';
import { db } from './mocks/db';
import { AUTH_COOKIE, authenticate, hash } from './mocks/utils';

type  BaseUser = ReturnType<typeof generateUserFromDataGen>;
type AuthenticatedUser = Omit<BaseUser, 'password'> & { jwt: string };
type InitializedAppUser = AuthenticatedUser | null;

interface AppRenderOptions extends RenderOptions {
  user?: BaseUser | null | undefined;
  url?: string;
  path?: string;
} 

type AppRenderResult = RenderResult & { user: InitializedAppUser };

export const createUser = async (userProperties?: Partial<BaseUser>): Promise<BaseUser> => {
  const user = generateUserFromDataGen(userProperties);
  const passwordForHashing = (Array.isArray(user.password) ? user.password[0] : user.password) as string;
  await db.user.create({ ...user, password: hash(passwordForHashing) });
  return user;
};

export const createDiscussion = async (discussionProperties?: Partial<ReturnType<typeof generateDiscussion>>): Promise<ReturnType<typeof generateDiscussion>> => {
  const discussion = generateDiscussion(discussionProperties);
  // Assuming db.discussion.create returns the created discussion with potentially an ID or other db fields
  // If db.discussion.create has a specific return type, use that instead of ReturnType<typeof generateDiscussion> here.
  const res = await db.discussion.create(discussion);
  return res as ReturnType<typeof generateDiscussion>; // Cast if necessary, or type db.discussion.create properly
};

// Corrected loginAsUser
export const loginAsUser = async (user: BaseUser): Promise<AuthenticatedUser> => {
  // authenticate(user) returns an object like: { user: {id, email, ... NO password}, jwt: string }
  const authResponse = await authenticate(user);

  // Construct the AuthenticatedUser object from authResponse
  // It should have all properties of BaseUser (except password) plus jwt.
  const authenticatedUserData: AuthenticatedUser = {
    id: authResponse.user.id,
    firstName: authResponse.user.firstName,
    lastName: authResponse.user.lastName,
    email: authResponse.user.email,
    teamId: authResponse.user.teamId,
    teamName: authResponse.user.teamName,
    role: authResponse.user.role,
    bio: authResponse.user.bio, // Ensure bio is handled if it's optional on authResponse.user
    // Ensure createdAt from authResponse.user is a number.
    // If authResponse.user.createdAt is a function from MSW model, it should be evaluated
    // or the retrieved entity should have it as a number. Casting to Number is a safeguard.
    createdAt: Number(authResponse.user.createdAt),
    jwt: authResponse.jwt,
  };

  Cookies.set(AUTH_COOKIE, authenticatedUserData.jwt);
  return authenticatedUserData; // This now matches the AuthenticatedUser type
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

const initializeUser = async (userParam: BaseUser | null | undefined): Promise<InitializedAppUser> => {
  if (typeof userParam === 'undefined') {
    const newUser = await createUser();
    return loginAsUser(newUser);
  } else if (userParam) {
    return loginAsUser(userParam);
  } else {
    return null;
  }
};

export const renderApp = async (
  ui: React.ReactElement,
  options: AppRenderOptions = {}
): Promise<AppRenderResult> => {
  const { user, url = '/', path = '/', ...restRenderOptions } = options;

  const initializedUser: InitializedAppUser = await initializeUser(user);

  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  );

  const rtlApi = rtlRender(ui, {
    wrapper: () => {
      return (
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      );  
    },
    ...restRenderOptions,
  });

  const returnValue: AppRenderResult = {
    ...rtlApi,
    user: initializedUser,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, rtlRender };