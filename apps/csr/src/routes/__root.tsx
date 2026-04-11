import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';

import type { AppRouterContext } from '../libs/query-client';

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
  // 공통 에러 -> api 에러 발생시 get 400, post 401 등 에러 발생시 이 컴포넌트가 렌더링됨
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  // 공통 404
  notFoundComponent: AppNotFound,
});

function RootLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 text-slate-100 antialiased sm:px-6 lg:px-8">
      <header className="mb-8 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-300">TanStack Router Sample</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white">파일 라우팅 확인용 CSR 샘플</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/table">Table</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-10 border-t border-white/10 pt-4 text-sm text-slate-400">
        `src/routes` 아래 파일을 추가하면 새 페이지가 됩니다.
      </footer>
    </div>
  );
}

function AppNotFound() {
  return (
    <section className="rounded-[2rem] border border-rose-400/30 bg-rose-400/10 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">404 Route</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">요청한 페이지를 찾을 수 없습니다.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        현재 URL과 일치하는 파일 라우트가 없습니다. 존재하는 경로로 다시 이동해보세요.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          홈으로 이동
        </Link>
        <Link
          to="/posts"
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-100"
        >
          Posts 보기
        </Link>
      </div>
    </section>
  );
}

function NavLink(props: { to: '/' | '/about' | '/posts' | '/table'; children: React.ReactNode }) {
  return (
    <Link
      to={props.to}
      className="rounded-full border border-white/10 px-4 py-2 text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
      activeProps={{
        className: 'rounded-full border border-cyan-400/70 bg-cyan-400/10 px-4 py-2 text-white',
      }}
    >
      {props.children}
    </Link>
  );
}
