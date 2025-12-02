import { Response } from 'express';
import Tournament from '../models/Tournament';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';
import type { AuthenticatedRequest } from '../middleware/auth';

export const createTournament = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { name, sport, type, categories, participatingTeams } = req.body;
  const userId = req.user?.id;
  if (!userId) return sendError(res, 'No autorizado', 401);

  if (!name || !sport || !type || !categories || categories.length === 0) {
    return sendError(res, 'Missing required fields', 400);
  }

  const tournament = new Tournament({
    name,
    sport,
    type,
    categories,
    participatingTeams,
    isActive: true,
    userId
  });

  await tournament.save();
  await tournament.populate('participatingTeams');

  sendSuccess(res, 'Tournament created successfully', tournament, 201);
});

export const getTournaments = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { sport, includeInactive } = req.query;
  const userId = req.user?.id;
  if (!userId) return sendError(res, 'No autorizado', 401);

  const filter: any = { userId };
  if (includeInactive !== 'true') {
    filter.isActive = true;
  }
  if (sport) filter.sport = sport;

  const tournaments = await Tournament.find(filter).populate('participatingTeams');
  sendSuccess(res, 'Tournaments retrieved', tournaments);
});

export const getTournamentById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) return sendError(res, 'No autorizado', 401);

  const tournament = await Tournament.findOne({ _id: id, userId }).populate('participatingTeams');
  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  sendSuccess(res, 'Tournament retrieved', tournament);
});

export const updateTournament = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, type, categories, participatingTeams } = req.body;
  const userId = req.user?.id;
  if (!userId) return sendError(res, 'No autorizado', 401);

  const tournament = await Tournament.findOneAndUpdate(
    { _id: id, userId },
    { name, type, categories, participatingTeams, updatedAt: new Date() },
    { new: true, runValidators: true }
  ).populate('participatingTeams');

  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  sendSuccess(res, 'Tournament updated successfully', tournament);
});

export const deactivateTournament = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) return sendError(res, 'No autorizado', 401);

  const tournament = await Tournament.findOneAndUpdate(
    { _id: id, userId },
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );

  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  sendSuccess(res, 'Tournament deactivated successfully', tournament);
});
