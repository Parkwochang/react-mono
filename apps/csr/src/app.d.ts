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

declare module '@tanstack/react-table' {
  export interface TableMeta<TData extends RowData> {
    addRow: (row?: TData) => void;
    deleteRow?: (...idx: number[]) => void;
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    insertData?: (data: TData[]) => void;
    activateEditableInput?: (rowIndex: number, colIndex: number) => void;
  }
}

export {};
