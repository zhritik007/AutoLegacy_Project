import { CheckCircle2 } from 'lucide-react'

interface TrustBarProps {
  items: string[]
}

export default function TrustBar({ items }: TrustBarProps) {
  return (
    <div
      className="bg-[rgb(var(--color-light))] border-b border-[rgb(var(--color-light)/.8)]
                 px-[5%] overflow-x-auto"
      role="list"
      aria-label="Trust signals"
    >
      <div className="max-w-site mx-auto flex items-center justify-center min-w-max">
        {items.map((item, i) => (
          <div
            key={i}
            role="listitem"
            className="flex items-center gap-2 px-6 py-4
                       border-r border-gray-200 last:border-r-0
                       text-[12px] font-semibold text-gray-500 whitespace-nowrap"
          >
            <CheckCircle2
              size={15}
              className="text-brand-primary shrink-0"
              aria-hidden="true"
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
