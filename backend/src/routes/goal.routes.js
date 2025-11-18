import express from 'express';
import { 
    addGoal, 
    getGoals, 
    getGoalsByPatientId
} from '../controllers/goal.controller.js'; 

import auth from '../middlewares/auth.js';
import rbac from '../middlewares/rbac.js';

const router = express.Router();

// Protected Goal Routes
router.route('/')
    .post(auth, rbac("patient"), addGoal)
    .get(auth, getGoals);

// Provider can get goals by patient ID
router.get('/patient/:patientId', auth, rbac("provider"), getGoalsByPatientId);

export default router;
