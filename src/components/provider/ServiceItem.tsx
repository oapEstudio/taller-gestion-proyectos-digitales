import { Plus, Check } from 'lucide-react'
import type { Service } from '../../data/types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface ServiceItemProps {
  service: Service
  selected: boolean
  onToggle: () => void
}

export function ServiceItem({
  service,
  selected,
  onToggle,
}: ServiceItemProps) {
  return (
    <Card className={['service-item', selected ? 'is-selected' : ''].join(' ')}>
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="service-item__meta">
          <strong>${service.price.toLocaleString('es-AR')}</strong>
          <span>{service.duration}</span>
        </div>
      </div>
      <Button
        variant={selected ? 'primary' : 'secondary'}
        size="sm"
        className="service-item__button"
        onClick={onToggle}
        aria-label={selected ? 'Quitar servicio' : 'Agregar servicio'}
      >
        {selected ? <Check size={16} /> : <Plus size={16} />}
      </Button>
    </Card>
  )
}
