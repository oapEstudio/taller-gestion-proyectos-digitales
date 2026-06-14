import { Search, SlidersHorizontal } from 'lucide-react'
import type { FormEvent } from 'react'

interface SearchBarProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
  onSubmit: () => void
  showFilterButton?: boolean
}

export function SearchBar({
  value,
  placeholder,
  onChange,
  onSubmit,
  showFilterButton = false,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={18} className="search-bar__icon" />
      <input
        aria-label="Buscar servicios"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {showFilterButton ? (
        <button type="button" className="search-bar__filter" aria-label="Filtros">
          <SlidersHorizontal size={18} />
        </button>
      ) : null}
    </form>
  )
}
