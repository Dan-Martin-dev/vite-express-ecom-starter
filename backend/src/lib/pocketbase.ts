// src/lib/pocketbase.ts (Initialize PocketBase Admin SDK)
import PocketBase from 'pocketbase';
import { config } from '@/config.js';
// Use CommonJS import if ES modules cause issues with PocketBase v0.2x
// const PocketBase = require('pocketbase/cjs')
    
export const pb = new PocketBase(config.pocketbaseUrl);

// Authenticate as Admin globally (or handle per request if needed)
// Ensure this runs once on server startup
let isPbAdminAuthenticated = false;

export async function ensurePbAdminAuth() {
    if (!isPbAdminAuthenticated && config.pocketbaseAdminEmail && config.pocketbaseAdminPassword) {
        try {
            console.log('Authenticating PocketBase Admin...');
            await pb.admins.authWithPassword(config.pocketbaseAdminEmail, config.pocketbaseAdminPassword);
            isPbAdminAuthenticated = true;
            console.log('PocketBase Admin authenticated successfully.');
            // Optional: Set up auto-refresh for the admin token if needed
            // pb.autoRefreshThreshold = 30 * 60; // Example: Refresh if token expires in next 30 mins
        } catch (err) {
            console.error('PocketBase Admin authentication failed:', err);
            // Decide how to handle this - maybe retry or exit?
            // For now, we'll allow the app to continue but SDK calls might fail
            isPbAdminAuthenticated = false; // Ensure it stays false
        }
    } else if (!config.pocketbaseAdminEmail || !config.pocketbaseAdminPassword) {
         console.warn('PocketBase Admin credentials not provided. SDK calls requiring admin rights will fail.');
    }
}

// Add a health check or getter if needed elsewhere
export const isPocketBaseReady = () => isPbAdminAuthenticated;

// Call ensurePbAdminAuth() during your server initialization phase.