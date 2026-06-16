import {
  Bell,
  Building2,
  Droplets,
  Flame,
  Hammer,
  ShieldCheck,
  Snowflake,
  Star,
  UserCircle2,
  Zap,
} from 'lucide-react'
import { startTransition, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { favoriteProviderIds, popularProviderIds, providers } from '../data/providers'
import { categories } from '../data/categories'
import { services } from '../data/services'
import { user } from '../data/user'
import { ActiveServiceCard } from '../components/order/ActiveServiceCard'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { SearchBar } from '../components/ui/SearchBar'
import { StatusBadge } from '../components/ui/StatusBadge'

const categoryIcons = {
  droplets: Droplets,
  zap: Zap,
  snowflake: Snowflake,
  flame: Flame,
  hammer: Hammer,
}

export function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const {
    activeOrder,
    activeOrderProvider,
    activeOrderServices,
    flashMessage,
    dismissFlash,
    orderHistory,
  } = useAppState()

  const activeBranchLabel =
    user.branches.find((branch) => branch.id === activeOrder?.branchId)?.name ?? ''

  const popularProviders = popularProviderIds
    .map((id) => providers.find((provider) => provider.id === id))
    .filter(Boolean)

  const favoriteProviders = favoriteProviderIds
    .map((id) => providers.find((provider) => provider.id === id))
    .filter(Boolean)

  const submitSearch = (searchQuery: string) => {
    startTransition(() => {
      navigate(`/search?query=${encodeURIComponent(searchQuery || 'plomeria')}`)
    })
  }

  return (
    <MobileShell
      header={
        <Header
          title="Hola, Camila"
          subtitle="Gestiona pedidos tecnicos de tus sucursales"
          rightSlot={
            <div className="header-actions">
              <button type="button" className="icon-button" aria-label="Notificaciones">
                <Bell size={18} />
              </button>
              <button type="button" className="avatar-button" aria-label="Perfil">
                <UserCircle2 size={20} />
              </button>
            </div>
          }
        />
      }
    >
      <section className="stack-section">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => submitSearch(query)}
          placeholder="Buscar servicios: plomeria, gas, electricidad..."
        />
        <Card className="dashboard-card">
          <div className="dashboard-card__copy">
            <p className="section-kicker">Panel operativo</p>
            <h2>Coordina proveedores confiables para cada sucursal</h2>
            <p>
              {user.companyName} centraliza mantenimiento, pagos y seguimiento en un
              solo flujo.
            </p>
          </div>
          <div className="dashboard-card__stats">
            <div className="metric-pill">
              <Building2 size={15} />
              <span>{user.branches.length} sucursales activas</span>
            </div>
            <div className="metric-pill metric-pill--success">
              <ShieldCheck size={15} />
              <span>Proveedores validados</span>
            </div>
          </div>
        </Card>
      </section>

      {flashMessage ? (
        <Card tone="soft" className="banner-card">
          <div>
            <p className="section-kicker">
              {flashMessage === 'payment-confirmed'
                ? 'Pago confirmado'
                : 'Calificacion enviada'}
            </p>
            <h3>
              {flashMessage === 'payment-confirmed'
                ? 'Tu servicio ya esta programado'
                : 'El pedido se guardo en ultimos pedidos'}
            </h3>
          </div>
          <button type="button" className="text-link" onClick={dismissFlash}>
            Ocultar
          </button>
        </Card>
      ) : null}

      {activeOrder && activeOrderProvider && activeOrderServices[0] ? (
        <section className="stack-section">
          <ActiveServiceCard
            order={activeOrder}
            provider={activeOrderProvider}
            branchLabel={activeBranchLabel}
            primaryService={activeOrderServices[0]}
            onTrack={() => navigate('/tracking')}
          />
        </section>
      ) : null}

      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Populares</p>
            <h2>Proveedores mas elegidos</h2>
          </div>
          <Badge tone="accent">Top B2B</Badge>
        </div>
        <div className="horizontal-cards">
          {popularProviders.map((provider) =>
            provider ? (
              <Card key={provider.id} className="mini-provider-card">
                <div className="mini-provider-card__top">
                  <div className="provider-mini-logo">{provider.shortName}</div>
                  <Badge tone="success">Validado</Badge>
                </div>
                <h3>{provider.name}</h3>
                <p>{provider.highlight}</p>
                <div className="mini-provider-card__trust">
                  <span>{provider.responseTime}</span>
                  <span>{provider.zone}</span>
                </div>
                <div className="mini-provider-card__meta">
                  <span>
                    <Star size={14} fill="currentColor" />
                    {provider.rating.toFixed(1)}
                  </span>
                  <span>{provider.eta}</span>
                </div>
                <button
                  type="button"
                  className="inline-action"
                  onClick={() => navigate(`/provider/${provider.id}`)}
                >
                  Ver detalle
                </button>
              </Card>
            ) : null,
          )}
        </div>
      </section>

      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Categorias</p>
            <h2>Accesos rapidos</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon]

            return (
              <button
                key={category.id}
                type="button"
                className="category-card"
                onClick={() => submitSearch(category.searchTerm)}
              >
                <span className="category-card__icon">
                  <Icon size={20} />
                </span>
                <strong>{category.label}</strong>
                <p>{category.description}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Favoritos</p>
            <h2>Ultimos proveedores usados</h2>
          </div>
        </div>
        <div className="stack-cards">
          {favoriteProviders.map((provider) =>
            provider ? (
              <Card key={provider.id} className="compact-provider-card">
                <div className="compact-provider-card__left">
                  <div className="provider-mini-logo">{provider.shortName}</div>
                  <div>
                    <h3>{provider.name}</h3>
                    <p>{provider.zone}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => navigate(`/provider/${provider.id}`)}
                >
                  Abrir
                </button>
              </Card>
            ) : null,
          )}
        </div>
      </section>

      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Historial</p>
            <h2>Ultimos pedidos</h2>
          </div>
        </div>
        <div className="stack-cards">
          {orderHistory.slice(0, 3).map((order) => {
            const provider = providers.find(
              (currentProvider) => currentProvider.id === order.providerId,
            )
            const service = order.serviceIds.length > 0 ? order.serviceIds[0] : null
            const serviceLabel =
              service
                ? services.find((item) => item.id === service)?.title
                : null

            if (!provider) {
              return null
            }

            return (
              <Card key={order.id} className="history-card">
                <div>
                  <h3>{provider.name}</h3>
                  <p>{serviceLabel ?? 'Servicio completado'}</p>
                </div>
                <div className="history-card__side">
                  <StatusBadge status={order.status} />
                  <span className="history-card__amount">
                    ${order.total.toLocaleString('es-AR')}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </section>
    </MobileShell>
  )
}
