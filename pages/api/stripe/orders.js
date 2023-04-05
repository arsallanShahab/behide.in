import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  const { db } = await connectToDatabase();
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: true, message: 'Not authenticated' });
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: true, message: 'Method not allowed' });
  }
  try {
    const orders = await db
      .collection('orders')
      .find({ created_by: id })
      .sort({ created: -1 })
      .toArray();
    res.status(200).json({ orders, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
