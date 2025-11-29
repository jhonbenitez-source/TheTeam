import { Request, Response } from 'express';
import Player from '../models/Player';
import { sendSuccess, sendError, asyncHandler } from '../utils/helpers';
import { calculateAge, calculateCategory } from '../utils/calculations';

export const createPlayer = asyncHandler(async (req: Request, res: Response) => {
  const { name, documentId, dateOfBirth, eps, phone, address, photo, teamId } = req.body;

  if (!name || !documentId || !dateOfBirth || !eps || !phone || !address) {
    return sendError(res, 'Missing required fields', 400);
  }

  // Validar que documentId sea único
  const existingPlayer = await Player.findOne({ documentId });
  if (existingPlayer) {
    return sendError(res, `Document ID already exists. Player: ${existingPlayer.name}`, 409);
  }

  const dob = new Date(dateOfBirth);
  const age = calculateAge(dob);
  const category = calculateCategory(dob);

  const player = new Player({
    name,
    documentId,
    dateOfBirth: dob,
    age,
    category,
    eps,
    phone,
    address,
    photo,
    teamId: teamId || null,
    isActive: true
  });

  await player.save();
  sendSuccess(res, 'Player created successfully', player, 201);
});

export const getPlayers = asyncHandler(async (req: Request, res: Response) => {
  const { teamId, category, includeInactive } = req.query;

  const filter: any = {};
  if (includeInactive !== 'true') {
    filter.isActive = true;
  }
  if (teamId) filter.teamId = teamId;
  if (category) filter.category = category;

  const players = await Player.find(filter).populate('teamId');
  sendSuccess(res, 'Players retrieved', players);
});

export const getPlayerById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const player = await Player.findById(id).populate('teamId');
  if (!player) {
    return sendError(res, 'Player not found', 404);
  }

  sendSuccess(res, 'Player retrieved', player);
});

export const updatePlayer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, eps, phone, address, photo, teamId, dateOfBirth } = req.body;

  const player = await Player.findById(id);
  if (!player) {
    return sendError(res, 'Player not found', 404);
  }

  // Si se actualiza la fecha de nacimiento, recalcular edad y categoría
  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    player.dateOfBirth = dob;
    player.age = calculateAge(dob);
    player.category = calculateCategory(dob);
  }

  if (name) player.name = name;
  if (eps) player.eps = eps;
  if (phone) player.phone = phone;
  if (address) player.address = address;
  if (photo) player.photo = photo;
  if (teamId !== undefined) player.teamId = teamId || null;
  player.updatedAt = new Date();

  await player.save();
  sendSuccess(res, 'Player updated successfully', player);
});

export const transferPlayer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { newTeamId } = req.body;

  const player = await Player.findByIdAndUpdate(
    id,
    { teamId: newTeamId, updatedAt: new Date() },
    { new: true }
  ).populate('teamId');

  if (!player) {
    return sendError(res, 'Player not found', 404);
  }

  sendSuccess(res, 'Player transferred successfully', player);
});

export const deactivatePlayer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const player = await Player.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );

  if (!player) {
    return sendError(res, 'Player not found', 404);
  }

  sendSuccess(res, 'Player deactivated successfully', player);
});

export const reactivatePlayer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const player = await Player.findByIdAndUpdate(
    id,
    { isActive: true, updatedAt: new Date() },
    { new: true }
  );

  if (!player) {
    return sendError(res, 'Player not found', 404);
  }

  sendSuccess(res, 'Player reactivated successfully', player);
});
