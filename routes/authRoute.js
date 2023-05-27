import express from "express";
import {registerController,loginController, forgotPasswordController, testController, updateProfileController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing 

// Register|| Method-POST
router.post("/register", registerController);

//LOGIN||POST
router.post('/login',loginController);

//Fogot Passwod || post

router.post("/forgot-password",forgotPasswordController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //update profile 
  router.put("/profile",requireSignIn, updateProfileController)

export default router;