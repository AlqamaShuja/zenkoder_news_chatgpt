const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
console.log(process.env.DB_URL, "*********");
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.log("Database is not connected", err);
});