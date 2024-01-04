import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/index.js";
// controller
import { contact, createPage, getPage } from "../controllers/website.js";

router.post("/contact", contact);
router.post("/page", requireSignin, isAdmin, createPage);
router.get("/page/:page", getPage);

export default router;
