const auth = require("../middleware/auth");
const User = require("../models/user.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = function(app){
    app.get("/hello", auth, (req, res) => {
        res.send("Hello World.!");
    });
    
    app.post("/api/signup", async (req, res) => {
        try {
            // const { name, email, password } = req.body;
            console.log("**********************************");
            console.log(req.body.name, " ", req.body.email, " ", req.body.password);
            console.log("**********************************");
            const customer = await stripe.customers.create({
                email:req.body.email
            });
            console.log(customer,"CUSTOMERRRRRRRRR")
            
            const user = User({...req.body, stripeCustomerId: customer.id });
            await user.save();
            // const token = await user.generateAuthToken();
            res.status(201).send({ success: true, user, message: "User Successfully Registered!" });
        } catch (error) {
            return res.status(500).send({ success: false, error });
        }
    });

    app.post("/api/signin", async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password, res);
            if(!user?.success && user.message === "User not found"){
                return res.status(404).send({ success: false, message: "User not found" });
            }
            else if(!user.success && user.message === "Credentials does not match"){
                return res.status(400).send({ success: false, message: "Credentials does not match" });
            }
            const token = await user.generateAuthToken();
            return res.send({ user, token });
        } catch (error) {
            res.status(400).send({ error: "Unable to login" });
        }
    });
}