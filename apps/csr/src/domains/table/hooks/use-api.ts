import { useMutation, useQuery } from '@tanstack/react-query';

import { createTable, getTablesQuery, updateTable, type TableEntity } from '../api';

// ----------------------------------------------------------------------
// ! 테이블

export function useGetTable() {
  return useQuery(getTablesQuery());
}

// ----------------------------------------------------------------------
// ! 테이블 등록

export function useCreateTable() {
  return useMutation({
    mutationFn: (payload: TableEntity.CreateTable) => createTable(payload),
  });
}

// ----------------------------------------------------------------------
// ! 테이블 수정

export function useUpdateTable() {
  return useMutation({
    mutationFn: (payload: TableEntity.UpdateTable) => updateTable(payload),
  });
}
