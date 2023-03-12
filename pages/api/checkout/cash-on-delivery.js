import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const {
      contact_information,
      user_id,
      total_price,
      total_quantity,
      payment_method,
      shipping_charges,
      order_items,
      address_information,
    } = req.body;
    const unixTimestamp = Math.floor(new Date().getTime() / 1000);
    const session_id = `order_${unixTimestamp}`;
    const order = {
      session_id: session_id,
      status: {
        payment_status: 'not-paid',
        shipping_status: 'pending',
        order_status: 'in progress',
      },
      customer_details: {
        ...contact_information,
      },
      shipping_address: {
        ...address_information,
      },
      order_summary: {
        currency: 'INR',
        total: total_price + shipping_charges,
        total_quantity,
        items: order_items,
        shipping_cost: shipping_charges,
        payment_method,
      },
      created: unixTimestamp,
      created_by: user_id,
    };

    const result = await db.collection('orders').insertOne(order);

    res.status(200).json({
      message: 'order placed',
      success: true,
      body: {
        order_id: result.insertedId,
        res: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'order not placed',
      success: false,
      body: {
        error,
      },
    });
  }
}
