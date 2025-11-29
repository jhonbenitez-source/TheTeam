import express from 'express';
import {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deactivateTournament
} from '../controllers/tournaments';

const router = express.Router();

router.post('/', createTournament);
router.get('/', getTournaments);
router.get('/:id', getTournamentById);
router.put('/:id', updateTournament);
router.patch('/:id/deactivate', deactivateTournament);

export default router;
