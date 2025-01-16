import joi from "joi"


export const updateProfile = joi.object().keys({
    userName: joi.string().alphanum().min(2).max(20),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    confirmPassword: joi.string().valid(joi.ref("password")).when("password", {
        is: joi.exist(),
        then: joi.required(),
        otherwise: joi.optional()
    }),
    phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    DOB: joi.date().less("now"),
    gender: joi.string().valid("male", "female"),
    authorization : joi.string().required()
})
export const getProfile = joi.object().keys({
    authorization : joi.string().required()
})