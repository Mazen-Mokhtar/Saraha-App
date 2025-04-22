import User from "../../model/User.js"
import { passwordEvent } from "../../utils/events/forgetPassword.js";
import { emailEvent, generateToken, verifyToken } from "../../utils/index.js";
import { message } from "../../utils/messages/index.js";


export const signup = async (req, res, next) => {
    const { email } = req.body;
    const cheak = await User.findOne({ email })
    console.log(cheak);
    if (cheak) {
        return next(new Error(message.user.alreadyExist, { cause: 409 }))
        // return res.status(409).json({ "message": "Email is already exist" })
    }
    const user = await User.create(req.body)
    emailEvent.emit("sender", { id: user._id, email })
    return res.status(200).json({ "message": message.user.emailActive })
}
export const confirmEmailSigup = async (req, res, next) => {
    let { authorization } = req.params;
    const { id, error } = verifyToken({ token: authorization, signatureKey: process.env.SIGNATURE_KEY_SIGNUP });
    if (error) return next(error)
    const user = await User.findById(id);
    if (!user) {
        return next(new Error(message.user.notFound, { cause: 404 }));
        // return res.status(404).json({ "message": "user not found" })
    }
    user.comfirmEmail = true;
    await user.save()
    return res.redirect('https://saraha-fe.vercel.app/success');
}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new Error(message.user.invalid, { cause: 409 }));
    }
    const cheak = await user.comparePassword(password);
    if (!cheak) {
        return next(new Error(message.user.invalid, { cause: 409 }))
    }
    if (!user.comfirmEmail) {
        return next(new Error(message.user.emailActive));
    }
    if (user.resetCode || user.resetCodeExpires) {
        user.resetCode = undefined;
        user.resetCodeExpires = undefined;
        await user.save();
    }
    const token = user.role == "admin"
        ? generateToken({ payload: { userId: user._id, isLogin: true }, signatureKey: process.env.SIGNATURE_KEY_ADMIN, options: { expiresIn: "30m" } })
        : generateToken({ payload: { userId: user._id, isLogin: true } });
    return res.status(200).json({ message: message.user.login, token })
}
export const sendResetCode = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }));
    const token = generateToken({ payload: { userId: user._id }, signatureKey: process.env.SIGNATURE_KEY_RESET_CODE, options: { expiresIn: "15m" } });
    if (token.error) return next(token.error)
    passwordEvent.emit("sender", { email, user });
    return res.status(200).json({ success: true, "message": message.user.resetCode, token })
}
export const verifyCode = async (req, res, next) => {
    const { code } = req.body;
    const { data } = req;
    console.log(data)
    const user = await User.findOne({
        _id: data.userId,
        resetCode: code
    });
    if (!user) return next(new Error(message.user.expiredCode, { cause: 404 }))
    if (user.resetCodeExpires < Date.now()) {
        user.resetCode = null;
        user.resetCodeExpires = null;
        await user.save();
        return next(new Error(message.user.expiredCode, { cause: 400 }))
    }
    return res.status(200).json({ success: true });
}
export const changePassword = async (req, res, next) => {
    const { data } = req;
    const { password, newPassword } = req.body;
    const user = await User.findById(data.userId);
    if (!user || !newPassword || !(password === newPassword)) {
        return next(new Error(message.user.invalid, { cause: 400 }));
    }
    user.password = newPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    user.markModified('password');
    await user.save()
    return res.status(200).json({ success: true, "message": message.user.successToUpdate })
}