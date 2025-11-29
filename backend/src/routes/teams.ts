import express from 'express';
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

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:id', getTeamById);
router.put('/:id', updateTeam);
router.post('/:id/coaches', addCoach);
router.patch('/:id/deactivate', deactivateTeam);
router.patch('/:id/reactivate', reactivateTeam);

export default router;
