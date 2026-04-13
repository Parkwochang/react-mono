import { AgGridReact } from 'ag-grid-react';

import { useGridCUD } from '../hooks';
import { AgGridFilter } from './ag-grid.filter';

// ----------------------------------------------------------------------

export const AgGridSample = () => {
  const { tableData, gridOptions, onAddRow, onUpdateRow, onDeleteRow, onOwnerChange, onStatusChange } = useGridCUD();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Grid Viewer</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">샘플 운영 보드</h3>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          이름 검색, 상태 필터, 기본 행 추가와 함께 행 클릭 시 화면 아래 수정 폼이 열리도록 구성해서 실제 사용감을
          빠르게 확인할 수 있습니다.
        </p>
      </div>

      <AgGridFilter
        onOwnerChange={onOwnerChange}
        onStatusChange={onStatusChange}
        onAddRow={onAddRow}
      />
      <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-[0_20px_60px_rgba(2,6,23,0.38)] backdrop-blur">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div
          className="ag-theme-quartz-dark ag-grid-workbench w-full"
          style={{ height: `${500}px` }}
        >
          <AgGridReact {...gridOptions} />
        </div>
      </div>
    </section>
  );
};

{
  /* <AgGridReact
rowData={filteredRows}
columnDefs={COLUMN_DEFS}
defaultColDef={DEFAULT_COL_DEF}
getRowId={(params: GetRowIdParams<TableEntity.TableRes>) => params.data.id}
rowHeight={ROW_HEIGHT}
headerHeight={HEADER_HEIGHT}
suppressCellFocus
suppressRowHoverHighlight
animateRows
rowClassRules={{
  'ag-grid-row-active': (params) => params.data?.id === selectedRowId,
}}
onRowClicked={handleRowClick}
/> */
}
