import jwt from "jsonwebtoken";
export const generateToken = ({payload , signatureKey=process.env.SIGNATURE_KEY, options = {}})=>
    {
       try {
        return jwt.sign(payload, signatureKey , options);
       } catch (error) {
        return {error}
       }
    }