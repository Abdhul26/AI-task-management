const express = require('express')
const Task = require('../models/Task') // Ensure the path is correct
const router = express.Router()

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Get a task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Update a task by ID
router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
