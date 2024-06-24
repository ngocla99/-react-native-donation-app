import { onRequest } from "firebase-functions/v2/https";
import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import Stripe from "stripe";

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const app = express();

app.use(bodyParser.json());

app.get("", (req, res) => {
  res.send("Server is running");
});

app.post("/create-payment-intent", async (req, res) => {
  const { email, currency, amount } = req.body;
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
  });

  const customer = await stripe.customers.create({ email });
  const params = {
    amount: parseInt(amount),
    currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
    payment_method_types: [],
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    return res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    return res.json({
      error: err.raw.message,
    });
  }
});

export default onRequest(app);
