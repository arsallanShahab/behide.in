import stripe from 'stripe';

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripeInstance = stripe(stripeSecretKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        client_reference_id: req.body.client_reference_id,
        shipping_options: [
          {
            shipping_rate: process.env.NEXT_PUBLIC_SHIPPING_ID,
          },
        ],

        line_items: req.body.cartItems.map((item) => {
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
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
            //set product id here
          };
        }),
        metadata: {},
        success_url: `${
          req.headers.origin
        }/payment/success?success=true&session_id={CHECKOUT_SESSION_ID}&ordered_items=${JSON.stringify(
          req.body.cartItems.map((item) => {
            return {
              id: item.id,
              price: item.price,
              quantity: item.quantity,
              thumbnail: item.thumbnail,
              name: item.name,
              sku_id: item.sku_id,
            };
          }),
        )}&total_quantity=${req.body.total_quantity}&total_price=${req.body.total_price}`,
        cancel_url: `${req.headers.origin}/payment/cancel`,
      };
      const session = await stripeInstance.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.' });
    }
  }
}
