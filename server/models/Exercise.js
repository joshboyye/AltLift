import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({

  identifier: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  pattern: {
    type: String,
    required: true,
    enum: [
        'Horizontal push',
        'Vertical push',
        'Horizontal pull',
        'Vertical pull',
        'Squat',
        'Hinge',
        'Lunge',
        'Carry',
        'Core',
        'Isolation'
    ]
  },

  primaryMuscles: [{
    type: String,
    enum: [
        'chest',
        'lats',
        'upper back',
        'lower back',
        'biceps',
        'triceps',
        'forearms',
        'front delts',
        'side delts',
        'rear delts',
        'quads',
        'hamstrings',
        'glutes',
        'calves',
        'abs',
        'obliques',
        'adductors',
        'hip flexors',
        'traps'
    ], 
    required: true
  }],

  secondaryMuscles: [{
    type: String,
    enum: [
        'chest',
        'lats',
        'upper back',
        'lower back',
        'biceps',
        'triceps',
        'forearms',
        'front delts',
        'side delts',
        'rear delts',
        'quads',
        'hamstrings',
        'glutes',
        'calves',
        'abs',
        'obliques',
        'adductors',
        'hip flexors',
        'traps'
    ]
  }],

  equipment: [{
    type: String,
    enum: [
        'barbell',
        'dumbbells',
        'ez bar',
        'kettlebell',
        'cable',
        'machine',
        'bodyweight',
        'bench',
        'pull up bar',
        'ab wheel',
        'resistance band'
    ],
    required: true
  }],

  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  kind: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cue: {
    type: String,
    required: true
  },

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
  pattern: 1,
  primaryMuscles: 1
})

exerciseSchema.index({
  equipment: 1
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
