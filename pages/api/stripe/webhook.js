import { connectToDatabase } from '@/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }
  let event = req.body;
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      console.log(`event.type: ${event.type}`);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: `Webhook error: ${error.message}` });
    }
  }

  switch (event.type) {
    case 'checkout.session.completed':
      // expand the line items
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
        res.status(500).json({ message: `Database error: ${error.message}` });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
