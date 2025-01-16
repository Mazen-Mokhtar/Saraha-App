import joi from "joi";

export const signup = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu'] } }).required(),
    userName: joi.string().alphanum().min(2).max(20).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)).required(),
    DOB: joi.date().less("now").required(),
    gender: joi.string().valid("male", "female").required()
}).required().options({ allowUnknown: false });
export const login = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu'] } }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
}).required().options({ allowUnknown: false });
export const confirmEmail = joi.object().keys({
    authorization: joi.string().required()
}).required().options({ allowUnknown: false });
export const sendResetCode = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu'] } }).required()
})
export const verifyCode = joi.object().keys({
    code : joi.string().required(),
    authorization : joi.string().required()
})
export const changePassword = joi.object().keys({
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    newPassword : joi.string().valid(joi.ref("password")).required(),
    authorization: joi.string().required()
})