import { EventEmitter } from "node:events";
import { confirmTemplate , sendEmail } from "../email/index.js";
import { generateToken } from "../token/generate-token.js";
export const emailEvent = new EventEmitter();
emailEvent.on("sender" ,async ({id , email} = {})=>
    {
        const token = generateToken({payload:{id , isLogin :true} , signatureKey  :process.env.SIGNATURE_KEY_SIGNUP });
        const html = confirmTemplate({link :`http://localhost:3000/users/confirmEmail/${token}`})
        await sendEmail({ to: email, html }); 
    })