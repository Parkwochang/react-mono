import z from 'zod';

// ----------------------------------------------------------------------
// ! 포스트
// prettier-ignore

export const GridSchema = z.object({
  id       : z.string(),
  owner    : z.string(),
  team     : z.string(),
  status   : z.enum(['Live', 'Draft', 'Reviewing']),
  priority : z.enum(['Low', 'Medium', 'High']),
  progress : z.number(),
  tasks    : z.number(),
  updatedAt: z.string(),
  focus    : z.string(),
})

// prettier-ignore
const UpsertGridSchema = z.object({
  owner    : z.string(),
  team     : z.string(),
  status   : z.enum(['Live', 'Draft', 'Reviewing']),
  priority : z.enum(['Low', 'Medium', 'High']),
  progress : z.number(),
  tasks    : z.number(),
  focus    : z.string(),
})

export const CreateGridSchema = UpsertGridSchema.transform((data) => ({
  ...data,
  updatedAt: new Date().toISOString(),
}));

export const UpdateGridSchema = UpsertGridSchema.extend({ id: z.string(), updatedAt: z.string() }).transform(
  (data) => ({
    ...data,
    updatedAt: new Date().toISOString(),
  })
);

// ----------------------------------------------------------------------
// prettier-ignore

export namespace GridEntity {
  export type GridRes    = z.infer<typeof GridSchema>
  export type CreateGrid = z.infer<typeof CreateGridSchema>
  export type UpdateGrid = z.infer<typeof UpdateGridSchema>
}
