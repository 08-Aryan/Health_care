const express = require('express');
const router = express.Router();

const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../controllers/patient.controller');

const { protect } = require('../middlewares/auth.middleware');

// Protected Patient Routes
router.route('/')
    .post(protect, createPatient)
    .get(protect, getAllPatients);

router.route('/:id')
    .get(protect, getPatientById)
    .put(protect, updatePatient)
    .delete(protect, deletePatient);

module.exports = router;
