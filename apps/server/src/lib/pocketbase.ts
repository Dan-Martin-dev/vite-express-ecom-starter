import PocketBase from 'pocketbase';
import { config } from '../config/index.js';

// Initialize PocketBase client
export const pb = new PocketBase(config.pocketbaseUrl);

// Auth state
let isAuthenticated = false;
let authRetryCount = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

/**
 * Authenticate with PocketBase as admin
 */
export async function authenticatePocketBase(): Promise<boolean> {
  try {
    if (!config.pocketbaseAdminEmail || !config.pocketbaseAdminPassword) {
      console.error('PocketBase admin credentials not provided in config');
      return false;
    }

    if (isAuthenticated) {
      return true;
    }

    console.log(`Authenticating with PocketBase (attempt ${authRetryCount + 1}/${MAX_RETRIES})...`);
    
    // Use the admins authWithPassword method instead of collections
    await pb.admins.authWithPassword(
      config.pocketbaseAdminEmail,
      config.pocketbaseAdminPassword
    );
    
    console.log('Successfully authenticated with PocketBase as admin');
    isAuthenticated = true;
    authRetryCount = 0;
    return true;
  } catch (error) {
    console.error('PocketBase authentication error:', error);
    
    // If authentication failed, try again with a delay
    if (authRetryCount < MAX_RETRIES - 1) {
      authRetryCount++;
      console.log(`Retrying in ${RETRY_DELAY_MS/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return authenticatePocketBase();
    }
    
    console.error(`Failed to authenticate with PocketBase after ${MAX_RETRIES} attempts`);
    return false;
  }
}

/**
 * Returns whether PocketBase is authenticated
 */
export function isPocketBaseAuthenticated(): boolean {
  return isAuthenticated;
}

/**
 * Ensures PocketBase Admin is authenticated (for backward compatibility)
 * @param retryCount Current retry attempt
 * @returns Boolean indicating if authentication was successful
 */
export async function ensurePbAdminAuth(): Promise<boolean> {
  return authenticatePocketBase();
}