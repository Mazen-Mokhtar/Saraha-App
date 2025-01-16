import jwt from "jsonwebtoken"
export const verifyToken = ({ token, signatureKey = process.env.SIGNATURE_KEY }) => {
    try {
        return jwt.verify(token, signatureKey)
    } catch (error) {
        return {error}
    }

}