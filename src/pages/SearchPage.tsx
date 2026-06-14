import { startTransition, useDeferredValue, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { providers } from '../data/providers'
import { services } from '../data/services'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Badge } from '../components/ui/Badge'
import { SearchBar } from '../components/ui/SearchBar'
import { ProviderCard } from '../components/provider/ProviderCard'

const filterLabels = ['Calificacion', 'Ubicacion', 'Precio', 'Disponibilidad']

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeQuery = searchParams.get('query') ?? 'plomeria'
  const [query, setQuery] = useState(activeQuery)
  const deferredQuery = useDeferredValue(activeQuery)

  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const matchedCategory = categories.find(
    (category) =>
      category.searchTerm.includes(normalizedQuery) ||
      category.label.toLowerCase().includes(normalizedQuery),
  )

  const filteredProviders = providers.filter((provider) => {
    const providerMatches = [
      provider.name,
      provider.description,
      provider.zone,
      provider.highlight,
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)

    const categoryMatches = matchedCategory
      ? provider.categoryIds.includes(matchedCategory.id)
      : false

    const serviceMatches = services.some(
      (service) =>
        service.providerId === provider.id &&
        [service.title, service.description]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery),
    )

    return providerMatches || categoryMatches || serviceMatches
  })

  const handleSearch = () => {
    startTransition(() => {
      setSearchParams({ query: query || 'plomeria' })
    })
  }

  return (
    <MobileShell
      header={
        <Header
          title="Resultados"
          subtitle="Encuentra proveedores validados para tu empresa"
          showBack
        />
      }
    >
      <section className="stack-section">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          placeholder="Plomeria"
          showFilterButton
        />
      </section>
      <section className="stack-section">
        <div className="filter-row">
          {filterLabels.map((label) => (
            <Badge key={label}>{label}</Badge>
          ))}
        </div>
      </section>
      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Busqueda activa</p>
            <h2>{normalizedQuery || 'plomeria'}</h2>
          </div>
          <Badge tone="accent">{filteredProviders.length} proveedores</Badge>
        </div>
      </section>
      <section className="stack-cards">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))
        ) : (
          <div className="card empty-state">
            <h3>Sin coincidencias</h3>
            <p>Prueba con otra categoria o vuelve a Plomeria.</p>
          </div>
        )}
      </section>
    </MobileShell>
  )
}
