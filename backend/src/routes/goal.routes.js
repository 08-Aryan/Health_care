const express = require('express');
const router = express.Router();

const {
    createGoal,
    getGoals,
    getGoalById,
    updateGoal,
    deleteGoal
} = require('../controllers/goal.controller');

const { protect } = require('../middlewares/auth.middleware');

// Protected Goal Routes
router.route('/')
    .post(protect, createGoal)
    .get(protect, getGoals);

router.route('/:id')
    .get(protect, getGoalById)
    .put(protect, updateGoal)
    .delete(protect, deleteGoal);

module.exports = router;
