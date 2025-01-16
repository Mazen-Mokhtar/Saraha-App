import EventEmitter from "node:events";
export const eventClearMessage = new EventEmitter();
eventClearMessage.on("clear", async ({ uMessage, data }) => {
    try {
        if (uMessage.senderId.toString() === data.userId.toString()) {
            uMessage.isDeleteSenderId = true
        };
        if (uMessage.resverId.toString() === data.userId.toString()) {
            uMessage.isDeleteResverId = true
        };
        if (uMessage.isDeleteSenderId && uMessage.isDeleteResverId) {
            await uMessage.deleteOne();
        }
        await uMessage.save()
    } catch (error) {
        eventClearMessage.emit("error" , error)
    }

})