import { hashPassword } from '@lib/auth';
import { connectToDatabase } from '@lib/db';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { name, email, password, remember } = req.body;
  if (req.method === 'POST') {
    try {
      const userExists = await db.collection('users').findOne({ email });
      if (userExists) {
        return res.status(422).json({ error: true, message: 'User already exists' });
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await db
        .collection('users')
        .insertOne({ name, email, password: hashedPassword });
      res.status(201).json({
        success: true,
        message: 'account created successfully',
        remember,
      });
    } catch (error) {
      res.status(500).json({ error: true, message: 'Something went wrong' });
    }
  }
}
