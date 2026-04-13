import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import {
  AllCommunityModule,
  type ColDef,
  type GetRowIdParams,
  ModuleRegistry,
  type RowClickedEvent,
} from 'ag-grid-community';
import type { CustomCellRendererProps } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';

import { TABLE_DEFAULT_ROW, TABLE_SAMPLE_ROWS } from '@/data/table';
import type { TableEntity } from '@/domains/table/api';
import { cn } from '@/libs';
import { Input, Label, Textarea } from '@/shared/ui';
import { AG_GRID_COLUMN } from '@/constants/columns';
import { AgGridSample } from './ag-grid.grid';

// ----------------------------------------------------------------------

let isAgGridRegistered = false;

if (!isAgGridRegistered) {
  ModuleRegistry.registerModules([AllCommunityModule]);
  isAgGridRegistered = true;
}

const STATUS_OPTIONS = ['Live', 'Reviewing', 'Draft'] as const;
const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'] as const;

type StatusFilter = '' | (typeof STATUS_OPTIONS)[number];

const HEADER_HEIGHT = 48;
const ROW_HEIGHT = 72;

const DEFAULT_COL_DEF: ColDef<TableEntity.TableRes> = {
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  flex: 1,
  minWidth: 120,
  cellStyle: {
    justifyContent: 'center',
  },
};

