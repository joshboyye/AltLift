import { useState } from "react";
import "./ProfilePage.css";

const STORAGE_KEY = "altlift_profile";

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

export default function ProfilePage() {
  
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) }
      : DEFAULT_PROFILE;
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if(!form.displayName.trim()) {
      alert("Display name is required.");
      return;
    }

    const cleanedForm = {
      ...form,
      displayName: form.displayName.trim()
    };

    setForm(cleanedForm);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    alert("Profile saved successfully!");
    console.log("Saved Profile: ", form);
  };

  return (
    <form className="profile-page" onSubmit={handleSave}>
      <div className="profile-page-header">
        <h1 className="profile-title">Your goals. Your starting point.</h1>
        <p className="profile-subtitle">
          Keep your profile and training preferences together.
        </p>
      </div>

      <div className="profile-content-grid">
        <div className="profile-form-card">
          <div className="profile-section">
            <p className="profile-section-eyebrow">YOUR PROFILE</p>

            <div className="profile-field">
              <label className="profile-label">Display name</label>
              <input
                type="text"
                className="profile-input"
                placeholder ="John"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-field-row">
              <div className="profile-field">
                <label className="profile-label">Weight (optional)</label>
                <input
                  type="number"
                  min="0"
                  className="profile-input"
                  placeholder="Enter your weight in kg.."
                  name="weightKg"
                  value={form.weightKg}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">Height (optional)</label>
                <input
                  type="number"
                  min="0"
                  className="profile-input"
                  placeholder="Enter your height in cm.."
                  name="heightCm"
                  value={form.heightCm}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="profile-field">
              <label className="profile-label">Sex (optional)</label>
              <select
                className="profile-select"
                name="sex"
                value={form.sex}
                onChange={handleChange}
              >
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="profile-section-title">Training preferences</h2>

            <div className="profile-field-row">
              <div className="profile-field">
                <label className="profile-label">Goal</label>
                <select
                  className="profile-select"
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  required
                >
                  <option value="Build strength">Build strength</option>
                  <option value="Stay healthy">Stay healthy</option>
                  <option value="Lose weight">Lose weight</option>
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-label">Experience</label>
                <select
                  className="profile-select"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="profile-field-row">
              <div className="profile-field">
                <label className="profile-label">Sessions per week</label>
                <select
                  className="profile-select"
                  name="sessionsPerWeek"
                  value={form.sessionsPerWeek}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-label">Session length</label>
                <select
                  className="profile-select"
                  name="sessionLength"
                  value={form.sessionLength}
                  onChange={handleChange}
                  required
                >
                  <option value="15-30 minutes">15-30 minutes</option>
                  <option value="30-45 minutes">30-45 minutes</option>
                  <option value="45-60 minutes">45-60 minutes</option>
                  <option value="60+ minutes">60+ minutes</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="profile-save-btn"
            onClick={handleSave}
          >
            <span>✓ Save profile</span>
          </button>

          <p className="profile-helper-text">
            Optional body details can be skipped. Training preferences guide
            workout suggestions.
          </p>
        </div>
      </div>
    </form>
  );
}
