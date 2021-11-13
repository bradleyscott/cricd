import myzod from 'myzod';

export const uuidSchema = myzod
  .string()
  .pattern(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );

export const playerSchema = myzod.object({
  id: uuidSchema,
  name: myzod.string().optional(),
});

export const battersSchema = myzod.object({
  striker: playerSchema,
  nonStriker: playerSchema,
});

export const teamSchema = myzod.object({
  id: uuidSchema,
  name: myzod.string(),
});
