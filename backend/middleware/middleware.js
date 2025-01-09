import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check if the user is an admin
export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }

    req.user = decoded; // Pass decoded user data to the next middleware or handler
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    // Check if token is in blacklist
    const blacklistedToken = await prisma.tokenBlacklist.findUnique({
      where: { token },
    });

    if (blacklistedToken) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Pass user info to the next middleware
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
