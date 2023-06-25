import { connectToDatabase } from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method not allowed' });
  }
  const { id } = req.body;
  console.log(id);
  const { authorization } = req.headers;
  if (!authorization) {
    console.log('no auth');
    return res.status(401).json({ error: true, message: 'Not authenticated' });
  }
  try {
    const { db } = await connectToDatabase();
    const orders = await db.collection('orders').find({ user_id: id }).toArray();
    res.status(200).json({ orders, ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Something went wrong' });
  }
}
