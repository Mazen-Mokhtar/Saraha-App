import * as dotenv from "dotenv"
dotenv.config();
import express from "express";
import bootstrap from "./src/app.controller.js";
const app = express();
app.listen(process.env.PORT ,()=>
    {
        console.log("app listen in port" , process.env.PORT);
    })
bootstrap(app , express);