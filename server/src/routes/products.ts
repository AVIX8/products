import { Router } from "express";
import { get, create } from "../controllers/product";

const router = Router();

router.post("/get", get);
router.post("/create", create);

export default router;
