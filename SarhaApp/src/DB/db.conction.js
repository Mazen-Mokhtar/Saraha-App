import mongoose from "mongoose";

export const conctionDB = async()=>
    {
        await mongoose.connect(process.env.DB_URL).then(()=>
            {
                console.log("connction DB Succssfully");
            }).catch((error)=>
                {
                    console.log("error" , error.message);
                })
    }