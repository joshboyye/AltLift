import express from "express";
import {getProfile, upsertProfile} from "../controllers/profileController.js";

const router = express.Router();

// GET /api/profile Fetch saved profile
router.get("/", getProfile);

//PUT /api/profile Create/Update Profile in MongoDB
router.put("/", upsertProfile);

export default router;