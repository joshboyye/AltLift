export const equipmentList = [
  {
    id: "dumbbells",
    name: "Dumbbells",
    detail: "A little weight. A lot of possibilities.",
    icon: "dumbbell",
  },
  {
    id: "barbell",
    name: "Barbell + rack",
    detail: "Your compound lift essentials.",
    icon: "barbell",
  },
  { id: "bench", name: "Bench", detail: "Flat or adjustable.", icon: "bench" },
  {
    id: "cable",
    name: "Cable machine",
    detail: "Constant tension, more options.",
    icon: "cable",
  },
  {
    id: "machine",
    name: "Weight machines",
    detail: "Guided movement, focused effort.",
    icon: "machine",
  },
  {
    id: "bodyweight",
    name: "Bodyweight",
    detail: "Just you and a little floor space.",
    icon: "person",
  },
];

export const exercises = [
  {
    id: "barbell-bench",
    name: "Barbell bench press",
    muscle: "Chest",
    pattern: "Horizontal push",
    equipment: ["barbell", "bench"],
    level: "Intermediate",
    kind: "bench",
    description:
      "A compound press for the chest, with help from your triceps and front delts.",
    cue: "Keep your feet planted and lower with control.",
  },
  {
    id: "dumbbell-bench",
    name: "Dumbbell bench press",
    muscle: "Chest",
    pattern: "Horizontal push",
    equipment: ["dumbbells", "bench"],
    level: "Beginner",
    kind: "bench",
    description:
      "Keeps the same horizontal pressing pattern, while allowing each arm to move independently.",
    cue: "Keep your wrists stacked over your elbows.",
  },
  {
    id: "floor-press",
    name: "Dumbbell floor press",
    muscle: "Chest",
    pattern: "Horizontal push",
    equipment: ["dumbbells"],
    level: "Beginner",
    kind: "floor",
    description:
      "A horizontal press with a shorter range of motion. The floor limits how far your elbows travel behind you.",
    cue: "Touch your upper arms to the floor gently, then press.",
  },
  {
    id: "pushup",
    name: "Push-up",
    muscle: "Chest",
    pattern: "Horizontal push",
    equipment: ["bodyweight"],
    level: "Beginner",
    kind: "pushup",
    description:
      "Trains a similar pressing pattern with your bodyweight. Adjust the incline to find a manageable difficulty.",
    cue: "Keep a straight line from your head to your heels.",
  },
  {
    id: "machine-press",
    name: "Machine chest press",
    muscle: "Chest",
    pattern: "Horizontal push",
    equipment: ["machine"],
    level: "Beginner",
    kind: "machine",
    description:
      "A guided horizontal press that reduces the need to balance the weight.",
    cue: "Set the seat so the handles line up with your mid-chest.",
  },
  {
    id: "cable-press",
    name: "Standing cable press",
    muscle: "Chest",
    pattern: "Horizontal push",
    equipment: ["cable"],
    level: "Intermediate",
    kind: "cable",
    description:
      "Keeps the pressing pattern with cable resistance and a standing stance.",
    cue: "Brace your core and avoid leaning into the press.",
  },
];