import { connectToDatabase } from '@/lib/db';
import Stripe from 'stripe';

const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  let event = req.body;
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      console.log(`event.type: ${event.type}`);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Webhook error' });
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items'],
    });
    const line_items = session.line_items.data;
    const { client_reference_id } = session;
    try {
      const { db } = await connectToDatabase();
      const order = {
        user_id: client_reference_id,
        user_email: session.customer_email,
        items: line_items,
        shipping: session.shipping,
        total: session.amount_total / 100,
        delivery_status: 'pending',
        payment_status: session.payment_status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection('orders').insertOne(order);
      console.log('Order created successfully');
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }
  return res.status(200).json({ received: true });
}
