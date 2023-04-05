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
      return res.status(422).json({ error: true, message: 'account does not exist' });
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(422).json({ error: true, message: 'Invalid password' });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: '1h',
      },
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
