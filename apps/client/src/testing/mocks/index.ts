import { env } from '@/config/env';

export const enableMocking = async (): Promise<any | void> => { // Added explicit return type for clarity
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();
    return worker.start(); // This returns a Promise
  }
  // If mocking is not enabled, explicitly return a resolved promise.
  // `return;` in an async function is equivalent to `return undefined;`,
  // which then gets wrapped in `Promise.resolve(undefined)`.
  return; // or return Promise.resolve(); or return Promise.resolve(undefined);
};