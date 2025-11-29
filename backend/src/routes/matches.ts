import express from 'express';
import {
  createMatch,
  getMatches,
  getMatchById,
  updateMatchScore,
  finalizeMatch,
  getStandingsByTournamentCategory
} from '../controllers/matches';

const router = express.Router();

router.post('/', createMatch);
router.get('/', getMatches);
router.get('/:id', getMatchById);
router.put('/:id/score', updateMatchScore);
router.patch('/:id/finalize', finalizeMatch);
router.get('/standings/:tournamentId/:category', getStandingsByTournamentCategory);

export default router;
