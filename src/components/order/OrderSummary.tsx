import type { Provider, Service } from '../../data/types'
import { Card } from '../ui/Card'

interface OrderSummaryProps {
  title: string
  provider: Provider
  services: Service[]
  subtotal: number
  serviceFee: number
  total: number
}

export function OrderSummary({
  title,
  provider,
  services,
  subtotal,
  serviceFee,
  total,
}: OrderSummaryProps) {
  return (
    <Card className="order-summary">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{title}</p>
          <h3>{provider.name}</h3>
        </div>
        <div className="provider-mini-logo">{provider.shortName}</div>
      </div>
      <div className="order-summary__items">
        {services.map((service) => (
          <div key={service.id} className="order-summary__row">
            <div>
              <strong>{service.title}</strong>
              <p>{service.duration}</p>
            </div>
            <span>${service.price.toLocaleString('es-AR')}</span>
          </div>
        ))}
        <div className="order-summary__row">
          <span>Cargo de servicio</span>
          <span>${serviceFee.toLocaleString('es-AR')}</span>
        </div>
      </div>
      <div className="order-summary__total">
        <span>Subtotal</span>
        <strong>${subtotal.toLocaleString('es-AR')}</strong>
      </div>
      <div className="order-summary__total order-summary__total--grand">
        <span>Total</span>
        <strong>${total.toLocaleString('es-AR')}</strong>
      </div>
    </Card>
  )
}
