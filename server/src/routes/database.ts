import { Router } from "express";
import {
  dropAllCollections,
  createAllCollections,
  getAllCollections,
} from "../controllers/database";

const router = Router();

router.post("/dropAllCollections", dropAllCollections);
router.post("/createAllCollections", createAllCollections);
router.post("/getAllCollections", getAllCollections);

export default router;
