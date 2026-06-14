import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  rightSlot?: ReactNode
}

export function Header({
  title,
  subtitle,
  showBack = false,
  rightSlot,
}: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <div className="app-header__row">
        <div className="app-header__left">
          {showBack ? (
            <button
              type="button"
              className="icon-button"
              onClick={() => navigate(-1)}
              aria-label="Volver"
            >
              <ChevronLeft size={18} />
            </button>
          ) : (
            <div className="brand-mark" aria-hidden="true">
              FH
            </div>
          )}
          <div>
            <p className="app-header__eyebrow">FixHub</p>
            <h1 className="app-header__title">{title}</h1>
            {subtitle ? <p className="app-header__subtitle">{subtitle}</p> : null}
          </div>
        </div>
        {rightSlot ? <div className="app-header__right">{rightSlot}</div> : null}
      </div>
    </header>
  )
}
