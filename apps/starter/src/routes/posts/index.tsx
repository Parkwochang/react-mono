import { createFileRoute, Link } from '@tanstack/react-router';

import { listPosts } from '@/data/posts';

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
});

function PostsPage() {
  const posts = listPosts();

  return (
    <section className="grid gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Posts Route</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            목록에서 상세로 이동하거나 새 글 등록 화면까지 확인해보세요.
          </h2>
        </div>
        <Link
          to="/posts/create"
          className="inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          새 글 등록하기
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/7"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{post.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/posts/$postId"
                params={{ postId: post.id }}
                preload={false}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-100"
              >
                상세 보기
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
