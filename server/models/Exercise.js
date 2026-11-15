
import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  identifier: {
    type: String,
    required: true,
    unique: true
  },

  movementPattern: {
    type: String,
    required: true,
    enum: [
        'horizontal_push',
        'vertical_push',
        'horizontal_pull',
        'vertical_pull',
        'squat',
        'hinge',
        'lunge',
        'carry',
        'core',
        'isolation'
    ]
  },

  primaryMuscles: [{
    type: String,
    enum: [
        'chest',
        'lats',
        'upper_back',
        'lower_back',
        'biceps',
        'triceps',
        'forearms',
        'front_delts',
        'side_delts',
        'rear_delts',
        'quads',
        'hamstrings',
        'glutes',
        'calves',
        'abs',
        'obliques',
        'adductors',
        'hip_flexors',
        'traps'
    ], 
    required: true
  }],

  secondaryMuscles: [{
    type: String,
    enum: [
        'chest',
        'lats',
        'upper_back',
        'lower_back',
        'biceps',
        'triceps',
        'forearms',
        'front_delts',
        'side_delts',
        'rear_delts',
        'quads',
        'hamstrings',
        'glutes',
        'calves',
        'abs',
        'obliques',
        'adductors',
        'hip_flexors',
        'traps'
    ]
  }],

  equipment: [{
    type: String,
    enum: [
        'barbell',
        'dumbbell',
        'ez_bar',
        'kettlebell',
        'cable',
        'machine',
        'bodyweight',
        'bench',
        'pull_up_bar',
        'ab_wheel',
        'resistance_band'
    ],
    required: true
  }],

  isCompound: {
    type: Boolean,
    default: true
  },

  isUnilateral: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

exerciseSchema.index({
  movementPattern: 1,
  primaryMuscles: 1
})

exerciseSchema.index({
  equipment: 1
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
