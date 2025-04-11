import { authService } from './auth.service.js'; // Added .js extension
export const authController = {
    async register(req, res, next) {
        try {
            // Input validation should be done by middleware before this point
            const { email, password, passwordConfirm } = req.body;
            if (!email || !password || !passwordConfirm) {
                return res.status(400).json({ message: 'Email, password, and password confirmation are required.' });
            }
            if (password !== passwordConfirm) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }
            const result = await authService.registerUser(req.body);
            // Send response based on service result
            res.status(201).json(result); // Includes user object and message
        }
        catch (error) {
            // Pass error to global error handler
            // Log the specific controller context if desired
            console.error("Auth Controller Register Error:", error.message);
            next(error);
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }
            const result = await authService.loginUser({ email, password });
            res.status(200).json(result); // Includes token and user object
        }
        catch (error) {
            console.error("Auth Controller Login Error:", error.message);
            next(error);
        }
    },
    logout(req, res, next) {
        try {
            // Primarily a client-side action, but clear server store if needed.
            authService.clearServerAuthStore();
            // If using httpOnly cookies for auth, clear them here:
            // res.clearCookie('pb_auth'); // Requires cookie-parser middleware
            res.status(200).json({ message: 'Logged out successfully.' });
        }
        catch (error) {
            next(error);
        }
    },
    getSession(req, res, next) {
        // isAuthenticated middleware already validated and attached user/token
        if (!req.user) {
            // This shouldn't happen if isAuthenticated middleware is working correctly
            return res.status(401).json({ message: 'Authentication required.' });
        }
        res.status(200).json({ user: req.user, token: req.token });
    },
    async requestPasswordReset(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required.' });
            }
            const result = await authService.requestPasswordReset(email);
            res.status(200).json(result); // Send generic success message from service
        }
        catch (error) {
            console.error("Auth Controller Password Reset Request Error:", error.message);
            // Even if service throws (e.g., internal error), maybe still send generic success to user? Or handle differently.
            // Let's pass to global handler for now.
            next(error);
        }
    },
    // --- Placeholder endpoints mentioned in original code ---
    // Token refresh is handled by PocketBase SDK / isAuthenticated middleware usually
    refresh(req, res) {
        res.status(501).json({ message: 'Token refresh is typically handled automatically. This endpoint is usually not required.' });
    },
    // Email verification link click is handled by PB/Frontend
    verifyEmail(req, res) {
        res.status(501).json({ message: 'Email verification link is handled by PocketBase or your frontend.' });
    },
    // Password reset confirmation is handled by PB/Frontend via link token
    resetPassword(req, res) {
        res.status(501).json({ message: 'Password reset confirmation is handled by PocketBase or your frontend using the token from the email link.' });
    }
};
