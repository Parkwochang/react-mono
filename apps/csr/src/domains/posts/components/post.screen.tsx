import { Link, useParams } from '@tanstack/react-router';

import { usePost } from '../hooks';

// ----------------------------------------------------------------------

export function PostScreen() {
  const { postId } = useParams({ from: '/posts/$postId' });

  const { data: post } = usePost(postId);

  if (!post) {
    return (
      <section className="rounded-[2rem] border border-rose-400/30 bg-rose-400/10 p-6">
        <p className="text-sm font-semibold text-rose-200">Not Found</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">`{postId}` 에 해당하는 샘플 글이 없습니다.</h2>
        <Link
          to="/posts"
          className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-100"
        >
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Dynamic Route</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{post.title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{post.body}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/posts"
          className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:text-cyan-100"
        >
          목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
