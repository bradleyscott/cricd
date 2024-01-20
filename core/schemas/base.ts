import myzod from 'myzod';

export const uuidSchema = myzod
  .string()
  .pattern(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );

export const personRefSchema = myzod.object({
  id: uuidSchema,
  name: myzod.string().optional(),
});

export const battersRefSchema = myzod.object({
  striker: personRefSchema,
  nonStriker: personRefSchema,
});

export const teamRefSchema = myzod.object({
  id: uuidSchema,
  name: myzod.string(),
});

export const matchInfoSchema = myzod.object({
  id: uuidSchema,
  teamA: teamRefSchema,
  teamB: teamRefSchema,
  homeTeam: teamRefSchema.optional(),
  overs: myzod.number().optional(),
  innings: myzod.number().min(1).default(1),
  umpires: myzod.array(personRefSchema).optional(),
});
