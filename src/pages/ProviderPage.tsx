import { Clock3, MapPin, ShieldCheck, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { providers } from '../data/providers'
import { services } from '../data/services'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ServiceItem } from '../components/provider/ServiceItem'

export function ProviderPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { cart, cartServices, toggleService } = useAppState()

  const provider = providers.find((currentProvider) => currentProvider.id === id)

  if (!provider) {
    return (
      <MobileShell
        header={<Header title="Proveedor no encontrado" showBack />}
      >
        <Card className="empty-state">
          <h3>No encontramos ese proveedor</h3>
          <p>Vuelve a la busqueda para elegir otro servicio.</p>
          <Button fullWidth onClick={() => navigate('/search?query=plomeria')}>
            Ir a buscar
          </Button>
        </Card>
      </MobileShell>
    )
  }

  const providerServices = services.filter((service) => service.providerId === provider.id)
  const selectedIds =
    cart.providerId === provider.id ? new Set(cart.serviceIds) : new Set<string>()
  const total = cartServices.reduce((accumulator, service) => accumulator + service.price, 0)

  return (
    <MobileShell
      header={<Header title={provider.name} subtitle="Perfil del proveedor" showBack />}
    >
      <section className="stack-section">
        <Card tone="accent" className="provider-hero">
          <div className="provider-hero__top">
            <div className="provider-hero__logo">{provider.shortName}</div>
            <div>
              <h2>{provider.name}</h2>
              <div className="provider-hero__rating">
                <Star size={16} fill="currentColor" />
                <span>{provider.rating.toFixed(1)}</span>
                <span>{provider.reviews} resenas</span>
              </div>
            </div>
          </div>
          <div className="provider-hero__details">
            <span>
              <MapPin size={14} />
              {provider.coverage}
            </span>
            <span>
              <Clock3 size={14} />
              {provider.hours}
            </span>
            <span>
              <ShieldCheck size={14} />
              Documentacion validada
            </span>
          </div>
          <p>{provider.description}</p>
          <div className="provider-hero__badges">
            {provider.trustBadges.map((badge) => (
              <Badge key={badge} tone="success">
                {badge}
              </Badge>
            ))}
          </div>
          <div className="provider-hero__trust-grid">
            <div className="trust-panel">
              <span>Tiempo de respuesta</span>
              <strong>{provider.responseTime}</strong>
            </div>
            <div className="trust-panel">
              <span>Cobertura</span>
              <strong>{provider.zone}</strong>
            </div>
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Servicios</p>
            <h2>Selecciona lo que necesitas</h2>
          </div>
          <Badge tone="accent">Cotizacion inmediata</Badge>
        </div>
        <p className="section-helper">
          Agrega uno o varios trabajos para consolidar la visita tecnica en una sola
          orden.
        </p>
        <div className="stack-cards">
          {providerServices.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              selected={selectedIds.has(service.id)}
              onToggle={() => toggleService(provider.id, service.id)}
            />
          ))}
        </div>
      </section>

      {selectedIds.size > 0 ? (
        <div className="sticky-action-bar">
          <div>
            <p className="section-kicker">{selectedIds.size} servicios seleccionados</p>
            <strong>${total.toLocaleString('es-AR')}</strong>
          </div>
          <Button onClick={() => navigate('/cart')}>Ir al carrito</Button>
        </div>
      ) : null}
    </MobileShell>
  )
}
