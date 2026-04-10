import { Activity } from 'react';

import { TableViewer } from '@/shared/ui';
import { TABLE_COLUMNS } from '@/constants/columns';
import { TABLE_DEFAULT_ROW } from '@/data/table';
import { TableFilter } from './table.filter';
import { useGetTable } from '../hooks';

// ----------------------------------------------------------------------

export const TableScreen = () => {
  const tableData = useGetTable();

  const liveCount = tableData.data?.filter((item) => item.status === 'live').length ?? 0;
  const reviewingCount = tableData.data?.filter((item) => item.status === 'reviewing').length ?? 0;
  const averageProgress = tableData.data?.length
    ? tableData.data?.reduce((acc, item) => acc + item.progress, 0) / tableData.data?.length
    : 0;

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 via-slate-900 to-slate-900 px-6 py-8 shadow-2xl shadow-cyan-950/30 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Table Demo</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          지금 만든 테이블 스타일을 실제 화면 안에서 바로 확인할 수 있는 샘플 페이지입니다.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          상단 필터와 추가 버튼은 <code>TableViewer</code> 의 <code>renderItem</code> 슬롯 예시입니다. 아래 리스트에서
          pinned column, 상태 배지, hover 톤, 카드형 프레임을 한 번에 볼 수 있습니다.
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

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6">
        <Activity mode={tableData.data ? 'visible' : 'hidden'}>
          <TableViewer
            columns={TABLE_COLUMNS}
            data={tableData.data ?? []}
            defaultRow={TABLE_DEFAULT_ROW}
            renderItem={(table) => <TableFilter table={table} />}
          />
        </Activity>
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
