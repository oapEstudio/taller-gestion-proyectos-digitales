import { Clock3, MapPin, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Provider } from '../../data/types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { getButtonClassName } from '../ui/button-styles'

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card className="provider-card">
      <div className="provider-card__top">
        <div className="provider-card__logo">{provider.shortName}</div>
        <div className="provider-card__info">
          <div className="provider-card__title-row">
            <h3>{provider.name}</h3>
            {provider.featured ? <Badge tone="accent">Proveedor destacado</Badge> : null}
          </div>
          <div className="provider-card__meta">
            <span>
              <Star size={14} fill="currentColor" />
              {provider.rating.toFixed(1)}
            </span>
            <span>{provider.reviews} resenas</span>
          </div>
        </div>
      </div>
      <div className="provider-card__details">
        <span>
          <MapPin size={14} />
          {provider.zone}
        </span>
        <span>
          <Clock3 size={14} />
          Llega en {provider.eta}
        </span>
      </div>
      <div className="provider-card__badges">
        <Badge tone="success">
          <ShieldCheck size={12} />
          Documentacion validada
        </Badge>
        {provider.featured ? <Badge tone="accent">Respuesta prioritaria</Badge> : null}
      </div>
      <p className="provider-card__description">{provider.highlight}</p>
      <div className="provider-card__trust">
        <span>{provider.responseTime}</span>
        <span>{provider.trustBadges[0]}</span>
      </div>
      <Link
        to={`/provider/${provider.id}`}
        className={getButtonClassName({ variant: 'secondary', fullWidth: true })}
      >
        Ver perfil
      </Link>
    </Card>
  )
}
