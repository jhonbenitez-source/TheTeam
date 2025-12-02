import express from 'express';
import { verifyToken } from '../middleware/auth';
import {
  createMatch,
  getMatches,
  getMatchById,
  updateMatchScore,
  finalizeMatch,
  getStandingsByTournamentCategory
} from '../controllers/matches';

const router = express.Router();

router.post('/', verifyToken, createMatch);
router.get('/', verifyToken, getMatches);
router.get('/:id', verifyToken, getMatchById);
router.put('/:id/score', verifyToken, updateMatchScore);
router.patch('/:id/finalize', verifyToken, finalizeMatch);
router.get('/standings/:tournamentId/:category', verifyToken, getStandingsByTournamentCategory);

export default router;
