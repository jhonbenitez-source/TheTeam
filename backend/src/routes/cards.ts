import express from 'express';
import { generateCard, searchPlayer } from '../controllers/cards';

const router = express.Router();

router.get('/generate', generateCard);
router.get('/search', searchPlayer);

export default router;
