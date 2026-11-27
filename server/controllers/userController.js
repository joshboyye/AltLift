import User from "../models/User.js"
import bcrypt from "bryptjs"
import jwt from "jsonwebtoken"

// POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Validation for Username, Email, and Password
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required."
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters."
            })
        }

        const existingUser = await User.findOne({
            $or: [
                {username:}
            ]
        })
    }
}