export const AgGridScreen = () => {
  const editorRef = useRef<HTMLElement | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [rows, setRows] = useState<TableEntity.TableRes[]>([...TABLE_SAMPLE_ROWS]);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TableEntity.TableRes | null>(null);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredRows = rows.filter((row) => {
    const matchesStatus = statusFilter ? row.status === statusFilter : true;
    const matchesSearch = normalizedSearch
      ? [row.owner, row.team, row.focus, row.status].join(' ').toLowerCase().includes(normalizedSearch)
      : true;

    return matchesStatus && matchesSearch;
  });

  const liveCount = rows.filter((item) => item.status === 'Live').length;
  const reviewingCount = rows.filter((item) => item.status === 'Reviewing').length;
  const averageProgress = rows.length
    ? Math.round(rows.reduce((acc, item) => acc + item.progress, 0) / rows.length)
    : 0;

  const selectedRow = selectedRowId ? (rows.find((row) => row.id === selectedRowId) ?? null) : null;
  const hasPendingChanges = Boolean(selectedRow && draft && JSON.stringify(selectedRow) !== JSON.stringify(draft));

  const gridHeight = filteredRows.length ? HEADER_HEIGHT + filteredRows.length * ROW_HEIGHT + 2 : 220;

  const focusEditor = () => {
    requestAnimationFrame(() => {
      editorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const selectRow = (row: TableEntity.TableRes) => {
    setSelectedRowId(row.id);
    setDraft({ ...row });
    focusEditor();
  };

  const handleRowClick = (event: RowClickedEvent<TableEntity.TableRes>) => {
    if (!event.data) {
      return;
    }

    selectRow(event.data);
  };

  const handleAddRow = () => {
    const nextNumber = rows.length + 1;
    const nextRow: TableEntity.TableRes = {
      ...TABLE_DEFAULT_ROW,
      id: `sam-${String(nextNumber).padStart(3, '0')}`,
      owner: `New Owner ${nextNumber}`,
      team: 'Studio',
      status: 'Draft',
      priority: 'Medium',
      progress: 18,
      tasks: 3,
      updatedAt: new Date().toISOString(),
      focus: 'New sample row',
    };

    setRows((prev) => [...prev, nextRow]);
    setSelectedRowId(nextRow.id);
    setDraft(nextRow);
    focusEditor();
  };

  const handleDraftChange = <TKey extends keyof TableEntity.TableRes>(key: TKey, value: TableEntity.TableRes[TKey]) => {
    setDraft((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleCancel = () => {
    if (!selectedRow) {
      return;
    }

    setDraft({ ...selectedRow });
  };

  const handleCloseEditor = () => {
    setSelectedRowId(null);
    setDraft(null);
  };

  const handleSave = () => {
    if (!draft) {
      return;
    }

    const nextRow: TableEntity.TableRes = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };

    setRows((prev) => prev.map((row) => (row.id === nextRow.id ? nextRow : row)));
    setDraft(nextRow);
  };

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 via-slate-900 to-slate-900 px-6 py-8 shadow-2xl shadow-cyan-950/30 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">AG Grid Demo</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          로우를 누르면 같은 페이지 아래에서 바로 수정하는 AG Grid 샘플 화면입니다.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          이전 테이블과 같은 운영 보드 톤을 유지하면서, 이번에는 우측 패널이 아니라 화면 하단 편집 섹션으로 이동하도록
          구성했습니다.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <MetricCard
            label="Live Pipelines"
            value={`${liveCount} items`}
            description="배포 중인 작업 흐름"
          />
          <MetricCard
            label="Review Queue"
            value={`${reviewingCount} items`}
            description="검토 대기 상태"
          />
          <MetricCard
            label="Avg Progress"
            value={`${averageProgress}%`}
            description="현재 진행률 평균"
          />
        </div>
      </section>

      <AgGridSample />

      <section
        ref={editorRef}
        className="rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.28)] backdrop-blur sm:p-6"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Inline Screen Editor</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {draft ? draft.owner : '편집할 로우를 선택해주세요'}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {draft
                ? `${draft.team} / ${draft.focus} / ${draft.updatedAt}`
                : '그리드에서 로우를 클릭하면 아래 영역이 편집 모드로 채워집니다.'}
            </p>
          </div>

          {draft && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                변경 취소
              </button>
              <button
                type="button"
                onClick={handleCloseEditor}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!hasPendingChanges}
                className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/50 disabled:text-slate-500"
              >
                수정 저장
              </button>
            </div>
          )}
        </div>

        {/* {draft ? (
          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
            <form
              className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5"
              onSubmit={(event) => {
                event.preventDefault();
                handleSave();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Label>
                  Owner
                  <Input
                    value={draft.owner}
                    onChange={(event) => handleDraftChange('owner', event.target.value)}
                    placeholder="담당자 이름"
                  />
                </Label>

                <Label>
                  Team
                  <Input
                    value={draft.team}
                    onChange={(event) => handleDraftChange('team', event.target.value)}
                    placeholder="소속 팀"
                  />
                </Label>
              </div>

              <Label>
                Focus
                <Textarea
                  rows={4}
                  value={draft.focus}
                  onChange={(event) => handleDraftChange('focus', event.target.value)}
                  placeholder="현재 작업 포커스를 입력해주세요."
                />
              </Label>

              <div className="grid gap-5 sm:grid-cols-2">
                <Label>
                  Tasks
                  <Input
                    type="number"
                    min={0}
                    value={draft.tasks}
                    onChange={(event) => handleDraftChange('tasks', Number(event.target.value || 0))}
                  />
                </Label>

                <Label>
                  Progress
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.progress}
                    onChange={(event) => handleDraftChange('progress', clampProgress(Number(event.target.value || 0)))}
                  />
                </Label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-100">Status</span>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((option) => (
                      <OptionButton
                        key={option}
                        active={draft.status === option}
                        onClick={() => handleDraftChange('status', option)}
                      >
                        {option}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-100">Priority</span>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITY_OPTIONS.map((option) => (
                      <OptionButton
                        key={option}
                        active={draft.priority === option}
                        onClick={() => handleDraftChange('priority', option)}
                      >
                        {option}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>

              <Label>
                Progress Slider
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={draft.progress}
                  onChange={(event) => handleDraftChange('progress', Number(event.target.value))}
                  className="accent-cyan-400"
                />
              </Label>
            </form>

            <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Preview</p>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-400/10 text-xl font-semibold text-cyan-200">
                    {draft.owner.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="truncate text-xl font-semibold text-white">{draft.owner}</h4>
                      <StatusBadge value={draft.status} />
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-400">
                      {draft.team} · {draft.focus}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-300">
                  <InfoRow
                    label="Priority"
                    value={draft.priority}
                  />
                  <InfoRow
                    label="Tasks"
                    value={`${draft.tasks} items`}
                  />
                  <InfoRow
                    label="Progress"
                    value={`${draft.progress}%`}
                  />
                  <InfoRow
                    label="Updated"
                    value={draft.updatedAt}
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                저장하면 그리드와 이 미리보기가 동시에 갱신됩니다. 샘플이라 서버 연동 없이 화면 상태만 바로 바뀝니다.
              </p>
            </aside>
          </div>
        ) : (
          <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.03] px-5 py-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">No Row Selected</p>
            <p className="mt-3 text-lg font-semibold text-white">그리드에서 수정할 로우를 먼저 선택해주세요.</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              이번 샘플은 폼이 오른쪽에 붙지 않고, 같은 화면 아래에서 넓게 편집하는 흐름을 보여주기 위한 예시입니다.
            </p>
          </div>
        )} */}
      </section>
    </div>
  );
};

function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}

function OptionButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-semibold transition',
        active
          ? 'border-cyan-400/70 bg-cyan-400/10 text-white'
          : 'border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white'
      )}
    >
      {children}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
