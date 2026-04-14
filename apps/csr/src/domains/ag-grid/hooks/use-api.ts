import { useMutation, useQuery } from '@tanstack/react-query';

import { createGrid, getGridsQuery, type GridEntity } from '../api';

// ----------------------------------------------------------------------
// ! 포스트 GET

export function useGrid() {
  return useQuery({
    ...getGridsQuery(),
  });
}

// ----------------------------------------------------------------------
// ! 포스트 POST

export function useCreateGrid() {
  return useMutation({
    mutationFn: (payload: GridEntity.CreateGrid) => createGrid(payload),
  });
}
