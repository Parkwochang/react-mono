import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">About Route</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        지금 샘플은 `src/routes` 기준으로 파일 라우팅됩니다.
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm font-semibold text-white">현재 기준</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            <code>src/routes/index.tsx</code> 는 <code>/</code>,<code>src/routes/about.tsx</code> 는 <code>/about</code>{' '}
            으로 매핑됩니다.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm font-semibold text-white">동적 라우트</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            <code>src/routes/posts/$postId.tsx</code> 는<code>/posts/:postId</code> 같은 형태를 담당합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
