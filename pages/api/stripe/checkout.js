import stripe from 'stripe';

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripeInstance = stripe(stripeSecretKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const customer = await stripeInstance.customers.create({
      metadata: {
        user_id: req.body.user_id,
      },
    });
    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [item.thumbnail],
            metadata: {
              sku: item.sku_id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['IN'],
        },
        phone_number_collection: {
          enabled: true,
        },
        client_reference_id: req.body.user_id,
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 12500,
                currency: 'inr',
              },
              display_name: 'Standard shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 30000,
                currency: 'inr',
              },
              display_name: 'Express shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 4,
                },
              },
            },
          },
        ],
        line_items,
        customer: customer.id,
        success_url: `${req.headers.origin}/payment/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment/cancel`,
      };
      const session = await stripeInstance.checkout.sessions.create(params);
      res.status(200).json({ ok: true, url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'An error occurred.' });
    }
  }
}
