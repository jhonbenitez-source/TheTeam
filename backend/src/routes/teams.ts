import express from 'express';
import { verifyToken } from '../middleware/auth';
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addCoach,
  deactivateTeam,
  reactivateTeam
} from '../controllers/teams';

const router = express.Router();

router.post('/', verifyToken, createTeam);
router.get('/', verifyToken, getTeams);
router.get('/:id', verifyToken, getTeamById);
router.put('/:id', verifyToken, updateTeam);
router.post('/:id/coaches', verifyToken, addCoach);
router.patch('/:id/deactivate', verifyToken, deactivateTeam);
router.patch('/:id/reactivate', verifyToken, reactivateTeam);

export default router;
