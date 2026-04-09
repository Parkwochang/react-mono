import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

// ----------------------------------------------------------------------

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
});

// ----------------------------------------------------------------------

function RouteComponent() {
  return (
    <section className="grid gap-6">
      <header className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 backdrop-blur sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Posts Layout</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              목록, 상세, 등록 화면을 한 흐름으로 확인하는 섹션입니다.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              부모 라우트가 레이아웃 역할을 맡고, 그 안에서 목록과 등록 페이지를 전환합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <PostsNavLink to="/posts">목록</PostsNavLink>
            <PostsNavLink to="/posts/create">등록</PostsNavLink>
          </div>
        </div>
      </header>

      <Outlet />
    </section>
  );
}

function PostsNavLink(props: { to: '/posts' | '/posts/create'; children: React.ReactNode }) {
  return (
    <Link
      to={props.to}
      className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
      activeProps={{
        className: 'rounded-full border border-cyan-400/70 bg-cyan-400/10 px-4 py-2 text-white',
      }}
    >
      {props.children}
    </Link>
  );
}
