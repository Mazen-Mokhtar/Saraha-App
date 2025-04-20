import joi from "joi";

export const putMessage = joi.object().keys({
    content: joi.string().min(1).required(),
    resverId: joi.string().required(),
    authorization: joi.string()

}).required()
export const userMessages = joi.object().keys({
    authorization: joi.string().required()
}).required()
export const deleteMessage = joi.object().keys({
    authorization: joi.string().required(),
    id: joi.string().required()
}).required()
export const updateMessage = joi.object().keys({
    content: joi.string().alphanum().required(),
    authorization: joi.string().required(),
    id: joi.string().required()
}).required()
export const markAsRead = joi.object().keys({
    authorization: joi.string().required(),
    id: joi.string().required()
}).required()
export const unReadMessages = joi.object().keys({
    authorization: joi.string().required()
}).required()
export const searchMessages = joi.object().keys({
    text: joi.string().required(),
    authorization: joi.string().required()
}).required()
export const countUnReadMessage = joi.object().keys({
    authorization : joi.string().required()
}).required()