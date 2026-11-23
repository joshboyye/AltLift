import Profile from "../models/Profile.js";

const DEFAULT_PROFILE = {
  displayName: "",
  weightKg: "",
  heightCm: "",
  sex: "Prefer not to say",
  goal: "Build strength",
  experience: "Beginner",
  sessionsPerWeek: "1",
  sessionLength: "30-45 minutes",
};

//GET /api/profile
export const getProfile = async(req, res) => {
    try{
        const profile = await Profile.findOne().lean();
        res.status(200).json(profile || DEFAULT_PROFILE);
    }catch(err){
        console.error("Error fetching profile:", err);
        res.status(500).json({error: "Failed to load profile."});
    }
};

export const upsertProfile = async (req, res)=>{
  try {
    const {
      displayName,
      weightKg = "",
      heightCm = "",
      sex = "Prefer not to say",
      goal = "Build strength",
      experience = "Beginner",
      sessionsPerWeek = "1",
      sessionLength = "30-45 minutes",
    } = req.body ?? {};

    if (!displayName || !String(displayName).trim()) {
      return res.status(400).json({ error: "Display name is required" });
    }

    const trimWeight = String(weightKg ?? "").trim();
    const numericWeight = trimWeight === "" ? null : Number(trimWeight);
    if (
      numericWeight !== null &&
      (!Number.isFinite(numericWeight) || numericWeight < 0)
    ) {
      return res.status(400).json({ error: "Weight must be a non-negative number" });
    }

    const trimHeight = String(heightCm ?? "").trim();
    const numericHeight = trimHeight === "" ? null : Number(trimHeight);
    if (
      numericHeight !== null &&
      (!Number.isFinite(numericHeight) || numericHeight < 0)
    ) {
      return res.status(400).json({ error: "Height must be a non-negative number" });
    }

    const cleanedProfile = {
      displayName: String(displayName).trim(),
      weightKg: numericWeight,
      heightCm: numericHeight,
      sex,
      goal,
      experience,
      sessionsPerWeek: String(sessionsPerWeek),
      sessionLength,
    };

    const updated = await Profile.findOneAndUpdate(
      {},
      { $set: cleanedProfile },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
};