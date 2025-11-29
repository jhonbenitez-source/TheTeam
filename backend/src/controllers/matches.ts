import { Request, Response } from 'express';
import Match from '../models/Match';
import Standing from '../models/Standing';
import Tournament from '../models/Tournament';
import Team from '../models/Team';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';
import { calculatePoints } from '../utils/calculations';

export const createMatch = asyncHandler(async (req: Request, res: Response) => {
  const { tournamentId, category, homeTeamId, awayTeamId, scheduledDate } = req.body;

  if (!tournamentId || !category || !homeTeamId || !awayTeamId || !scheduledDate) {
    return sendError(res, 'Missing required fields', 400);
  }

  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    return sendError(res, 'Tournament not found', 404);
  }

  const match = new Match({
    tournamentId,
    category,
    homeTeamId,
    awayTeamId,
    scheduledDate: new Date(scheduledDate),
    homeScore: 0,
    awayScore: 0,
    status: 'Programado'
  });

  await match.save();
  await match.populate(['homeTeamId', 'awayTeamId', 'tournamentId']);

  sendSuccess(res, 'Match created successfully', match, 201);
});

export const getMatches = asyncHandler(async (req: Request, res: Response) => {
  const { tournamentId, category, status } = req.query;

  const filter: any = {};
  if (tournamentId) filter.tournamentId = tournamentId;
  if (category) filter.category = category;
  if (status) filter.status = status;

  const matches = await Match.find(filter)
    .populate(['homeTeamId', 'awayTeamId', 'tournamentId'])
    .sort({ scheduledDate: -1 });

  sendSuccess(res, 'Matches retrieved', matches);
});

export const getMatchById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const match = await Match.findById(id).populate(['homeTeamId', 'awayTeamId', 'tournamentId']);
  if (!match) {
    return sendError(res, 'Match not found', 404);
  }

  sendSuccess(res, 'Match retrieved', match);
});

export const updateMatchScore = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeScore, awayScore } = req.body;

  if (homeScore === undefined || awayScore === undefined) {
    return sendError(res, 'Home score and away score are required', 400);
  }

  const match = await Match.findById(id);
  if (!match) {
    return sendError(res, 'Match not found', 404);
  }

  match.homeScore = homeScore;
  match.awayScore = awayScore;
  match.updatedAt = new Date();

  await match.save();
  await match.populate(['homeTeamId', 'awayTeamId', 'tournamentId']);

  sendSuccess(res, 'Match score updated', match);
});

export const finalizeMatch = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const match = await Match.findById(id);
  if (!match) {
    return sendError(res, 'Match not found', 404);
  }

  if (match.status === 'Finalizado') {
    return sendError(res, 'Match is already finalized', 400);
  }

  // Calcular puntos
  const { homePoints, awayPoints } = calculatePoints(match.homeScore, match.awayScore);

  // Actualizar o crear standings para el equipo local
  let homeStanding = await Standing.findOne({
    tournamentId: match.tournamentId,
    category: match.category,
    teamId: match.homeTeamId
  });

  if (!homeStanding) {
    homeStanding = new Standing({
      tournamentId: match.tournamentId,
      category: match.category,
      teamId: match.homeTeamId
    });
  }

  homeStanding.played += 1;
  homeStanding.pointsFor += match.homeScore;
  homeStanding.pointsAgainst += match.awayScore;
  homeStanding.points += homePoints;

  if (match.homeScore > match.awayScore) {
    homeStanding.won += 1;
  } else if (match.homeScore === match.awayScore) {
    homeStanding.drawn += 1;
  } else {
    homeStanding.lost += 1;
  }

  await homeStanding.save();

  // Actualizar o crear standings para el equipo visitante
  let awayStanding = await Standing.findOne({
    tournamentId: match.tournamentId,
    category: match.category,
    teamId: match.awayTeamId
  });

  if (!awayStanding) {
    awayStanding = new Standing({
      tournamentId: match.tournamentId,
      category: match.category,
      teamId: match.awayTeamId
    });
  }

  awayStanding.played += 1;
  awayStanding.pointsFor += match.awayScore;
  awayStanding.pointsAgainst += match.homeScore;
  awayStanding.points += awayPoints;

  if (match.awayScore > match.homeScore) {
    awayStanding.won += 1;
  } else if (match.awayScore === match.homeScore) {
    awayStanding.drawn += 1;
  } else {
    awayStanding.lost += 1;
  }

  await awayStanding.save();

  // Marcar match como finalizado
  match.status = 'Finalizado';
  match.updatedAt = new Date();
  await match.save();

  await match.populate(['homeTeamId', 'awayTeamId', 'tournamentId']);

  sendSuccess(res, 'Match finalized and standings updated', match);
});

export const getStandingsByTournamentCategory = asyncHandler(async (req: Request, res: Response) => {
  const { tournamentId, category } = req.params;

  const standings = await Standing.find({
    tournamentId,
    category
  }).populate('teamId').sort({ points: -1, won: -1, pointsFor: -1 });

  if (standings.length === 0) {
    return sendSuccess(res, 'No standings found', []);
  }

  sendSuccess(res, 'Standings retrieved', standings);
});
