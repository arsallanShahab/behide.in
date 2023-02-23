import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const excerpt = (string) => {
  if (string.length > 50) {
    return string.slice(0, 60) + " . . . ";
  } else {
    return string;
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.cartItems);
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        phone_number_collection: {
          enabled: true,
        },
        shipping_options: [
          {
            shipping_rate: "shr_1MdVNKSBtevc6DlHD4EePDjd",
          },
        ],

        line_items: req.body.cartItems.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [item.thumbnail],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
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
            };
          })
        )}
              `,
        cancel_url: `${req.headers.origin}/payment/cancel`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      console.log(session);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
