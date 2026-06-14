import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'warning' | 'accent'
}

export function Badge({
  tone = 'neutral',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={['badge', `badge--${tone}`, className].join(' ')} {...props}>
      {children}
    </span>
  )
}
