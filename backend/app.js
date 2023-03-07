require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const User = require("./models/user.model");


const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
require("./routes/auth.routes")(app);
require("./routes/subscription.routes")(app);








const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err) return console.log("Server Stopped.");
    console.log("Server is running on http://localhost:"+port);
})
