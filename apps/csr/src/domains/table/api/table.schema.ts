import z from 'zod';

// ----------------------------------------------------------------------
// ! 포스트
// prettier-ignore

export const TableSchema = z.object({
  id       : z.string(),
  owner    : z.string(),
  team     : z.string(),
  status   : z.string(),
  priority : z.enum(['Low', 'Medium', 'High']),
  progress : z.number(),
  tasks    : z.number(),
  updatedAt: z.string(),
  focus    : z.string(),
})

// prettier-ignore
const UpsertTableSchema = z.object({
  owner    : z.string(),
  team     : z.string(),
  status   : z.string(),
  priority : z.enum(['Low', 'Medium', 'High']),
  progress : z.number(),
  tasks    : z.number(),
  focus    : z.string(),
})

export const CreateTableSchema = UpsertTableSchema.transform((data) => ({
  ...data,
  updatedAt: new Date().toISOString(),
}));

export const UpdateTableSchema = UpsertTableSchema.extend({ id: z.string(), updatedAt: z.string() }).transform(
  (data) => ({
    ...data,
    updatedAt: new Date().toISOString(),
  })
);

// ----------------------------------------------------------------------
// prettier-ignore

export namespace TableEntity {
  export type TableRes    = z.infer<typeof TableSchema>
  export type CreateTable = z.infer<typeof CreateTableSchema>
  export type UpdateTable = z.infer<typeof UpdateTableSchema>
}
