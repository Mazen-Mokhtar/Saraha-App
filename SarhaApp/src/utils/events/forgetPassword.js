import {EventEmitter} from "node:events";
import crypto from "node:crypto";
import { sendEmail } from "../email/index.js";
import { restCodeHtml } from "../email/template/restCode.js";
export const passwordEvent = new EventEmitter();
passwordEvent.on("sender" , async({user , email})=>
    {
        user.resetCode = crypto.randomBytes(6).toString("hex");
        user.resetCodeExpires = Date.now() + 15 * 60 *1000;
        await user.save()
        const html = restCodeHtml({name : user.userName , code : user.resetCode})
        await sendEmail({to : email , html })
    })