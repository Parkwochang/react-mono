import { cn } from '@/libs';

interface LabelProps extends React.ComponentProps<'label'> {}

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      data-slot="label"
      className={cn(
        // 'gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
        'grid gap-2 text-sm font-semibold text-slate-100',
        className
      )}
      {...props}
    />
  );
};
