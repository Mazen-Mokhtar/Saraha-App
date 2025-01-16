import nodemailer from "nodemailer"

export const sendEmail = async ({ to = "", cc = "", bcc = "", html = "", subject = "Saraha App", text = "", attachments = [] }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            },
        });
        console.log(to);
        const info = await transporter.sendMail({
            from: `Saraha App 👻" <${process.env.EMAIL}>`, // sender address
            to,
            subject,
            text,
            html

        })
        if (info.accepted.length === 0) {
            return false
        }
        console.log("Message sent: %s", info.messageId);
        return true
    } catch (error) {
        console.log("error" , error)
    }
}
