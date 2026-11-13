
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Exercise from '../models/Exercise.js'

dotenv.config()

// Helper function for creating exercise records
function add(name, pattern, primary, secondary, equipment, unilateral = false) {
  return {
    name,
    identifier: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    movementPattern: pattern,
    primaryMuscles: primary,
    secondaryMuscles: secondary,
    equipment,
    isCompound: pattern !== 'isolation',
    isUnilateral: unilateral
  }
}

const exercises = [

  // HORIZONTAL PUSH (8)
  add('Barbell Bench Press', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['barbell', 'bench']),
  add('Dumbbell Bench Press', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['dumbbell', 'bench']),
  add('Incline Barbell Bench Press', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['barbell', 'bench']),
  add('Incline Dumbbell Press', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['dumbbell', 'bench']),
  add('Decline Bench Press', 'horizontal_push', ['chest'], ['triceps'], ['barbell', 'bench']),
  add('Push-Up', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['bodyweight']),
  add('Machine Chest Press', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['machine']),
  add('Cable Chest Press', 'horizontal_push', ['chest'], ['front_delts', 'triceps'], ['cable']),

  // VERTICAL PUSH (6)
  add('Barbell Overhead Press', 'vertical_push', ['front_delts', 'side_delts'], ['triceps'], ['barbell']),
  add('Dumbbell Shoulder Press', 'vertical_push', ['front_delts'], ['side_delts', 'triceps'], ['dumbbell']),
  add('Arnold Press', 'vertical_push', ['front_delts'], ['side_delts', 'triceps'], ['dumbbell']),
  add('Machine Shoulder Press', 'vertical_push', ['front_delts'], ['side_delts', 'triceps'], ['machine']),
  add('Landmine Press', 'vertical_push', ['front_delts'], ['chest', 'triceps'], ['barbell']),
  add('Pike Push-Up', 'vertical_push', ['front_delts'], ['triceps'], ['bodyweight']),

  // HORIZONTAL PULL (8)
  add('Barbell Bent-Over Row', 'horizontal_pull', ['upper_back', 'lats'], ['biceps', 'rear_delts'], ['barbell']),
  add('One-Arm Dumbbell Row', 'horizontal_pull', ['lats'], ['upper_back', 'biceps'], ['dumbbell'], true),
  add('Chest-Supported Dumbbell Row', 'horizontal_pull', ['upper_back'], ['lats', 'biceps'], ['dumbbell', 'bench']),
  add('Seated Cable Row', 'horizontal_pull', ['upper_back'], ['lats', 'biceps'], ['cable']),
  add('Machine Row', 'horizontal_pull', ['upper_back'], ['lats', 'biceps'], ['machine']),
  add('Inverted Row', 'horizontal_pull', ['upper_back'], ['biceps', 'rear_delts'], ['bodyweight']),
  add('Single-Arm Cable Row', 'horizontal_pull', ['lats'], ['upper_back', 'biceps'], ['cable'], true),
  add('T-Bar Row', 'horizontal_pull', ['upper_back'], ['lats', 'biceps'], ['barbell', 'machine']),

  // VERTICAL PULL (6)
  add('Pull-Up', 'vertical_pull', ['lats'], ['biceps', 'upper_back'], ['bodyweight', 'pull_up_bar']),
  add('Chin-Up', 'vertical_pull', ['lats', 'biceps'], ['upper_back'], ['bodyweight', 'pull_up_bar']),
  add('Lat Pulldown', 'vertical_pull', ['lats'], ['biceps', 'upper_back'], ['cable']),
  add('Close-Grip Lat Pulldown', 'vertical_pull', ['lats'], ['biceps', 'upper_back'], ['cable']),
  add('Assisted Pull-Up', 'vertical_pull', ['lats'], ['biceps', 'upper_back'], ['machine']),
  add('Straight-Arm Pulldown', 'vertical_pull', ['lats'], ['triceps'], ['cable']),

  // SQUAT (8)
  add('Barbell Back Squat', 'squat', ['quads', 'glutes'], ['hamstrings', 'adductors'], ['barbell']),
  add('Front Squat', 'squat', ['quads'], ['glutes', 'abs'], ['barbell']),
  add('Goblet Squat', 'squat', ['quads', 'glutes'], ['abs'], ['dumbbell']),
  add('Hack Squat', 'squat', ['quads'], ['glutes'], ['machine']),
  add('Leg Press', 'squat', ['quads', 'glutes'], ['hamstrings'], ['machine']),
  add('Box Squat', 'squat', ['quads', 'glutes'], ['hamstrings'], ['barbell']),
  add('Smith Machine Squat', 'squat', ['quads', 'glutes'], ['hamstrings'], ['machine']),
  add('Heels-Elevated Dumbbell Squat', 'squat', ['quads'], ['glutes'], ['dumbbell']),

  // HINGE (8)
  add('Conventional Deadlift', 'hinge', ['hamstrings', 'glutes', 'lower_back'], ['quads', 'traps'], ['barbell']),
  add('Sumo Deadlift', 'hinge', ['glutes', 'adductors'], ['hamstrings', 'quads'], ['barbell']),
  add('Barbell Romanian Deadlift', 'hinge', ['hamstrings'], ['glutes', 'lower_back'], ['barbell']),
  add('Dumbbell Romanian Deadlift', 'hinge', ['hamstrings'], ['glutes', 'lower_back'], ['dumbbell']),
  add('Good Morning', 'hinge', ['hamstrings', 'lower_back'], ['glutes'], ['barbell']),
  add('Barbell Hip Thrust', 'hinge', ['glutes'], ['hamstrings'], ['barbell', 'bench']),
  add('Glute Bridge', 'hinge', ['glutes'], ['hamstrings'], ['bodyweight']),
  add('Cable Pull-Through', 'hinge', ['glutes', 'hamstrings'], ['lower_back'], ['cable']),

  // LUNGE (8)
  add('Reverse Lunge', 'lunge', ['quads', 'glutes'], ['hamstrings'], ['bodyweight'], true),
  add('Forward Lunge', 'lunge', ['quads'], ['glutes', 'hamstrings'], ['bodyweight'], true),
  add('Walking Lunge', 'lunge', ['quads', 'glutes'], ['hamstrings'], ['dumbbell'], true),
  add('Bulgarian Split Squat', 'lunge', ['quads', 'glutes'], ['hamstrings'], ['dumbbell'], true),
  add('Dumbbell Step-Up', 'lunge', ['quads', 'glutes'], ['hamstrings'], ['dumbbell', 'bench'], true),
  add('Lateral Lunge', 'lunge', ['quads', 'adductors'], ['glutes'], ['bodyweight'], true),
  add('Curtsy Lunge', 'lunge', ['glutes'], ['quads', 'adductors'], ['dumbbell'], true),
  add('Split Squat', 'lunge', ['quads', 'glutes'], ['hamstrings'], ['bodyweight'], true),

  // CARRY (4)
  add('Farmer Carry', 'carry', ['forearms', 'traps'], ['abs', 'glutes'], ['dumbbell']),
  add('Suitcase Carry', 'carry', ['obliques', 'forearms'], ['traps', 'abs'], ['dumbbell'], true),
  add('Front Rack Carry', 'carry', ['abs', 'upper_back'], ['forearms', 'quads'], ['kettlebell']),
  add('Overhead Carry', 'carry', ['front_delts', 'abs'], ['triceps', 'traps'], ['dumbbell']),

  // CORE (12)
  add('Plank', 'core', ['abs'], ['obliques'], ['bodyweight']),
  add('Side Plank', 'core', ['obliques'], ['abs'], ['bodyweight'], true),
  add('Dead Bug', 'core', ['abs'], ['obliques'], ['bodyweight']),
  add('Bird Dog', 'core', ['abs', 'lower_back'], ['glutes'], ['bodyweight']),
  add('Ab Wheel Rollout', 'core', ['abs'], ['lats', 'shoulders'], ['ab_wheel']),
  add('Hanging Knee Raise', 'core', ['abs'], ['hip_flexors'], ['pull_up_bar']),
  add('Hanging Leg Raise', 'core', ['abs'], ['hip_flexors'], ['pull_up_bar']),
  add('Cable Crunch', 'core', ['abs'], [], ['cable']),
  add('Reverse Crunch', 'core', ['abs'], ['hip_flexors'], ['bodyweight']),
  add('Pallof Press', 'core', ['obliques'], ['abs'], ['cable']),
  add('Russian Twist', 'core', ['obliques'], ['abs'], ['bodyweight']),
  add('Back Extension', 'core', ['lower_back'], ['glutes', 'hamstrings'], ['machine']),

  // ISOLATION (12)
  add('Dumbbell Bicep Curl', 'isolation', ['biceps'], ['forearms'], ['dumbbell']),
  add('Hammer Curl', 'isolation', ['biceps', 'forearms'], [], ['dumbbell']),
  add('EZ-Bar Curl', 'isolation', ['biceps'], ['forearms'], ['ez_bar']),
  add('Preacher Curl', 'isolation', ['biceps'], ['forearms'], ['ez_bar', 'bench']),
  add('Cable Bicep Curl', 'isolation', ['biceps'], ['forearms'], ['cable']),
  add('Triceps Pushdown', 'isolation', ['triceps'], [], ['cable']),
  add('Skull Crusher', 'isolation', ['triceps'], [], ['ez_bar', 'bench']),
  add('Overhead Triceps Extension', 'isolation', ['triceps'], [], ['cable']),
  add('Dumbbell Lateral Raise', 'isolation', ['side_delts'], [], ['dumbbell']),
  add('Reverse Dumbbell Fly', 'isolation', ['rear_delts'], ['upper_back'], ['dumbbell']),
  add('Leg Extension', 'isolation', ['quads'], [], ['machine']),
  add('Leg Curl', 'isolation', ['hamstrings'], [], ['machine'])
]

// Seed database
async function seedExercises() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from .env')
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB Atlas')

    const operations = exercises.map(exercise => ({
      updateOne: {
        filter: { identifier: exercise.identifier },
        update: { $set: exercise },
        upsert: true
      }
    }))

    const result = await Exercise.bulkWrite(operations)

    console.log(`Seed complete: ${exercises.length} exercises processed`)
    console.log(`Inserted: ${result.upsertedCount}`)
    console.log(`Updated: ${result.modifiedCount}`)
    console.log(`Total exercises in database: ${await Exercise.countDocuments()}`)

  } catch (error) {
    console.error('Seed failed:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedExercises()
