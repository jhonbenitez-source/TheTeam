import express from 'express';
import { verifyToken } from '../middleware/auth';
import {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deactivateTournament
} from '../controllers/tournaments';

const router = express.Router();

router.post('/', verifyToken, createTournament);
router.get('/', verifyToken, getTournaments);
router.get('/:id', verifyToken, getTournamentById);
router.put('/:id', verifyToken, updateTournament);
router.patch('/:id/deactivate', verifyToken, deactivateTournament);

export default router;
