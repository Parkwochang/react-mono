import { cn } from '@/libs';

export const Input = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70',
        className
      )}
      {...props}
    />
  );
};
