import { connectToDatabase } from '@lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: true, message: 'Not authenticated' });
  }
  try {
    const obj_id = new ObjectId(id);
    const { db } = await connectToDatabase();
    //update order status
    const up = await db
      .collection('orders')
      .updateOne({ _id: obj_id }, { $set: { delivery_status: 'cancelled by user' } });

    return res.status(200).json({ ok: true, message: 'Order cancelled' });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}
