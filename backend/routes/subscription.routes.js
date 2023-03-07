const auth = require("../middleware/auth");
const User = require("../models/user.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports = function(app){
    app.get("/api/subscribe", auth, (req, res) => {

        res.send("Subscribing")
    });

    app.get("/api/getPrice", auth, async (req, res) => {
        const { data: products } = await stripe.products?.list({ active: true });
        const { data: prices } = await stripe.prices?.list();
        let formulatedData = [];
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < prices.length; j++) {
            if (products[i].id === prices[j].product) {
                // products[i].priceItem=prices[j]

                formulatedData.push({
                productId: products[i].id,
                object: products[i].object,
                active: products[i].active,
                default_price: products[i].default_price,
                name: products[i].name,
                zenkoders: products[i].metadata["zenkoders"],
                description: products[i].description,
                priceItem: {
                    id: prices[j].id,
                    object: prices[j].object,
                    currency: prices[j].currency,
                    nickname: prices[j].nickname,
                    product: prices[j].product,
                    unit_amount: prices[j].unit_amount,
                },
                });
            }
            }
        }

        res.json(formulatedData);
    });

    app.post("/api/session", auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const session = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [{
                    price: req.body.priceId,
                    quantity: 1,
                }],
                success_url: `${process.env.REACT_APP_URL}/news`,
                cancel_url: `${process.env.REACT_APP_URL}/subscription`,
                customer: user.stripeCustomerId,
            });
    
            return res.json(session);
        } catch (error) {
            return res.send({ success: false, message: error?.raw?.message })
        }
    });

    app.get("/api/subscriptionList/:id", auth, async (req, res) => {
        // Save User to Database
        const customerId = req.params.id;
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: "all",
          expand: ["data.default_payment_method"],
        });
        
        res.json(subscriptions);
      } 
    );
}