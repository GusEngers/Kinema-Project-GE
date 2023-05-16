const { Router } = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);

const router = Router();

router.post('/premium', async (req, res) => {
  const { id, username, email } = req.body;
  try {
    const newCustomer = await stripe.customers.create({
      name: username,
      email: email,
      payment_method: id,
      invoice_settings: { default_payment_method: id },
    });

    const subscription = await stripe.subscriptions.create({
      currency: 'usd',
      description: 'Kinema Premium',
      customer: newCustomer.id,
      items: [{ price: 'price_1LvYP5FFC0gF7yTenRItnb4g' }],
    });

    res.json({
      message:
        'Your payment has been successfully processed. Enjoy Kinema Premium',
      subId: subscription.id,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

router.post('/rent', async (req, res) => {
  try {
    const { id, username, email, title } = req.body;
    let clientId = '';

    const existingCustomer = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomer.data.length) {
      clientId = existingCustomer.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        name: username,
        email: email,
      });
      clientId = newCustomer.id;
    }

    await stripe.paymentIntents.create({
      amount: '199',
      currency: 'usd',
      description: `Kinema Rent - ${title}`,
      payment_method: id,
      confirm: true,
      customer: clientId,
    });

    res.json({
      message:
        'Your payment has been successfully processed. Enjoy your movie!',
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

router.post('/downgrade', async (req, res) => {
  try {
    const { id } = req.body;
    await stripe.subscriptions.del(id);
    res.json({
      message: 'Your subscription has been canceled.',
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Fail downgrade.', sucess: false });
  }
});

module.exports = router;
