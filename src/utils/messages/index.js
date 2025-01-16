
const generateMessage = (entity) => ({
    notFound: `${entity} Not Found`,
    alreadyExist: `${entity} Already Exist`,
    createdSuccessfully: `${entity}Created Successfully`,
    updatedSuccessfully: `${entity}Updated Successfully`,
    successToCreate: `success To Create ${entity}`,
    successToUpdate: `success To Update ${entity}`,
    successToDelete: `success To Delete${entity}`,
    failToCreate: `Fail To Create ${entity}`,
    failToUpdate: `Fail To Update ${entity}`,
    failToDelete: `Fail To Delete ${entity}`
})
export const message =
{
    user: {
        ...generateMessage("User"),
        incorrectPassword: "Incorrect Password ",
        emailActive: "Email Created but Ative Your Email From Message Gmail First",
        emailIsActived: "Email is active you con login now",
        invalid: "Invalid User",
        login: "Login Successfully",
        yourProfile: "Your Profile",
        token: "Invalid Token",
        resetCode: "Sended Your Code In Gmail Message",
        expiredCode: "Invalid or expired reset token",
        notAuthorized: "Not Authorized",
        authorization: "Authorization Is Required"
    },
    message: {
        ...generateMessage("Message"),
        readed: "Message Is readed Successfully"
    }
}