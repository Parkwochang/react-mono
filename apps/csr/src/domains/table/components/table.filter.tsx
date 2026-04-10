import { type Table } from '@tanstack/react-table';

import { Input } from '@/shared/ui';
import type { TableEntity } from '../api';
import { cn } from '@/libs';

export const TableFilter = ({ table }: { table: Table<TableEntity.TableRes> }) => {
  const searchValue = String(table.getColumn('expand-column')?.getFilterValue() ?? '');
  const statusValue = String(table.getColumn('status')?.getFilterValue() ?? '');
  const rowCount = table.getFilteredRowModel().rows.length;

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Grid Viewer</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">샘플 운영 보드</h3>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          이름 검색, 상태 필터, 기본 행 추가를 함께 넣어둬서 이 컴포넌트를 실제 화면에 붙였을 때의 사용감을 빠르게
          확인할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full max-w-sm">
            <Input
              value={searchValue}
              onChange={(event) => table.getColumn('expand-column')?.setFilterValue(event.target.value)}
              placeholder="담당자 이름으로 검색"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All', value: '' },
              { label: 'Live', value: 'Live' },
              { label: 'Reviewing', value: 'Reviewing' },
              { label: 'Draft', value: 'Draft' },
            ].map((item) => {
              const isActive = statusValue === item.value;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => table.getColumn('status')?.setFilterValue(item.value)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'border-cyan-400/70 bg-cyan-400/10 text-white'
                      : 'border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-slate-400">
            Visible Rows <span className="font-semibold text-white">{rowCount}</span>
          </p>
          <button
            type="button"
            onClick={() => table.options.meta?.addRow()}
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            샘플 행 추가
          </button>
        </div>
      </div>
    </>
  );
};
