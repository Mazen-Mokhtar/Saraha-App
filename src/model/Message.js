import { model, Schema } from "mongoose";

const messageSchema = new Schema(
    {
        content:
        {
            type: String,
            required: [true, "Message required"],
            minlength: [1, "message is to short"]
        },
        senderId:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        resverId:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        read:
        {
            type: Boolean,
            default: false
        },
        isDeleteSenderId:
        {
            type: Boolean,
            default: false
        },
        isDeleteResverId:
        {
            type: Boolean,
            default: false
        },
        date:
        {
            type: Date,
            default: Date.now()
        }
    }, { timestamps: true })
const Message = model("Message", messageSchema);

export default Message;