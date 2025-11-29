import express from 'express';
import { getDashboard, getStandingsByTournament } from '../controllers/dashboard';

const router = express.Router();

router.get('/', getDashboard);
router.get('/standings/:tournamentId', getStandingsByTournament);

export default router;
