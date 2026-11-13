
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
    required: true
  }],

  secondaryMuscles: [{
    type: String
  }],

  equipment: [{
    type: String,
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
