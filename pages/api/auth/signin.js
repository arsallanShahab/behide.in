import { verifyPassword } from '@lib/auth';
import { connectToDatabase } from '@lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { email, password } = req.body;
  if (req.method !== 'POST') {
    return;
  }
  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      res.status(422).json({ error: true, message: 'account does not exist' });
      return;
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      res.status(422).json({ error: true, message: 'Invalid password' });
      return;
    }
    const token = jwt.sign(
      {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    res.setHeader(
      'Set-Cookie',
      `token=${token};Secure; SameSite=Strict; Path=/ ; Max-Age=${7 * 24 * 60 * 60}`,
    );
    res.status(200).json({
      success: 'true',
      message: 'logged in successfully',
      user: {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Something went wrong' });
  }
}
