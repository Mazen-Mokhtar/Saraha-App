import Message from "../../model/Message.js";
import User from "../../model/User.js";
import { message } from "../../utils/messages/index.js";

export const getProfile = async (req, res, next) => {
    const { data } = req;
    const user = await User.findById(data.userId).select(" -comfirmEmail");
    if (!user) {
        return next(new Error(message.user.notFound, { cause: 404 }));
    }
    user.phone = user.realPhone();
    return res.status(200).json({ success: true, "Your Profile": user })
}
export const updateProfile = async (req, res, next) => {
    const { data } = req;
    let allowedFields = ["userName", "DOB", "phone", "password", "confirmPassword", "gender"];
    let updates = {}
    const user = await User.findById({ _id: data.userId })
    if (!user) {
        return next(new Error(message.user.notFound, { cause: 404 }));
    }
    Object.keys(req.body).forEach((key) => {
        if (allowedFields.includes(key)) {
            updates[key] = req.body[key];
        }
    })
    if (updates.password !== updates.confirmPassword) return next(new Error(message.user.incorrectPassword, { cause: 400 }))
    user.set(updates);
    updates.phone && user.markModified('phone');
    updates.password && user.markModified('password');
    await user.save();
    return res.status(200).json({ success: true, "message": message.user.successToUpdate });
}
export const deleteAccount = async (req, res, next) => {
    const { data } = req;
    const user = await User.findByIdAndDelete(data.userId);
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }));
    return res.status(200).json({ success: true, "message": message.user.successToDelete });
}
export const getAllUser = async (req, res, next) => {
    const { data } = req;
    const user = await User.findById(data.userId);
    if (!user || user.role !== "admin") {
        return next(new Error(message.user.notAuthorized, { cause: 401 }))
    }
    const allUser = await User.find();
    return res.status(200).json({ success: true, allUser });
}