type MutationMeta = {
  invalidateQueries?: QueryKey | ((data: any) => QueryKey);
  successMessage?: string;
  errorMessage?: string;
};

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

export {};
