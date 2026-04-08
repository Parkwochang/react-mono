type LoadingIndicatorScreenProps = {
  title?: string;
  description?: string;
};

export function LoadingIndicatorScreen({
  title = 'Loading',
  description = '잠시만 기다려주세요.',
}: LoadingIndicatorScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-6 backdrop-blur-[2px] min-h-screen">
      <output
        aria-live="polite"
        aria-busy="true"
        className="flex min-w-[220px] max-w-sm flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/8 px-7 py-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-cyan-300/15" />
          <span className="absolute inset-1 rounded-full border border-white/6" />
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/12 border-t-cyan-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.75)]" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-[0.22em] uppercase text-cyan-200">{title}</p>
          <p className="text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </output>
    </div>
  );
}
