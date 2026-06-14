import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export function Rating({ value, onChange, size = 'md' }: RatingProps) {
  return (
    <div className={['rating-stars', `rating-stars--${size}`].join(' ')}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= value

        return (
          <button
            key={star}
            type="button"
            className={['rating-stars__button', isActive ? 'is-active' : ''].join(
              ' ',
            )}
            onClick={() => onChange?.(star)}
            aria-label={`Calificar con ${star} estrellas`}
          >
            <Star fill={isActive ? 'currentColor' : 'none'} size={18} />
          </button>
        )
      })}
    </div>
  )
}
