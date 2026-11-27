export const equipmentOptions = [
  { id: 'dumbbells', label: 'Dumbbells' },
  { id: 'barbell', label: 'Barbell + rack' },
  { id: 'bench', label: 'Bench' },
  { id: 'cable', label: 'Cables' },
  { id: 'machine', label: 'Machines' },
  { id: 'bodyweight', label: 'Bodyweight' },
]

export const goals = [
  { id: 'muscle', label: 'Build muscle', detail: 'A balanced mix of strength movements.', icon: 'dumbbell' },
  { id: 'strength', label: 'Get stronger', detail: 'Practice the main movement patterns.', icon: 'bolt' },
  { id: 'active', label: 'Stay active', detail: 'Keep movement simple and consistent.', icon: 'heart' },
]

export const defaultProfile = {
  goal: 'muscle', experience: 'beginner', focus: 'full', duration: 35,
  equipment: ['dumbbells', 'bench', 'bodyweight'],
}

export const exercises = [
  { id: 'goblet-squat', name: 'Goblet squat', pattern: 'Squat', muscle: 'Quads & glutes', equipment: ['dumbbells'], art: 'squat', level: 'beginner', why: 'A squat with a weight held close to your chest. Loading will differ from a barbell squat.' },
  { id: 'bodyweight-squat', name: 'Bodyweight squat', pattern: 'Squat', muscle: 'Quads & glutes', equipment: ['bodyweight'], art: 'squat', level: 'beginner', why: 'Keeps the squat pattern with no external weight. Use a comfortable, controlled range.' },
  { id: 'barbell-squat', name: 'Barbell back squat', pattern: 'Squat', muscle: 'Quads & glutes', equipment: ['barbell'], art: 'squat', level: 'intermediate', why: 'A loaded squat that also requires bracing and barbell technique.' },
  { id: 'leg-press', name: 'Leg press', pattern: 'Squat', muscle: 'Quads & glutes', equipment: ['machine'], art: 'machine', level: 'beginner', why: 'Trains knee and hip extension in a supported position. Balance demands differ from a free squat.' },
  { id: 'db-bench', name: 'Dumbbell bench press', pattern: 'Horizontal push', muscle: 'Chest & triceps', equipment: ['dumbbells', 'bench'], art: 'bench', level: 'beginner', why: 'A horizontal press with each arm moving independently.' },
  { id: 'floor-press', name: 'Dumbbell floor press', pattern: 'Horizontal push', muscle: 'Chest & triceps', equipment: ['dumbbells'], art: 'floor', level: 'beginner', why: 'Keeps the pressing pattern with a shorter range of motion. The floor replaces the bench.' },
  { id: 'pushup', name: 'Push-up', pattern: 'Horizontal push', muscle: 'Chest & triceps', equipment: ['bodyweight'], art: 'pushup', level: 'beginner', why: 'A bodyweight horizontal press. Adjust your reps to a difficulty you can control.' },
  { id: 'wall-pushup', name: 'Wall push-up', pattern: 'Horizontal push', muscle: 'Chest & triceps', equipment: ['bodyweight'], art: 'pushup', level: 'beginner', why: 'An upright pressing option using a clear wall. Difficulty differs from a floor push-up.' },
  { id: 'barbell-bench', name: 'Barbell bench press', pattern: 'Horizontal push', muscle: 'Chest & triceps', equipment: ['barbell', 'bench'], art: 'bench', level: 'intermediate', why: 'Uses the same pressing pattern with a barbell. Adjust the load and use a safe setup.' },
  { id: 'machine-press', name: 'Machine chest press', pattern: 'Horizontal push', muscle: 'Chest & triceps', equipment: ['machine'], art: 'machine', level: 'beginner', why: 'A supported horizontal press that reduces the need to balance separate weights.' },
  { id: 'db-rdl', name: 'Dumbbell Romanian deadlift', pattern: 'Hip hinge', muscle: 'Hamstrings & glutes', equipment: ['dumbbells'], art: 'row', level: 'beginner', why: 'A hip hinge with dumbbells held close to your body.' },
  { id: 'bodyweight-hinge', name: 'Bodyweight hip hinge', pattern: 'Hip hinge', muscle: 'Hamstrings & glutes', equipment: ['bodyweight'], art: 'row', level: 'beginner', why: 'Practices the hinge pattern without added resistance. The training load is lower.' },
  { id: 'barbell-rdl', name: 'Barbell Romanian deadlift', pattern: 'Hip hinge', muscle: 'Hamstrings & glutes', equipment: ['barbell'], art: 'row', level: 'intermediate', why: 'A loaded hip hinge with a barbell. Choose an appropriate load for this variation.' },
  { id: 'db-row', name: 'Dumbbell row', pattern: 'Horizontal pull', muscle: 'Back & biceps', equipment: ['dumbbells'], art: 'row', level: 'beginner', why: 'A horizontal pull with each arm working independently.' },
  { id: 'cable-row', name: 'Seated cable row', pattern: 'Horizontal pull', muscle: 'Back & biceps', equipment: ['cable'], art: 'row', level: 'beginner', why: 'Keeps the horizontal pulling pattern with adjustable cable resistance.' },
  { id: 'machine-row', name: 'Machine row', pattern: 'Horizontal pull', muscle: 'Back & biceps', equipment: ['machine'], art: 'machine', level: 'beginner', why: 'A guided horizontal pull. The setup and stability demands vary by machine.' },
  { id: 'barbell-row', name: 'Barbell row', pattern: 'Horizontal pull', muscle: 'Back & biceps', equipment: ['barbell'], art: 'row', level: 'intermediate', why: 'A horizontal pull performed while holding a hip hinge.' },
  { id: 'shoulder-press', name: 'Dumbbell shoulder press', pattern: 'Vertical push', muscle: 'Shoulders & triceps', equipment: ['dumbbells'], art: 'press', level: 'beginner', why: 'A vertical press with separate weights. Use a comfortable range.' },
  { id: 'machine-shoulder', name: 'Machine shoulder press', pattern: 'Vertical push', muscle: 'Shoulders & triceps', equipment: ['machine'], art: 'press', level: 'beginner', why: 'A supported vertical press with guided resistance.' },
  { id: 'barbell-press', name: 'Barbell overhead press', pattern: 'Vertical push', muscle: 'Shoulders & triceps', equipment: ['barbell'], art: 'press', level: 'intermediate', why: 'A vertical press that also requires standing balance and bracing.' },
  { id: 'reverse-lunge', name: 'Reverse lunge', pattern: 'Lunge', muscle: 'Quads & glutes', equipment: ['bodyweight'], art: 'squat', level: 'beginner', why: 'A single-leg movement with no external weight.' },
  { id: 'db-lunge', name: 'Dumbbell reverse lunge', pattern: 'Lunge', muscle: 'Quads & glutes', equipment: ['dumbbells'], art: 'squat', level: 'beginner', why: 'Keeps the lunge pattern while adding dumbbell resistance.' },
  { id: 'dead-bug', name: 'Dead bug', pattern: 'Core control', muscle: 'Core', equipment: ['bodyweight'], art: 'floor', level: 'beginner', why: 'Practices trunk control while moving opposite arms and legs.' },
  { id: 'plank', name: 'Plank', pattern: 'Core control', muscle: 'Core', equipment: ['bodyweight'], art: 'pushup', level: 'beginner', why: 'An isometric trunk-control option. Use a time target instead of counting reps.' },
]

