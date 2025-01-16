import { model, Schema } from "mongoose";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import validator from "validator";
const userSchema = new Schema(
    {
        userName:
        {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 2
        },
        email:
        {
            type: String,
            required: [true, "Email required"],
            unique: [true, "Email is already exist"],
            validate:
            {
                validator: validator.isEmail,
                message: "require valid email"
            }
        },
        password:
        {
            type: String,
            required: [true, "Password required"],
            min: 6
        },
        phone:
        {
            type: String,
            required: [true, "phone required"]
        },
        role:
        {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user"
        },
        gender:
        {
            type: String,
            enum: ["male", "female"],
            required: [true, "Gender required"]
        },
        address:
        {
            country: { type: String },
            city: { type: String },
            street: { type: String }
        },
        DOB:
        {
            type: Date,
            required: [true, "DOB is required"]
        },
        comfirmEmail:
        {
            type: Boolean,
            default: false
        },
        resetCode:
        {
            type: String
        },
        resetCodeExpires:
        {
            type: Date
        }


    }, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            if(ret.DOB)ret.DOB = ret.DOB.toLocaleDateString('en-GB');
            return ret;
        }
    },
    toObject: { virtuals: true }
})
userSchema.virtual("age").get(function () {
    const today = new Date()
    const userDate = new Date(this.DOB)
    let age = today.getFullYear() - userDate.getFullYear();
    if (today.getMonth() < userDate.getMonth() || (age === 0 && today.getDate() < userDate.getDate())) {
        age--;
    }
    return age
})

userSchema.pre("save", async function (next) {
    if (this.isModified("phone")) {
        this.phone = CryptoJS.AES.encrypt(this.phone, process.env.PHONE_ENC)
    }
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT))
    }
    next();
})
userSchema.methods.realPhone = function () {
    const userPhone = CryptoJS.AES.decrypt(this.phone, process.env.PHONE_ENC).toString(CryptoJS.enc.Utf8);
    return userPhone;
}
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}
const User = model("User", userSchema);

export default User;
