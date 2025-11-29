import { Request, Response } from 'express';
import Player from '../models/Player';
import Tournament from '../models/Tournament';
import Team from '../models/Team';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';

export const generateCard = asyncHandler(async (req: Request, res: Response) => {
  const { playerId, tournamentId, teamId } = req.query;

  let players: any[] = [];

  if (playerId) {
    // Generar carnet de un jugador específico
    const player = await Player.findById(playerId).populate('teamId');
    if (!player) {
      return sendError(res, 'Player not found', 404);
    }
    players = [player];
  } else if (tournamentId) {
    // Generar carnets de todos los jugadores en un torneo
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return sendError(res, 'Tournament not found', 404);
    }

    players = await Player.find({
      teamId: { $in: tournament.participatingTeams },
      isActive: true
    }).populate('teamId').sort({ category: 1 });
  } else if (teamId) {
    // Generar carnets de un equipo específico
    const team = await Team.findById(teamId);
    if (!team) {
      return sendError(res, 'Team not found', 404);
    }

    players = await Player.find({
      teamId,
      isActive: true
    }).populate('teamId').sort({ category: 1 });
  } else {
    return sendError(res, 'Please provide playerId, tournamentId, or teamId', 400);
  }

  let tournamentName: string | undefined;
  if (tournamentId) {
    const tournament = await Tournament.findById(tournamentId);
    tournamentName = tournament?.name;
  }

  const cardData = players.map(player => ({
    playerId: player._id,
    playerName: player.name,
    playerDocument: player.documentId,
    playerPhoto: player.photo,
    category: player.category,
    age: player.age,
    teamName: player.teamId?.name || 'Sin equipo',
    teamLogo: player.teamId?.logo || '',
    tournamentName
  }));

  sendSuccess(res, 'Card data generated', { cards: cardData, count: cardData.length });
});

export const searchPlayer = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return sendError(res, 'Player name is required', 400);
  }

  const players = await Player.find({
    name: { $regex: name, $options: 'i' },
    isActive: true
  }).populate('teamId');

  sendSuccess(res, 'Players found', players);
});
