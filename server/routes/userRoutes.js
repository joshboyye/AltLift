import express from "express"
import { registerUser, loginUser } from "../controllers/userControllers.js"

const router = express.Router()

// POST /api/users/register - register a new user
router.post("/register", registerUser)

// POST /api/users/login - log in an existing user
router.post("/login", loginUser)

export default router