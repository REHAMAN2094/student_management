const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// Get all students with sorting
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || 'name';  // Default sort by name
    const sortOrder = req.query.sortOrder || 'asc'; // Default sort order is ascending
  
    try {
      const students = await Student.find()
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }) // Sort by the given field
        .skip((page - 1) * limit)
        .limit(limit);
  
      const totalStudents = await Student.countDocuments();
      res.json({
        students,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

// Add a new student
router.post('/', async (req, res) => {
  const { name, age, course } = req.body;
  const newStudent = new Student({ name, age, course });
  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
    const { name, age, course } = req.body;
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { name, age, course },
        { new: true }
      );
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete a student
router.delete('/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      res.json(deletedStudent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = router;
