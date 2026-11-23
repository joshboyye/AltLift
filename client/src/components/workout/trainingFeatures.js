import {
  defaultProfile,
  isProfile,
  isWorkout,
  exerciseById,
  buildWorkout,
  alternativesFor,
} from "./workoutData.js";

export const storageKey = "altlift-training-v2";
export const movementOptions = [
  "Vertical push",
  "Lunge",
  "Squat",
  "Hip hinge",
  "Horizontal push",
  "Horizontal pull",
];
export const initialTraining = {
  profile: {
    ...defaultProfile,
    name: "",
    weight: "",
    height: "",
    sex: "Prefer not to say",
    sessions: "3",
  },
  gymName: "My gym",
  flags: { name: "", notes: "", patterns: [] },
  programs: [],
  history: [],
  active: null,
};

export function isTraining(value) {
  return (
    !!value &&
    isProfile(value.profile) &&
    ["name", "weight", "height", "sex", "sessions"].every(
      (key) => typeof value.profile[key] === "string",
    ) &&
    typeof value.gymName === "string" &&
    !!value.flags &&
    typeof value.flags.name === "string" &&
    typeof value.flags.notes === "string" &&
    Array.isArray(value.flags.patterns) &&
    value.flags.patterns.every((p) => movementOptions.includes(p)) &&
    Array.isArray(value.programs) &&
    value.programs.every(isWorkout) &&
    (value.active === null || isWorkout(value.active)) &&
    Array.isArray(value.history) &&
    value.history.every(
      (h) =>
        typeof h.id === "string" &&
        typeof h.title === "string" &&
        typeof h.date === "string" &&
        Number.isInteger(h.completed),
    )
  );
}

export function allowedExercise(exercise, profile, flags) {
  return (
    !!exercise &&
    !flags.patterns.includes(exercise.pattern) &&
    exercise.equipment.every((id) => profile.equipment.includes(id)) &&
    (profile.experience === "intermediate" || exercise.level === "beginner")
  );
}

export function createLocalWorkout(profile, flags) {
  const workout = buildWorkout(profile);
  return {
    ...workout,
    items: workout.items.filter((item) =>
      allowedExercise(exerciseById(item.exerciseId), profile, flags),
    ),
  };
}

export function eligibleSwaps(workout, exerciseId, profile, flags) {
  return alternativesFor(
    exerciseId,
    profile.equipment,
    profile.experience,
  ).filter(
    (exercise) =>
      allowedExercise(exercise, profile, flags) &&
      !workout.items.some((item) => item.exerciseId === exercise.id),
  );
}

export function blockedItems(workout, profile, flags) {
  return workout.items.filter(
    (item) => !allowedExercise(exerciseById(item.exerciseId), profile, flags),
  );
}
