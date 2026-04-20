'use client'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label:        string
  id:           string
  name:         string
  type?:        string
  placeholder?: string
  required?:    boolean
  dark?:        boolean
  error?:       string
  rows?:        number
  options?:     { value: string; label: string }[]
  className?:   string
}

const baseInput = (dark?: boolean) => cn(
  'w-full px-4 py-3 text-sm font-body',
  'border outline-none transition-[border-color,box-shadow] duration-200',
  'rounded-none appearance-none',
  dark
    ? 'bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus:border-brand-primary'
    : 'bg-white border-gray-300 text-brand-dark placeholder:text-gray-400 focus:border-brand-primary focus:shadow-[0_0_0_3px_rgb(var(--color-primary)/0.09)]',
)

export default function FormField({
  label, id, name, type = 'text', placeholder, required,
  dark, error, rows, options, className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className={cn(
          'text-[10px] font-bold tracking-[1.5px] uppercase',
          dark ? 'text-white/40' : 'text-gray-500',
        )}
      >
        {label}{required && ' *'}
      </label>

      {options ? (
        <select
          id={id} name={name}
          className={cn(
            baseInput(dark),
            'bg-[image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath fill=\'%23888\' d=\'M5 6L0 0h10z\'/%3E%3C/svg%3E")]',
            'bg-no-repeat bg-[right_14px_center] pr-9',
            error && 'border-red-500',
          )}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          id={id} name={name} rows={rows} placeholder={placeholder}
          className={cn(baseInput(dark), 'resize-y min-h-[110px]', error && 'border-red-500')}
        />
      ) : (
        <input
          id={id} name={name} type={type} placeholder={placeholder}
          className={cn(baseInput(dark), error && 'border-red-500')}
        />
      )}

      {error && (
        <span className="text-[11px] text-red-500" role="alert">{error}</span>
      )}
    </div>
  )
}
