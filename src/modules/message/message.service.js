import Message from "../../model/Message.js";
import User from "../../model/User.js";
import { eventClearMessage } from "../../utils/events/clear.message.js";
import { message } from "../../utils/messages/index.js";

export const putMessage = async (req, res, next) => {
    const { data } = req;
    const { resverId } = req.params;
    const { content } = req.body;
    const users = await User.find({ _id: { $in: [data && data.userId, resverId] } })
    if (data && users.length !== 2) return next(new Error(message.user.notFound, { cause: 404 }));
    await Message.create({ content, senderId: data && data.userId, resverId });
    return res.status(201).json({ success: true, message: message.message.createdSuccessfully })

}
export const userMessages = async (req, res, next) => {
    const { data } = req;
    User.schema.set("toJSON", { virtuals: false });
    const allMessage = await Message.find({ $or: [{ senderId: data.userId, isDeleteSenderId: false }, { resverId: data.userId, isDeleteResverId: false }] })
        .populate("senderId", "userName email _id")
        .populate("resverId", "userName email _id").select("-updatedAt -__v -isDeleteSenderId -isDeleteResverId").sort({ createdAt: -1 })
    if (allMessage.length === 0) return next(new Error(message.message.notFound));
    return res.status(200).json({ success: true, allMessage });
}
export const deleteMessage = async (req, res, next) => {
    const { data } = req;
    const { id } = req.params;
    const user = await User.findById(data.userId);
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }))
    const uMessage = await Message.findOne({
        _id: id,
        $or: [{ senderId: data.userId }, { resverId: data.userId }]
    });
    if (!uMessage) return next(new Error(message.message.notFound, { cause: 404 }));
    if (uMessage.senderId.toString() === data.userId.toString() && uMessage.isDeleteSenderId) {
        return next(new Error(message.message.notFound, { cause: 404 }))
    }
    if (uMessage.resverId.toString() === data.userId.toString() && uMessage.isDeleteResverId) {
        return next(new Error(message.message.notFound, { cause: 404 }))
    }
    eventClearMessage.emit("clear", { uMessage, data });
    return res.status(200).json({ success: true, message: message.message.successToDelete })
}
export const updateMessage = async (req, res, next) => {
    const { data } = req;
    const { content } = req.body;
    const { id } = req.params;
    const user = await User.findById(data.userId);
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }));
    const uMessage = await Message.findOneAndUpdate(
        { _id: id, senderId: data.userId, isDeleteSenderId: false }, { content });
    if (!uMessage) return next(new Error(message.message.notFound, { cause: 404 }));
    return res.status(200).json({ success: true, message: message.message.successToUpdate })
}
export const markAsRead = async (req, res, next) => {
    const { data } = req;
    const { id } = req.params;
    const user = await User.findById(data.userId);
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }));
    const uMessage = await Message.findOneAndUpdate({ _id: id, resverId: data.userId }, { read: true });
    if (!uMessage) return next(new Error(message.message.notFound, { cause: 404 }));
    return res.status(200).json({ success: true, messgae: message.message.readed })
}
export const unReadMessages = async (req, res, next) => {
    const { data } = req;
    const user = await User.findById(data.userId);
    if (!user) return next(new Error(message.user.notFound));
    const uMessages = await Message.find({ resverId: data.userId, read: false })
    if (uMessages.length === 0) return next(new Error(message.message.notFound, { cause: 404 }));
    return res.status(200).json({ success: true, "Un Read Messages": uMessages })
}
export const searchMessages = async (req, res, next) => {
    const { data } = req;
    const { text } = req.query;
    const user = await User.findById(data.userId);
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }));
    User.schema.set("toJSON", { virtuals: false });
    const allMessages = await Message.find({
        $or: [
            { senderId: data.userId, isDeleteSenderId: false },
            { resverId: data.userId, isDeleteResverId: false }
        ],
        content: { $regex: text, $options: "i" }
    })
        .populate("senderId", "userName email -_id")
        .populate("resverId", "userName email -_id")
        .select("-_id -isDeleteSenderId -isDeleteResverId -createdAt -updatedAt -__v")
    if (allMessages.length === 0) return next(new Error(message.message.notFound, { cause: 404 }));
    return res.status(200).json({ success: true, allMessages });
}
export const countUnReadMessage = async (req, res, next) => {
    const { data } = req;
    const user = await User.findById(data.userId);
    if (!user) return next(new Error(message.user.notFound, { cause: 404 }));
    const cMessages = await Message.countDocuments({ resverId: data.userId, isDeleteResverId: false })
    return res.status(200).json({ success: true, count: cMessages })
}