export function exerciseById(id) { return exercises.find(exercise => exercise.id === id) }
export function equipmentLabel(ids) { return ids.map(id => equipmentOptions.find(option => option.id === id)?.label).filter(Boolean).join(' + ') }
export function focusLabel(focus) { return { full: 'Full body', upper: 'Upper body', lower: 'Lower body' }[focus] }
export function goalLabel(goal) { return goals.find(item => item.id === goal)?.label || 'Build muscle' }

export function isProfile(value) {
  return value && goals.some(goal => goal.id === value.goal)
    && ['beginner', 'intermediate'].includes(value.experience)
    && ['full', 'upper', 'lower'].includes(value.focus)
    && [20, 35, 50].includes(value.duration)
    && Array.isArray(value.equipment) && value.equipment.length > 0
    && value.equipment.every(id => equipmentOptions.some(option => option.id === id))
}

export function isWorkout(value) {
  return value && typeof value.id === 'string' && typeof value.title === 'string'
    && isProfile(value.profile) && Array.isArray(value.items) && value.items.length > 0
    && value.items.every(item => exerciseById(item.exerciseId) && Number.isInteger(item.sets)
      && item.sets >= 1 && item.sets <= 8 && typeof item.reps === 'string')
    && new Set(value.items.map(item => item.exerciseId)).size === value.items.length
}

export function alternativesFor(id, available, experience = 'beginner') {
  const original = exerciseById(id)
  if (!original) return []
  return exercises.filter(exercise => exercise.id !== id && exercise.pattern === original.pattern
    && (experience === 'intermediate' || exercise.level === 'beginner')
    && exercise.equipment.every(equipment => available.includes(equipment)))
}

// Local templates make the frontend reviewable. Replace this with the AI-backed
// recommendation endpoint later, keeping equipment and exercise-library checks.
export function buildWorkout(profile, variant = 0) {
  const patterns = {
    full: ['Squat', 'Horizontal push', 'Hip hinge', 'Horizontal pull', 'Core control', 'Lunge'],
    upper: ['Horizontal push', 'Horizontal pull', 'Vertical push', 'Core control', 'Horizontal push', 'Horizontal pull'],
    lower: ['Squat', 'Hip hinge', 'Lunge', 'Core control', 'Squat', 'Hip hinge'],
  }[profile.focus] || []
  const count = profile.duration === 20 ? 3 : profile.duration === 50 ? 6 : 5
  const items = []
  for (const [index, pattern] of patterns.entries()) {
    if (items.length >= count) break
    const options = exercises.filter(exercise => exercise.pattern === pattern
      && (profile.experience === 'intermediate' || exercise.level === 'beginner')
      && exercise.equipment.every(id => profile.equipment.includes(id))
      && !items.some(item => item.exerciseId === exercise.id))
    if (!options.length) continue
    const exercise = options[(variant + index) % options.length]
    items.push({ exerciseId: exercise.id, sets: profile.goal === 'active' ? 2 : 3,
      reps: exercise.id === 'plank' ? '20–30 sec' : exercise.id === 'dead-bug' ? '8–10 / side' : profile.goal === 'strength' ? '6–8 reps' : '8–12 reps' })
  }
  return { id: crypto.randomUUID(), title: `${focusLabel(profile.focus)} ${profile.goal === 'strength' ? 'strength' : profile.goal === 'active' ? 'movement' : 'foundation'}`, profile: structuredClone(profile), items }
}
