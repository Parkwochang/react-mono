import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="grid gap-6">
			<section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 via-slate-900 to-slate-900 px-6 py-8 shadow-2xl shadow-cyan-950/30 sm:px-8">
				<p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
					Home Route
				</p>
				<h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
					바로 확인할 수 있는 샘플 화면입니다.
				</h2>
				<p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
					이 페이지는 <code>src/routes/index.tsx</code> 에서 렌더링됩니다. 아래
					링크로 이동해 파일 기반 라우팅이 정상 동작하는지 바로 확인할 수
					있습니다.
				</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<Link
						to="/posts"
						className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
					>
						Posts 목록 보기
					</Link>
					<Link
						to="/ag-grid"
						className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
					>
						AG Grid 샘플 보기
					</Link>
					<Link
						to="/about"
						className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-100"
					>
						About 페이지 보기
					</Link>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				{[
					{
						title: "index.tsx",
						description: "홈 화면을 만드는 기본 페이지 파일입니다.",
					},
					{
						title: "about.tsx",
						description: "정적 페이지 라우트 예시입니다.",
					},
					{
						title: "posts/$postId.tsx",
						description: "동적 파라미터를 받는 상세 페이지 예시입니다.",
					},
					{
						title: "ag-grid/index.tsx",
						description: "AG Grid 기반 목록 + 화면 하단 편집 폼 예시입니다.",
					},
				].map((item) => (
					<article
						key={item.title}
						className="rounded-3xl border border-white/10 bg-white/5 p-5"
					>
						<p className="text-sm font-semibold text-cyan-300">{item.title}</p>
						<p className="mt-2 text-sm leading-6 text-slate-300">
							{item.description}
						</p>
					</article>
				))}
			</section>
		</div>
	);
}
