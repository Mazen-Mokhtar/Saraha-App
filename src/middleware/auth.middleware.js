import { verifyToken } from "../utils/index.js";
import { message } from "../utils/messages/index.js";
export const authorization = async (req, res, next) => {
    let { authorization } = req.headers
    if (!authorization) return next(new Error(message.user.authorization, { cause: 400 }))
    authorization = authorization.split(" ");
    if (authorization[0] == "admin") {
        authorization = verifyToken({ token: authorization[1], signatureKey: process.env.SIGNATURE_KEY_ADMIN })
    } else if (authorization[0] == "resetCode") {
        authorization = verifyToken({ token: authorization[1], signatureKey: process.env.SIGNATURE_KEY_RESET_CODE })
    } else {
        authorization = verifyToken({ token: authorization[1] })
    }
    if (authorization.error) return next(new Error(message.user.token, { cause: 401 }))
    req.data = authorization;
    return next();
}

// process.env.SIGNATURE_KEY_ADMIN