import { Router } from "express";
import { create, getUnverified, del, verify } from "../controllers/review";

const router = Router();

router.post("/create", create);
router.post("/getUnverified", getUnverified);
router.post("/verify", verify);
router.post("/delete", del);

export default router;
