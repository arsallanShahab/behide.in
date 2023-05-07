import { connectToDatabase } from '@lib/db';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { authorization } = req.headers;
  console.log({ authorization });
  if (!authorization) {
    return res.status(401).json({ error: true, message: 'Not authenticated' });
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: true, message: 'Method not allowed' });
  }
  try {
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const { email, userId } = decodedToken;
    const o_id = new ObjectId(userId);
    const user = await db.collection('users').findOne(
      {
        _id: o_id,
        email: email,
      },
      { projection: { password: 0 } },
    );

    if (!user) {
      return res.status(422).json({ message: 'account does not exist' });
    }
    res.status(200).json({ user, success: true });
    //set headers cookie
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
