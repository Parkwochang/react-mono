import { AG_COlUMN } from '@/constants/columns';
import { useGetTable } from '@/domains/table/hooks';
import { useGrid } from '@/shared/hooks';
import { AgGridReact } from 'ag-grid-react';

export const AgGridSample = () => {
  const { gridRef, isReady, onGridReady } = useGrid();

  const { data } = useGetTable();

  if (isReady) {
    console.log(data);
  }

  return (
    <div className="w-full h-[300px]">
      <AgGridReact
        rowData={data}
        columnDefs={AG_COlUMN}
        ref={gridRef}
        onGridReady={onGridReady}
      />
    </div>
  );
};
