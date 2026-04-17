import { useFormContext, useWatch } from "react-hook-form";
import type { PostSchema } from "../api";

export const CreatePostSummary = () => {
  const { control } = useFormContext<PostSchema.Create>();

  const [title, summary, body, tags] = useWatch({
    control,
    name: ["title", "summary", "body", "tags"],
  });

  return (
    <aside className="grid gap-4">
      <div className="rounded-4xl border border-cyan-400/20 bg-linear-to-br from-cyan-400/14 via-slate-900 to-slate-900 p-6 shadow-2xl shadow-cyan-950/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Live Preview
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          {title.trim() || "제목을 입력하면 여기에 미리보기가 표시됩니다."}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {summary.trim() ||
            "요약이 비어 있으면 목록 카드에서는 짧은 설명이 빠진 상태로 보이게 됩니다."}
        </p>
        <p className="mt-5 text-sm leading-7 text-slate-300">
          {body.trim() ||
            "본문을 입력하면 상세 화면 분위기를 여기서 먼저 확인할 수 있어요."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              태그를 입력해보세요
            </span>
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Flow
        </p>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
          <li>1. 화면 입력값을 Zod 스키마로 검증합니다.</li>
          <li>
            2. 생성 mutation이 API를 시도하고, 실패하면 목 데이터에 저장합니다.
          </li>
          <li>3. 성공 후 상세 라우트로 이동해 결과를 바로 확인합니다.</li>
        </ul>
      </div>
    </aside>
  );
};
