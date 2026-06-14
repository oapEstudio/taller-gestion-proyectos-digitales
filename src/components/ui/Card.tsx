import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'accent' | 'soft'
}

export function Card({
  className = '',
  tone = 'default',
  children,
  ...props
}: CardProps) {
  return (
    <div className={['card', `card--${tone}`, className].join(' ')} {...props}>
      {children}
    </div>
  )
}
