import { Headset, MapPin, MessageSquareText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { orderStatusSteps } from '../data/orders'
import type { OrderStatus } from '../data/types'
import { user } from '../data/user'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'

export function TrackingPage() {
  const navigate = useNavigate()
  const { activeOrder, activeOrderProvider, activeOrderServices, moveTrackingTo } =
    useAppState()

  if (!activeOrder || !activeOrderProvider || activeOrderServices.length === 0) {
    return (
      <MobileShell
        header={<Header title="Seguimiento" subtitle="Sin servicio activo" showBack />}
      >
        <Card className="empty-state">
          <h3>No hay un servicio en curso</h3>
          <p>Cuando programes un pedido podras seguirlo desde aqui.</p>
          <Button fullWidth onClick={() => navigate('/home')}>
            Volver al inicio
          </Button>
        </Card>
      </MobileShell>
    )
  }

  const branch = user.branches.find((item) => item.id === activeOrder.branchId)
  const currentStage = activeOrder.trackingStage
  const currentStatus: OrderStatus =
    currentStage === 1
      ? 'En camino'
      : currentStage === 2
        ? 'En progreso'
        : currentStage === 3
          ? 'Finalizado'
          : 'Programado'

  const advanceToProgress = () => moveTrackingTo(2)
  const finishOrder = () => {
    moveTrackingTo(3)
    navigate('/rating')
  }

  return (
    <MobileShell
      header={<Header title="Seguimiento" subtitle="Estado del servicio" showBack />}
    >
      <section className="stack-section">
        <Card className="tracking-hero">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{activeOrderProvider.name}</p>
              <h2>{activeOrderServices[0].title}</h2>
            </div>
            <StatusBadge status={currentStatus} />
          </div>
          <p className="tracking-eta">Llega en {activeOrder.etaMinutes} min</p>
          <div className="detail-stack">
            <div className="detail-row">
              <span>Direccion</span>
              <strong>{branch?.address}</strong>
            </div>
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="timeline-card">
          <p className="section-kicker">Timeline</p>
          <div className="timeline">
            {orderStatusSteps.map((step, index) => (
              <div
                key={step}
                className={['timeline__step', index <= currentStage ? 'is-active' : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="timeline__dot" />
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="map-card">
          <div className="map-card__road" />
          <div className="map-card__markers">
            <span className="map-card__marker map-card__marker--origin">PE</span>
            <span className="map-card__marker map-card__marker--destination">
              <MapPin size={16} />
            </span>
          </div>
          <p className="map-card__caption">
            Ruta mockeada hacia {branch?.name}. Tecnico asignado salio hace 8 min.
          </p>
        </Card>
      </section>

      <section className="stack-section split-actions">
        <Button variant="secondary" fullWidth onClick={() => navigate('/support')}>
          <Headset size={16} />
          Soporte
        </Button>
        <Button variant="ghost" fullWidth>
          <MessageSquareText size={16} />
          Contactar proveedor
        </Button>
      </section>

      {currentStage < 2 ? (
        <section className="stack-section">
          <Button fullWidth onClick={advanceToProgress}>
            Marcar en progreso
          </Button>
        </section>
      ) : null}

      {currentStage < 3 ? (
        <section className="stack-section">
          <Button fullWidth variant="secondary" onClick={finishOrder}>
            Marcar finalizado
          </Button>
        </section>
      ) : null}
    </MobileShell>
  )
}
