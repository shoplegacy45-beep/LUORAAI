import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Luora.ai – Acesso Premium",
            },
            unit_amount: 2900, // 29€
          },
          quantity: 1,
        },
      ],
      success_url: "https://www.luora.ai/sucesso",
      cancel_url: "https://www.luora.ai/cancelado",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
