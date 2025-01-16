export const errorUrl= (req , res , next)=>
    {
        return next(new Error("invalid url" , {cause : 404}));
    }