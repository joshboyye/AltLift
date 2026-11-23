import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: [true, "Display name is required"],
            trim: true,
        },
        weightKg: {
            type: Number,
            min: [0, "Weight must be a positive number"],
            default: null,
        },
        heightCm: {
            type: Number,
            min: [0, "Height must be a positive number"],
            default: null,
        },
        sex: {
            type: String,
            enum: ["Prefer not to say", "Female", "Male", "Non-binary"],
            default: "Prefer not to say",
        },
        goal: {
            type: String,
            enum: ["Build strength", "Stay healthy", "Lose weight"],
            default: "Build strength",
        },
        experience: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },
        sessionsPerWeek: {
            type: String,
            enum: ["1", "2", "3", "4", "5+"],
            default: "1",
        },
        sessionLength: {
            type: String,
            enum: ["15-30 minutes", "30-45 minutes", "45-60 minutes", "60+ minutes"],
            default: "15-30 minutes",
        },
    },
    { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;