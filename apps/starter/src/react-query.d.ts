type MutationMeta = {
  invalidateQueries?: QueryKey | ((data: unknown) => QueryKey);
  successMessage?: string;
  errorMessage?: string;
};

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

export {};
