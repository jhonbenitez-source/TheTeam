import { Request, Response } from 'express';
import Team from '../models/Team';
import Player from '../models/Player';
import Tournament from '../models/Tournament';
import Match from '../models/Match';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const playerCount = await Player.countDocuments({ isActive: true });
  const teamCount = await Team.countDocuments({ isActive: true });
  const matchCount = await Match.countDocuments({ status: 'Finalizado' });
  const tournamentCount = await Tournament.countDocuments({ isActive: true });

  sendSuccess(res, 'Dashboard data retrieved', {
    players: playerCount,
    teams: teamCount,
    matches: matchCount,
    tournaments: tournamentCount
  });
});

export const getStandingsByTournament = asyncHandler(async (req: Request, res: Response) => {
  const { tournamentId } = req.params;

  const tournament = await Tournament.findById(tournamentId).populate('participatingTeams');
  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  // Para cada categoría del torneo, obtener la tabla de posiciones
  const standings = await (Tournament.collection.aggregate as any)([
    { $match: { _id: new (require('mongoose')).Types.ObjectId(tournamentId) } },
    // Se calcularía desde los matches
  ]);

  sendSuccess(res, 'Standings retrieved', { tournament, standings });
});
