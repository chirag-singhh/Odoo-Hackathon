import express from "express"
import { signupUser,loginUser,logoutUser, checkAuth } from "../controllers/auth.controllers.js"
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

//auth-routes
router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/check").get(protectRoute,checkAuth)



export default router;