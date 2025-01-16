import { conctionDB } from "./DB/db.conction.js";
import authController from "./modules/auth/auth.controller.js";
import messageController from "./modules/message/message.controller.js";
import userController from "./modules/user/user.controller.js";
import { errorUrl } from "./utils/error/errorUrl.js";
import { globelError } from "./utils/error/global-error.js";
function bootstrap(app, express) {
    app.use(express.json());
    conctionDB();
    app.use("/users", authController);
    app.use("/user" , userController);
    app.use("/message" , messageController);
    app.all("*" ,errorUrl)
    app.use(globelError)
}
export default bootstrap;