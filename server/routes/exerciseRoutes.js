
import express from 'express'
import Exercise from '../models/Exercise.js'

const router = express.Router()

//GET /api/exercises - Retrieve all exercises, with optional filters
router.get('/', async (req, res) => {
  try {
    const { pattern, primaryMuscle, secondaryMuscle, equipment, search } = req.query

    const filter = {}

    console.log('Query:', req.query) //debugging

    if (pattern) {
      filter.movementPattern = pattern
    }

    if (primaryMuscle) {
      filter.primaryMuscles = primaryMuscle
    }

    if (secondaryMuscle) {
      filter.secondaryMuscles = secondaryMuscle
    }

    if (equipment) {
      filter.equipment = equipment
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: 'i'
      }
    }

    console.log('Filter:', JSON.stringify(filter, null, 2)) //debugging

    const exercises = await Exercise.find(filter).sort({ name: 1 })

    res.status(200).json({
      count: exercises.length,
      data: exercises
    })

  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve exercises',
      error: error.message
    })
  }
})

//GET /api/exercises/:identifier - Retrieve one exercise by its identifier
router.get('/:identifier', async (req, res) => {
  try {
    const exercise = await Exercise.findOne({
      identifier: req.params.identifier
    })

    if (!exercise) {
      return res.status(404).json({
        message: 'Exercise not found'
      })
    }

    res.status(200).json(exercise)

  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve exercise',
      error: error.message
    })
  }
})

export default router
