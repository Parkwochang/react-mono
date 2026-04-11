import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UpdateTableSchema, type TableEntity } from '../api';
import { FormField, Input, Label, Textarea } from '@/shared/ui';
import { cn } from '@/libs';

// ----------------------------------------------------------------------

type Props = {
  row: TableEntity.TableRes;
  onClose: () => void;
  onSave: (row: TableEntity.TableRes) => void;
};

const STATUS_OPTIONS = ['Live', 'Reviewing', 'Draft'] as const;
const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'] as const;

export const TableForm = ({ row, onSave, onClose }: Props) => {
  const form = useForm<TableEntity.UpdateTable>({
    values: row,
    resolver: zodResolver(UpdateTableSchema),
    mode: 'onChange',
  });

  const handleSaveRow = form.handleSubmit((data) => {
    console.log('data', data);
    onSave(data);
  });

  const onReset = () => {
    form.reset(row);
  };

  const owner = useWatch({
    control: form.control,
    name: 'owner',
  });

  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.28)] backdrop-blur sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Row Editor</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{owner}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            같은 행을 다시 누르면 이 패널이 닫히고 그리드는 다시 전체 폭으로 돌아갑니다.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/50 hover:text-white"
        >
          닫기
        </button>
      </div>

      <div className="mt-4 rounded-3xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-400">Row ID</span>
          <span className="font-medium text-white">{row.id}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-slate-400">Last Updated</span>
          <span className="font-medium text-white">{row.updatedAt}</span>
        </div>
      </div>

      <form
        className="mt-6 grid gap-5"
        onSubmit={handleSaveRow}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            name="owner"
            control={form.control}
            render={({ field }) => (
              <Label>
                Owner
                <Input
                  {...field}
                  placeholder="담당자 이름"
                />
              </Label>
            )}
          />

          <FormField
            name="team"
            control={form.control}
            render={({ field }) => (
              <Label>
                Team
                <Input
                  {...field}
                  placeholder="소속 팀"
                />
              </Label>
            )}
          />
        </div>

        <FormField
          name="focus"
          control={form.control}
          render={({ field }) => (
            <Label>
              Focus
              <Textarea
                {...field}
                rows={4}
                placeholder="현재 작업 포커스를 입력해주세요."
              />
            </Label>
          )}
        />

        <FormField
          name="focus"
          control={form.control}
          render={({ field }) => (
            <Label>
              Focus
              <Textarea
                {...field}
                rows={4}
                placeholder="현재 작업 포커스를 입력해주세요."
              />
            </Label>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            name="progress"
            control={form.control}
            render={({ field }) => (
              <Label>
                Progress
                <Input
                  {...field}
                  type="number"
                  min={0}
                  max={100}
                />
              </Label>
            )}
          />

          <FormField
            name="tasks"
            control={form.control}
            render={({ field }) => (
              <Label>
                Tasks
                <Input
                  type="number"
                  min={0}
                  {...field}
                />
              </Label>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <span className="text-sm font-semibold text-slate-100">Status</span>
            <div className="flex flex-wrap gap-2">
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <>
                    {STATUS_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => field.onChange(option)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-semibold transition',
                          field.value === option
                            ? 'border-cyan-400/70 bg-cyan-400/10 text-white'
                            : 'border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-semibold text-slate-100">Priority</span>
            <div className="flex flex-wrap gap-2">
              <FormField
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <>
                    {PRIORITY_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => field.onChange(option)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-semibold transition',
                          field.value === option
                            ? 'border-cyan-400/70 bg-cyan-400/10 text-white'
                            : 'border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <p className="text-sm leading-6 text-slate-400">저장하면 현재 화면의 샘플 데이터가 바로 갱신됩니다.</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              초기화
            </button>
            <button
              type="submit"
              className="disabled:cursor-not-allowed disabled:bg-cyan-400/50 disabled:text-slate-300 rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              수정 반영
            </button>
          </div>
        </div>
      </form>
    </aside>
  );
};
