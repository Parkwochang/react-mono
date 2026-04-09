import { Outlet } from '@tanstack/react-router';

import { Form, FormField, FormMessage, Input, Label, Textarea } from '@/shared/ui';
import { usePostCreateForm } from '../hooks';

// ----------------------------------------------------------------------

export const CreatePostForm = ({ children }: { children: React.ReactNode }) => {
  const { form, createPostMutation, handleSubmit } = usePostCreateForm();

  return (
    <Form {...form}>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
        <form
          onSubmit={handleSubmit}
          className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
        >
          <div className="mt-8 grid gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Label>
                  제목
                  <Input
                    placeholder="제목을 입력해주세요."
                    {...field}
                  />
                  <FormMessage />
                </Label>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <Label>
                  요약
                  <Input
                    placeholder="제목을 입력해주세요."
                    {...field}
                  />
                  <FormMessage />
                </Label>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <Label>
                  본문
                  <Textarea
                    placeholder="제목을 입력해주세요."
                    {...field}
                  />
                  <FormMessage />
                </Label>
              )}
            />

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                지금은 샘플 앱이라 API 실패 시 목 데이터에 저장한 뒤 상세 화면으로 이동합니다.
              </p>
              <button
                type="submit"
                disabled={!form.formState.isValid || createPostMutation.isPending}
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/50"
              >
                {createPostMutation.isPending ? '등록 중...' : '글 등록하기'}
              </button>
            </div>
          </div>
        </form>

        {children}
      </section>
    </Form>
  );
};
