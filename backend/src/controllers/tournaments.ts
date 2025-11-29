import { Request, Response } from 'express';
import Tournament from '../models/Tournament';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';

export const createTournament = asyncHandler(async (req: Request, res: Response) => {
  const { name, sport, type, categories, participatingTeams } = req.body;

  if (!name || !sport || !type || !categories || categories.length === 0) {
    return sendError(res, 'Missing required fields', 400);
  }

  const tournament = new Tournament({
    name,
    sport,
    type,
    categories,
    participatingTeams,
    isActive: true
  });

  await tournament.save();
  await tournament.populate('participatingTeams');

  sendSuccess(res, 'Tournament created successfully', tournament, 201);
});

export const getTournaments = asyncHandler(async (req: Request, res: Response) => {
  const { sport, includeInactive } = req.query;

  const filter: any = {};
  if (includeInactive !== 'true') {
    filter.isActive = true;
  }
  if (sport) filter.sport = sport;

  const tournaments = await Tournament.find(filter).populate('participatingTeams');
  sendSuccess(res, 'Tournaments retrieved', tournaments);
});

export const getTournamentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tournament = await Tournament.findById(id).populate('participatingTeams');
  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  sendSuccess(res, 'Tournament retrieved', tournament);
});

export const updateTournament = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, categories, participatingTeams } = req.body;

  const tournament = await Tournament.findByIdAndUpdate(
    id,
    { name, type, categories, participatingTeams, updatedAt: new Date() },
    { new: true, runValidators: true }
  ).populate('participatingTeams');

  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  sendSuccess(res, 'Tournament updated successfully', tournament);
});

export const deactivateTournament = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tournament = await Tournament.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );

  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  sendSuccess(res, 'Tournament deactivated successfully', tournament);
});
