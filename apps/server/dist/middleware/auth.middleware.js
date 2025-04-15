import { pb } from '../lib/pocketbase.js';
export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token) {
        // Maybe check for cookie if you store the token there instead
        // const authCookie = req.cookies['pb_auth']; // Requires cookie-parser middleware
        // if (authCookie) { try { pb.authStore.loadFromCookie(authCookie); } catch (_) {} }
        return res.status(401).json({ message: 'Authentication token missing or invalid.' });
    }
    try {
        // Load token into authStore (doesn't verify validity yet)
        pb.authStore.save(token, null); // Save token without model data initially
        // Verify token validity and fetch user data (makes an API call to PocketBase)
        // This refresh call also updates the token in pb.authStore if it was refreshed by PB
        const refreshedUserData = await pb.collection('users').authRefresh();
        if (!pb.authStore.isValid || !refreshedUserData?.record) {
            pb.authStore.clear(); // Clear invalid store
            return res.status(401).json({ message: 'Authentication token invalid or expired.' });
        }
        // Token is valid, attach user data and token to request
        req.user = refreshedUserData.record; // The user model from PocketBase
        req.token = pb.authStore.token; // Use the potentially refreshed token
        next();
    }
    catch (error) {
        pb.authStore.clear(); // Clear store on error
        console.error('Auth middleware error:', error);
        // PocketBase errors often have response data
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.message || 'Authentication failed.';
        // Distinguish between expired token (which authRefresh should handle) and other errors
        if (statusCode === 401 || statusCode === 403) {
            return res.status(401).json({ message: 'Authentication token invalid or expired.' });
        }
        return res.status(statusCode).json({ message });
    }
};
//# sourceMappingURL=auth.middleware.js.map