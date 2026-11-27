// Frontend training demo: settings and programs are stored in this browser. Workout suggestions use local templates, not a live AI API.
import { useEffect, useRef, useState } from "react";
import {
  defaultProfile,
  equipmentOptions,
  exerciseById,
  equipmentLabel,
  focusLabel,
  goalLabel,
} from "./workoutData.js";
import {
  storageKey,
  initialTraining,
  isTraining,
  movementOptions,
  createLocalWorkout,
  eligibleSwaps,
  blockedItems,
} from "./trainingFeatures";
import "./WorkoutPreview.css";
import "./TrainingFeatures.css";

// Each navigation entry contains the URL hash, the label shown to users, and a small text icon.
const navigation = [
  ["workout", "My workouts", "▦"],
  ["gym", "My equipment", "⇄"],
  ["profile", "My profile", "◉"],
  ["movement", "Movement preferences", "☷"],
  ["programs", "Saved programs", "♡"],
];
// Read the current training page from the URL; use the workout screen if the hash is empty.
function currentPage() {
  return window.location.hash.slice(1) || "workout";
}
// Load and validate saved browser data. Start with a fresh default setup if it is missing, invalid, or unreadable.
function readTraining() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return isTraining(saved) ? saved : structuredClone(initialTraining);
  } catch {
    return structuredClone(initialTraining);
  }
}
// Reusable labeled dropdown. children supplies its option elements; value provides the initial selection.
function Choice({ name, label, children, value }) {
  return (
    <label className="tf-field">
      <span>{label}</span>
      <select name={name} defaultValue={value}>
        {children}
      </select>
    </label>
  );
}
// Show matching replacements for one exercise. Keep the selected replacement local until Save is pressed.
function SwapDialog({ item, workout, profile, flags, onClose, onApply }) {
  const dialog = useRef(null);
  const options = eligibleSwaps(workout, item.exerciseId, profile, flags);
  const [selection, setSelection] = useState(options[0]?.id || "");
  const original = exerciseById(item.exerciseId);
  useEffect(() => {
    // Open the native modal after it mounts and close it during cleanup.
    const node = dialog.current;
    node.showModal();
    return () => node.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="tf-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="swap-heading"
    >
      <header>
        <div>
          <p className="wp-kicker">KEEP THE PATTERN. CHANGE THE LIFT.</p>
          <h2 id="swap-heading">Swap your exercise</h2>
        </div>
        <button
          type="button"
          className="tf-close"
          onClick={onClose}
          aria-label="Close swap chooser"
        >
          ×
        </button>
      </header>
      <div className="tf-replacing">
        <small>REPLACING</small>
        <strong>{original.name}</strong>
        <span>
          {item.sets} sets × {item.reps} · {original.pattern}
        </span>
      </div>
      {options.length ? (
        <fieldset className="tf-swap-options">
          <legend>Choose an alternative</legend>
          {options.map((exercise, i) => (
            <label
              key={exercise.id}
              className={selection === exercise.id ? "chosen" : ""}
            >
              <input
                type="radio"
                name="swap-choice"
                value={exercise.id}
                checked={selection === exercise.id}
                onChange={() => setSelection(exercise.id)}
              />
              <span>
                <small>0{i + 1} / PATTERN MATCHED</small>
                <strong>{exercise.name}</strong>
                <em>{equipmentLabel(exercise.equipment)}</em>
                <p>{exercise.why}</p>
              </span>
            </label>
          ))}
        </fieldset>
      ) : (
        <div className="wp-empty">
          <h3>No matching alternatives yet.</h3>
          <p>
            Try changing your available equipment. Current movement preferences
            are applied to every option.
          </p>
        </div>
      )}
      <p className="wp-note">
        Sets and reps carry over. Choose a suitable load for the new movement.
        Alternatives are not exact equivalents.
      </p>
      <button
        type="button"
        className="wp-primary"
        disabled={!selection}
        onClick={() => onApply(selection)}
      >
        Save swap to workout <span>⇄</span>
      </button>
    </dialog>
  );
}

// Main training workspace: owns the current settings, active workout, programs, and session controls.
export default function WorkoutPreview() {
  // React state holds what is shown on screen. training contains saved data; the other values track messages, draft choices, and session progress.
  const [page, setPage] = useState(currentPage);
  const [training, setTraining] = useState(readTraining);
  const [message, setMessage] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [gymEquipment, setGymEquipment] = useState(training.profile.equipment);
  const [search, setSearch] = useState("");
  const [patterns, setPatterns] = useState(training.flags.patterns);
  const [swap, setSwap] = useState(null);
  const [session, setSession] = useState(null);
  const [completed, setCompleted] = useState([]);
  const { profile, flags, active: workout } = training;
  // Find exercises that no longer fit the current equipment or movement preferences before starting a session.
  const conflicts = workout ? blockedItems(workout, profile, flags) : [];
  useEffect(() => {
    // Switch training screens, close any swap chooser, clear the message, and return to the top.
    function navigate() {
      setPage(currentPage());
      setSwap(null);
      setMessage("");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  useEffect(() => {
    // Set a useful browser tab title for the current training screen.
    document.title = `${navigation.find((n) => n[0] === page)?.[1] || "Training"} — AltLift`;
  }, [page]);
  // Update the screen and save the full training object in localStorage. If saving fails, keep this visit usable and show a message.
  function commit(next, success = "") {
    setTraining(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageError(false);
      setMessage(success);
    } catch {
      setStorageError(true);
      setMessage(
        "Your changes are available for this visit, but could not be saved on this device.",
      );
    }
  }
  // Replace the active workout exercise list after changing sets, reps, load, or an exercise.
  function updateActive(items) {
    commit({ ...training, active: { ...workout, items } });
  }
  // Read the profile form, convert duration to a number, and save the updated preferences.
  function saveProfile(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    commit(
      {
        ...training,
        profile: { ...profile, ...values, duration: Number(values.duration) },
      },
      "Profile saved on this device.",
    );
  }
  // Build a sample workout from local templates. Do not replace a workout during a session or accept an empty result.
  function generate() {
    if (session) {
      setMessage("Finish the current session before building another workout.");
      return;
    }
    const next = createLocalWorkout(profile, flags);
    if (!next.items.length) {
      setMessage(
        "No exercises match your equipment and movement preferences. Review your setup and try again.",
      );
      return;
    }
    commit(
      { ...training, active: next },
      "Sample workout created from your saved preferences.",
    );
  }
  // Validate the workout name and rep targets, then save a separate copy. Saving the same workout ID updates that program.
  function saveProgram(event) {
    event.preventDefault();
    const title = String(new FormData(event.currentTarget).get("title")).trim();
    if (!title) return;
    if (workout.items.some((item) => !item.reps.trim())) {
      setMessage(
        "Enter a rep or time target for every exercise before saving.",
      );
      return;
    }
    const saved = { ...structuredClone(workout), title };
    commit(
      {
        ...training,
        active: saved,
        programs: [
          ...training.programs.filter((p) => p.id !== saved.id),
          saved,
        ],
      },
      "Program saved on this device.",
    );
  }
  // Record the completed exercise count and date, keep the latest 30 history entries, and clear temporary session state.
  function finishSession() {
    const entry = {
      id: crypto.randomUUID(),
      title: workout.title,
      date: new Date().toISOString(),
      completed: completed.length,
      total: workout.items.length,
    };
    commit(
      { ...training, history: [entry, ...training.history].slice(0, 30) },
      "Session recorded on this device.",
    );
    setSession(null);
    setCompleted([]);
  }
  // Page-specific headings and descriptions used by the shared workspace header.
  const headings = {
    workout: [
      "Your plan. Room to adapt.",
      "Explore a sample workout, compare exercise swaps, and save a program that fits.",
    ],
    profile: [
      "Your goals. Your starting point.",
      "Keep your profile and training preferences together.",
    ],
    gym: [
      "Your gym. Your possibilities.",
      "Choose the equipment you have, then save your gym setup.",
    ],
    movement: [
      "Your comfort comes first.",
      "Choose movements to avoid when building workouts and comparing alternatives.",
    ],
    programs: [
      "The plans you come back to.",
      "Load a saved program or look back at your recent sessions.",
    ],
  };
  const heading = headings[page] || headings.workout;
  return (
    <div className="workout-preview tf-shell">
      {/* SHARED NAVIGATION: links change the URL hash without reloading the website. */}
      <aside className="tf-sidebar">
        <a href="#workout" className="tf-brand">
          <span>▲</span> altlift<b>.</b>
        </a>
        <p>YOUR TRAINING SPACE</p>
        <nav aria-label="Training navigation">
          {navigation.map(([id, label, icon]) => (
            <a
              key={id}
              href={`#${id}`}
              className={page === id ? "active" : ""}
              aria-current={page === id ? "page" : undefined}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="tf-sidebar-note">
          <strong>
            A different lift.
            <br />
            The same momentum.
          </strong>
          <p>
            Your plan can adapt.
            <br />
            Your goals stay the same.
          </p>
        </div>
        <a className="tf-account" href="#login">
          ← Account preview
        </a>
      </aside>
      <div className="tf-main">
        <header className="wp-header">
          <span className="tf-breadcrumb">
            Your workspace / {navigation.find((n) => n[0] === page)?.[1]}
          </span>
          <span className="wp-demo">● LOCAL PREVIEW</span>
        </header>
        <div className="wp-container">
          <p className="wp-kicker">LESS WAITING. MORE LIFTING.</p>
          <h1>{heading[0]}</h1>
          <p className="wp-intro">{heading[1]}</p>
          <p className="tf-demo-note">
            Example workouts · AI and account services will be connected later.
            Your settings and programs stay in this browser.
          </p>
          {message && (
            <div className="tf-status" role="status">
              {message}
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => setMessage("")}
              >
                ×
              </button>
            </div>
          )}
          {storageError && (
            <p className="tf-warning" role="alert">
              Device storage is unavailable. Changes will be lost when you leave
              or reload.
            </p>
          )}

          {/* PROFILE PAGE: optional body details and the preferences used by workout templates. */}
          {page === "profile" && (
            <form className="tf-card tf-form" onSubmit={saveProfile}>
              <h2>Your profile</h2>
              <label className="tf-field">
                <span>Display name</span>
                <input
                  name="name"
                  defaultValue={profile.name}
                  maxLength={60}
                  placeholder="What should we call you?"
                />
              </label>
              <div className="tf-columns">
                <label className="tf-field">
                  <span>Weight in kg (optional)</span>
                  <input
                    name="weight"
                    type="number"
                    min="1"
                    max="600"
                    step="0.1"
                    defaultValue={profile.weight}
                  />
                </label>
                <label className="tf-field">
                  <span>Height in cm (optional)</span>
                  <input
                    name="height"
                    type="number"
                    min="30"
                    max="300"
                    defaultValue={profile.height}
                  />
                </label>
              </div>
              <Choice name="sex" label="Sex (optional)" value={profile.sex}>
                {["Prefer not to say", "Female", "Male", "Other"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Choice>
              <h2 className="tf-subheading">Training preferences</h2>
              <div className="tf-columns">
                <Choice name="goal" label="Goal" value={profile.goal}>
                  <option value="muscle">Build muscle</option>
                  <option value="strength">Get stronger</option>
                  <option value="active">Stay active</option>
                </Choice>
                <Choice
                  name="experience"
                  label="Experience"
                  value={profile.experience}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                </Choice>
                <Choice
                  name="focus"
                  label="Workout focus"
                  value={profile.focus}
                >
                  <option value="full">Full body</option>
                  <option value="upper">Upper body</option>
                  <option value="lower">Lower body</option>
                </Choice>
                <Choice
                  name="duration"
                  label="Session length"
                  value={profile.duration}
                >
                  <option value="20">20 minutes</option>
                  <option value="35">35 minutes</option>
                  <option value="50">50 minutes</option>
                </Choice>
                <Choice
                  name="sessions"
                  label="Sessions per week"
                  value={profile.sessions}
                >
                  {["1", "2", "3", "4", "5", "6"].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </Choice>
              </div>
              <button className="wp-primary" type="submit">
                Save profile <span>✓</span>
              </button>
              <p className="wp-note">
                Optional body details are not used by the sample workout
                builder.
              </p>
            </form>
          )}

          {/* GYM PAGE: edit the gym name, filter equipment, choose a preset, and save availability. */}
          {page === "gym" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!gymEquipment.length) {
                  setMessage(
                    "Select at least one equipment type, including bodyweight if you have no equipment.",
                  );
                  return;
                }
                commit(
                  {
                    ...training,
                    gymName:
                      String(
                        new FormData(e.currentTarget).get("gymName"),
                      ).trim() || "My gym",
                    profile: { ...profile, equipment: gymEquipment },
                  },
                  "Gym setup saved on this device.",
                );
              }}
            >
              <div className="tf-card">
                <label className="tf-field">
                  <span>Gym name</span>
                  <input
                    name="gymName"
                    maxLength={60}
                    defaultValue={training.gymName}
                  />
                </label>
                <div className="tf-presets">
                  <button
                    type="button"
                    onClick={() =>
                      setGymEquipment(equipmentOptions.map((e) => e.id))
                    }
                  >
                    Full gym
                  </button>
                  <button
                    type="button"
                    onClick={() => setGymEquipment(defaultProfile.equipment)}
                  >
                    Home gym
                  </button>
                  <button
                    type="button"
                    onClick={() => setGymEquipment(["bodyweight"])}
                  >
                    No equipment
                  </button>
                </div>
                <label className="tf-field">
                  <span>Search equipment</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search equipment…"
                    type="search"
                  />
                </label>
              </div>
              <div className="tf-equipment-grid">
                {[
                  ["Free weights", ["dumbbells", "barbell", "bench"]],
                  ["Machines & cables", ["cable", "machine"]],
                  ["Bodyweight & accessories", ["bodyweight"]],
                ].map(([title, ids]) => (
                  <fieldset className="tf-card" key={title}>
                    <legend>{title}</legend>
                    {equipmentOptions
                      .filter(
                        (e) =>
                          ids.includes(e.id) &&
                          e.label.toLowerCase().includes(search.toLowerCase()),
                      )
                      .map((e) => (
                        <label className="tf-checkbox" key={e.id}>
                          <input
                            type="checkbox"
                            checked={gymEquipment.includes(e.id)}
                            onChange={() =>
                              setGymEquipment((old) =>
                                old.includes(e.id)
                                  ? old.filter((id) => id !== e.id)
                                  : [...old, e.id],
                              )
                            }
                          />
                          {e.label}
                        </label>
                      ))}
                  </fieldset>
                ))}
              </div>
              {!equipmentOptions.some((e) =>
                e.label.toLowerCase().includes(search.toLowerCase()),
              ) && <p className="wp-note">No equipment matches this search.</p>}
              <button className="wp-primary" type="submit">
                Save gym setup <span>✓</span>
              </button>
              <div className="tf-callout">
                <strong>
                  Your movement preferences travel with your plan.
                </strong>
                <p>
                  {flags.patterns.length
                    ? flags.patterns.join(" · ")
                    : "No movement restrictions selected."}
                </p>
                <a href="#movement">Edit movement preferences →</a>
              </div>
            </form>
          )}

          {/* MOVEMENT PAGE: selected movement patterns are excluded from suggestions; notes are reference text only. */}
          {page === "movement" && (
            <form
              className="tf-card tf-form"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                commit(
                  {
                    ...training,
                    flags: {
                      name: String(data.get("name")),
                      notes: String(data.get("notes")),
                      patterns,
                    },
                  },
                  "Movement preferences saved. Existing workouts are checked against these preferences.",
                );
              }}
            >
              <h2>Movement & mobility preferences</h2>
              <label className="tf-field">
                <span>Preference name (optional)</span>
                <input
                  name="name"
                  defaultValue={flags.name}
                  maxLength={80}
                  placeholder="e.g. Avoid overhead movements"
                />
              </label>
              <fieldset className="tf-patterns">
                <legend>Movements to avoid</legend>
                {movementOptions.map((p) => (
                  <label className="tf-checkbox" key={p}>
                    <input
                      type="checkbox"
                      checked={patterns.includes(p)}
                      onChange={() =>
                        setPatterns((old) =>
                          old.includes(p)
                            ? old.filter((x) => x !== p)
                            : [...old, p],
                        )
                      }
                    />
                    {p === "Vertical push" ? "Overhead pressing" : p}
                  </label>
                ))}
              </fieldset>
              <label className="tf-field">
                <span>Your notes (optional)</span>
                <textarea
                  name="notes"
                  defaultValue={flags.notes}
                  maxLength={600}
                  placeholder="Anything you want to remember about your training?"
                />
              </label>
              <p className="wp-note">
                Selected movement types are excluded from new workouts and
                swaps. Free-text notes are saved for your reference and do not
                change filtering.
              </p>
              <button className="wp-primary" type="submit">
                Save preferences <span>✓</span>
              </button>
              <p className="wp-note">
                These preferences do not diagnose or treat injuries. Seek
                qualified advice about pain or injury concerns.
              </p>
            </form>
          )}

          {/* WORKOUT PAGE: build a sample plan, edit exercises, compare swaps, and start a session. */}
          {page === "workout" && (
            <>
              <section className="wp-hero">
                <div>
                  <p className="wp-hero-tag">
                    A LITTLE FLEXIBILITY. A LOT OF PROGRESS.
                  </p>
                  <h2>
                    Your plan starts
                    <br />
                    <span>with you.</span>
                  </h2>
                  <p>Build momentum with a workout that fits your gym.</p>
                  <button
                    className="wp-hero-action"
                    type="button"
                    onClick={generate}
                    disabled={!!session}
                  >
                    Build sample workout <span>↗</span>
                  </button>
                </div>
                <div className="wp-disc" aria-hidden="true">
                  <div>
                    ALTLIFT{" "}
                    <strong>
                      20<small>KG</small>
                    </strong>
                    <i />
                    <em>KEEP MOVING</em>
                  </div>
                </div>
              </section>
              <div className="tf-workout-layout">
                <aside>
                  <div className="tf-card">
                    <h2>Your training setup</h2>
                    <dl className="tf-details">
                      <dt>Goal</dt>
                      <dd>{goalLabel(profile.goal)}</dd>
                      <dt>Experience</dt>
                      <dd>{profile.experience}</dd>
                      <dt>Workout</dt>
                      <dd>
                        {focusLabel(profile.focus)} · {profile.duration} min
                      </dd>
                      <dt>Gym</dt>
                      <dd>{training.gymName}</dd>
                      <dt>Equipment</dt>
                      <dd>{equipmentLabel(profile.equipment)}</dd>
                      <dt>Movement preferences</dt>
                      <dd>{flags.patterns.join(", ") || "None selected"}</dd>
                    </dl>
                    <a className="tf-link" href="#profile">
                      Edit training preferences →
                    </a>
                    <a className="tf-link" href="#gym">
                      Manage equipment →
                    </a>
                  </div>
                  <div className="tf-callout">
                    <strong>Keep your momentum.</strong>
                    <p>
                      A useful swap matches a movement pattern and your
                      available equipment.
                    </p>
                    <a href="#programs">View saved programs →</a>
                  </div>
                </aside>
                <section className="tf-card">
                  <div className="tf-section-heading">
                    <h2>
                      {workout
                        ? workout.title
                        : "Your next session starts here."}
                    </h2>
                    {workout && <span className="tf-pill">SAMPLE WORKOUT</span>}
                  </div>
                  {!workout ? (
                    <div className="wp-empty">
                      <div>✳</div>
                      <h3>Let’s make a plan.</h3>
                      <p>
                        Save your preferences, then build an example workout.
                      </p>
                      <button className="wp-primary" onClick={generate}>
                        Build sample workout →
                      </button>
                    </div>
                  ) : (
                    <>
                      {conflicts.length > 0 && (
                        <p className="tf-warning">
                          {conflicts.length} exercise(s) conflict with your
                          current equipment, experience, or movement
                          preferences. Swap them or build a fresh workout.
                        </p>
                      )}
                      <div className="tf-program-controls">
                        <label className="tf-field">
                          <span>Rest between sets (seconds)</span>
                          <input
                            type="number"
                            min="15"
                            max="300"
                            step="15"
                            value={workout.rest || 90}
                            disabled={!!session}
                            onChange={(e) =>
                              commit({
                                ...training,
                                active: {
                                  ...workout,
                                  rest: Math.min(
                                    300,
                                    Math.max(15, Number(e.target.value) || 90),
                                  ),
                                },
                              })
                            }
                          />
                        </label>
                        <span>
                          {workout.items.length} exercises ·{" "}
                          {workout.items.reduce((sum, x) => sum + x.sets, 0)}{" "}
                          total sets
                        </span>
                      </div>
                      <div className="tf-exercise-list">
                        {workout.items.map((item, i) => {
                          const exercise = exerciseById(item.exerciseId);
                          return (
                            <article
                              className={`tf-exercise ${conflicts.includes(item) ? "conflict" : ""}`}
                              key={item.exerciseId}
                            >
                              <div className="tf-exercise-heading">
                                <span className="wp-index">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <small>
                                    {exercise.muscle} · {exercise.pattern}
                                  </small>
                                  <h3>{exercise.name}</h3>
                                  <p>{equipmentLabel(exercise.equipment)}</p>
                                </div>
                                <button
                                  className="wp-swap"
                                  type="button"
                                  disabled={!!session}
                                  onClick={() => setSwap(item)}
                                >
                                  Find a swap ⇄
                                </button>
                              </div>
                              <div className="tf-item-inputs">
                                <label>
                                  Sets
                                  <input
                                    aria-label={`Sets for ${exercise.name}`}
                                    type="number"
                                    min="1"
                                    max="8"
                                    value={item.sets}
                                    disabled={!!session}
                                    onChange={(e) =>
                                      updateActive(
                                        workout.items.map((x) =>
                                          x === item
                                            ? {
                                                ...x,
                                                sets: Math.min(
                                                  8,
                                                  Math.max(
                                                    1,
                                                    Number(e.target.value) || 1,
                                                  ),
                                                ),
                                              }
                                            : x,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                <label>
                                  Reps / time
                                  <input
                                    aria-label={`Reps for ${exercise.name}`}
                                    value={item.reps}
                                    maxLength={24}
                                    disabled={!!session}
                                    onChange={(e) =>
                                      updateActive(
                                        workout.items.map((x) =>
                                          x === item
                                            ? { ...x, reps: e.target.value }
                                            : x,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                <label>
                                  Load (optional)
                                  <input
                                    aria-label={`Load for ${exercise.name}`}
                                    placeholder="e.g. 10 kg"
                                    maxLength={20}
                                    value={item.load || ""}
                                    disabled={!!session}
                                    onChange={(e) =>
                                      updateActive(
                                        workout.items.map((x) =>
                                          x === item
                                            ? { ...x, load: e.target.value }
                                            : x,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                {session && (
                                  <label className="tf-checkbox">
                                    <input
                                      type="checkbox"
                                      aria-label={`Mark ${exercise.name} complete`}
                                      checked={completed.includes(
                                        item.exerciseId,
                                      )}
                                      onChange={() =>
                                        setCompleted((old) =>
                                          old.includes(item.exerciseId)
                                            ? old.filter(
                                                (id) => id !== item.exerciseId,
                                              )
                                            : [...old, item.exerciseId],
                                        )
                                      }
                                    />
                                    Done
                                  </label>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                      {!session ? (
                        <>
                          <form
                            className="tf-save-program"
                            onSubmit={saveProgram}
                          >
                            <label className="tf-field">
                              <span>Program name</span>
                              <input
                                name="title"
                                key={workout.id + workout.title}
                                defaultValue={workout.title}
                                required
                                maxLength={60}
                              />
                            </label>
                            <button className="tf-outline" type="submit">
                              Save program
                            </button>
                          </form>
                          <button
                            className="wp-primary"
                            type="button"
                            disabled={conflicts.length > 0}
                            onClick={() => {
                              setSession(workout.id);
                              setCompleted([]);
                            }}
                          >
                            Start & log session →
                          </button>
                        </>
                      ) : (
                        <div className="tf-callout">
                          <strong>
                            Session in progress · {completed.length}/
                            {workout.items.length} exercises complete
                          </strong>
                          <p>
                            Mark each exercise done as you go. Session progress
                            is temporary until you record it.
                          </p>
                          <button
                            className="tf-outline"
                            onClick={finishSession}
                          >
                            Record session
                          </button>
                          <button
                            className="tf-text-button"
                            onClick={() => {
                              setSession(null);
                              setCompleted([]);
                            }}
                          >
                            Discard session
                          </button>
                        </div>
                      )}
                      <p className="wp-note">
                        Local templates respond to your saved focus, goal,
                        session length, equipment, and selected movement types.
                        They are not live AI recommendations. Choose a
                        comfortable load and stop if a movement causes pain.
                      </p>
                    </>
                  )}
                </section>
              </div>
            </>
          )}

          {/* PROGRAMS PAGE: load or remove saved programs and review recorded sessions. */}
          {page === "programs" && (
            <>
              <div className="tf-program-grid">
                {training.programs.length === 0 && (
                  <div className="tf-card wp-empty">
                    <h2>A home for your go-to plans.</h2>
                    <p>
                      Create a sample workout, give it a name, and save it here.
                    </p>
                    <a href="#workout" className="tf-link">
                      Build a workout →
                    </a>
                  </div>
                )}
                {training.programs.map((program) => (
                  <article className="tf-card" key={program.id}>
                    <span className="tf-pill">
                      {focusLabel(program.profile.focus)}
                    </span>
                    <h2 className="tf-subheading">{program.title}</h2>
                    <p className="wp-note">
                      {program.items.length} exercises ·{" "}
                      {goalLabel(program.profile.goal)}
                    </p>
                    <p className="wp-note">
                      {blockedItems(program, profile, flags).length
                        ? "Review this program against your current gym and movement preferences."
                        : "Matches your current equipment and movement preferences."}
                    </p>
                    <button
                      className="wp-primary"
                      disabled={!!session}
                      onClick={() => {
                        commit({
                          ...training,
                          active: structuredClone(program),
                        });
                        window.location.hash = "workout";
                      }}
                    >
                      Load program →
                    </button>
                    <button
                      className="tf-text-button"
                      onClick={() =>
                        commit(
                          {
                            ...training,
                            programs: training.programs.filter(
                              (p) => p.id !== program.id,
                            ),
                          },
                          "Saved program removed. Your current workout is still available.",
                        )
                      }
                    >
                      Remove saved program
                    </button>
                  </article>
                ))}
              </div>
              <section className="tf-card tf-history">
                <h2>Recent sessions</h2>
                {training.history.length ? (
                  training.history.map((h) => (
                    <div key={h.id}>
                      <strong>{h.title}</strong>
                      <span>
                        {new Date(h.date).toLocaleDateString()} · {h.completed}
                        {Number.isInteger(h.total) ? `/${h.total}` : ""}{" "}
                        exercises complete
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="wp-note">Recorded sessions will appear here.</p>
                )}
              </section>
            </>
          )}

          <footer className="wp-footer">
            <span>MADE FOR THE WAY YOU ACTUALLY TRAIN.</span>
            <span>altlift.</span>
          </footer>
        </div>
      </div>
      {swap && workout && (
        <SwapDialog
          item={swap}
          workout={workout}
          profile={profile}
          flags={flags}
          onClose={() => setSwap(null)}
          onApply={(id) => {
            if (
              !eligibleSwaps(workout, swap.exerciseId, profile, flags).some(
                (e) => e.id === id,
              )
            )
              return;
            updateActive(
              workout.items.map((item) =>
                item.exerciseId === swap.exerciseId
                  ? { ...item, exerciseId: id, load: "" }
                  : item,
              ),
            );
            setSwap(null);
            setMessage(
              "Exercise swapped. Sets and reps kept; choose a suitable load for the new exercise.",
            );
          }}
        />
      )}
    </div>
  );
}
