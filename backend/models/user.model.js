const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 40
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 40,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    stripeCustomerId: {
        type: String,
        required: true,
    },
    subscription: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


// userSchema.virtual("posts", {
//     ref: "Post",
//     localField: "postLists.myPost",
//     foreignField: "_id"
// });


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password, res) => {
    const user = await User.findOne({ email });
    if (!user) {
        // throw new Error("User not found");
        return { success: false, message: "User not found" };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        // throw new Error("Credentials does not match");
        return { success: false, message: "Credentials does not match" };
    }
    return user;
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;