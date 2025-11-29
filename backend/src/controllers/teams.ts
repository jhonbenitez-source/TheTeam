import { Request, Response } from 'express';
import Team from '../models/Team';
import Player from '../models/Player';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';

export const createTeam = asyncHandler(async (req: Request, res: Response) => {
  const { name, sport, address, logo } = req.body;

  if (!name || !sport || !address) {
    return sendError(res, 'Missing required fields', 400);
  }

  const existingTeam = await Team.findOne({ name });
  if (existingTeam) {
    return sendError(res, 'Team with this name already exists', 409);
  }

  const team = new Team({
    name,
    sport,
    address,
    logo,
    coaches: [],
    isActive: true
  });

  await team.save();
  sendSuccess(res, 'Team created successfully', team, 201);
});

export const getTeams = asyncHandler(async (req: Request, res: Response) => {
  const { includeInactive } = req.query;
  
  const filter: any = {};
  if (includeInactive !== 'true') {
    filter.isActive = true;
  }

  const teams = await Team.find(filter);
  sendSuccess(res, 'Teams retrieved', teams);
});

export const getTeamById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const team = await Team.findById(id);
  if (!team) {
    return sendError(res, 'Team not found', 404);
  }

  // Obtener jugadores del equipo organizados por categoría
  const players = await Player.find({ teamId: id, isActive: true }).sort({ category: 1 });

  // Agrupar por categoría
  const playersByCategory = players.reduce((acc: any, player) => {
    if (!acc[player.category]) {
      acc[player.category] = [];
    }
    acc[player.category].push(player);
    return acc;
  }, {});

  sendSuccess(res, 'Team retrieved', { team, playersByCategory });
});

export const updateTeam = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, sport, address, logo, coaches } = req.body;

  const team = await Team.findByIdAndUpdate(
    id,
    { name, sport, address, logo, coaches, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!team) {
    return sendError(res, 'Team not found', 404);
  }

  sendSuccess(res, 'Team updated successfully', team);
});

export const addCoach = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone, category } = req.body;

  if (!name || !phone || !category) {
    return sendError(res, 'Missing required fields for coach', 400);
  }

  const team = await Team.findById(id);
  if (!team) {
    return sendError(res, 'Team not found', 404);
  }

  team.coaches.push({ name, phone, category } as any);
  await team.save();

  sendSuccess(res, 'Coach added successfully', team);
});

export const deactivateTeam = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const team = await Team.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );

  if (!team) {
    return sendError(res, 'Team not found', 404);
  }

  sendSuccess(res, 'Team deactivated successfully', team);
});

export const reactivateTeam = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const team = await Team.findByIdAndUpdate(
    id,
    { isActive: true, updatedAt: new Date() },
    { new: true }
  );

  if (!team) {
    return sendError(res, 'Team not found', 404);
  }

  sendSuccess(res, 'Team reactivated successfully', team);
});
