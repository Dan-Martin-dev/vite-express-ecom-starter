import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await prisma.user.findUnique({ where: { email } });
    if (!admin || !admin.isAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: admin.id, isAdmin: true }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Admin login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
