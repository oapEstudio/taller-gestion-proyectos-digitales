import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import type { Order, Provider, Service } from '../../data/types'
import { Card } from '../ui/Card'
import { StatusBadge } from '../ui/StatusBadge'

interface ActiveServiceCardProps {
  order: Order
  provider: Provider
  branchLabel: string
  primaryService: Service
  onTrack: () => void
}

export function ActiveServiceCard({
  order,
  provider,
  branchLabel,
  primaryService,
  onTrack,
}: ActiveServiceCardProps) {
  return (
    <Card tone="accent" className="active-service-card">
      <div className="active-service-card__head">
        <div>
          <p className="section-kicker">Servicio activo</p>
          <h3>{provider.name}</h3>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <p className="active-service-card__title">{primaryService.title}</p>
      <div className="active-service-card__meta">
        <span>
          <CalendarDays size={14} />
          {order.scheduledDate} · {order.scheduledTime}
        </span>
        <span>
          <MapPin size={14} />
          {branchLabel}
        </span>
      </div>
      <button
        type="button"
        className="inline-action"
        onClick={onTrack}
      >
        Ver seguimiento
        <ArrowRight size={16} />
      </button>
    </Card>
  )
}
