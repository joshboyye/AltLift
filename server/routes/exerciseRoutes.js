
import express from 'express'
import Exercise from '../models/Exercise.js'

const router = express.Router()

// GET /api/exercises - Retrieve all exercises, with optional filters
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

    res.status(200).json({  //Successful HTTP code
      count: exercises.length,
      data: exercises
    })

  } catch (error) {
    res.status(500).json({  //Generic Failed request HTTP error code
      message: 'Failed to retrieve exercises',
      error: error.message
    })
  }
})

// GET /api/exercises/:identifier - Retrieve one exercise by its identifier
router.get('/:identifier', async (req, res) => {
  try {
    const exercise = await Exercise.findOne({
      identifier: req.params.identifier
    })

    if (!exercise) {
      return res.status(404).json({  //Error code: Server reached, but page not found
        message: 'Exercise not found'
      })
    }

    res.status(200).json(exercise)

  } catch (error) {
    res.status(500).json({  //Generic Failed request HTTP error code
      message: 'Failed to retrieve exercise',
      error: error.message
    })
  }
})

// POST /api/exercises - Admin or user creates a new or custom exercise
router.post('/', async (req, res) => {
    try {
        const exercise = await Exercise.create(req.body)

        res.status(201).json({  //POST created successfully HTTP code
            message: 'Exercise created successfully',
            data: exercise
        })

    } catch (error) {
        if (error.code === 11000) {  //MongoDB duplicate-key error code
            return res.status(409).json({  //HTTP conflict error status code
                messgae: 'An exercise with that name or identifier already exists'
            })
        }

        if (error.name === 'ValidationError') {  //Mongoose validation error name
            return res.status(400).json({  //HTTP Bad Request error code
                message: 'Invalid exercise data',
                error: error.message
            })
        }

        res.status(500).json({  //Generic Failed request HTTP error code
            message: 'Failed to create exercise',
            error: error.message
        })
    }
})

// PATCH /api/exercises/:identifier - Updating an existing exercise
router.patch('/:identifier', async (req, res) => {
    try {
        const exercise = await Exercise.findOneAndUpdate(
            { identifier: req.params.identifier },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!exercise) {
            return res.status(404).json({
                message: 'Exercise not found'
            })
        }

        res.status(200).json({
            message: 'Exercise updated successfully',
            data: exercise
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'An exercise with that name or identifier already exists'
            })
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Invalid exercise data',
                error: error.message
            })
        }

        res.status(500).json({
            message: 'Failed to update exercise',
            error: error.message
        })
    }
})

// DELETE /api/exercises/:identifier - Delete an exercise
router.delete('/:identifier', async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({
      identifier: req.params.identifier
    })

    if (!exercise) {
      return res.status(404).json({
        message: 'Exercise not found'
      })
    }

    res.status(200).json({
      message: 'Exercise deleted successfully',
      data: exercise
    })

  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete exercise',
      error: error.message
    })
  }
})

export default router
