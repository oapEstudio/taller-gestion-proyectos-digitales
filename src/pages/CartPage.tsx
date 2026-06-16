import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { serviceFee } from '../data/orders'
import { user } from '../data/user'
import { Badge } from '../components/ui/Badge'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { OrderSummary } from '../components/order/OrderSummary'

export function CartPage() {
  const navigate = useNavigate()
  const {
    cart,
    cartProvider,
    cartServices,
    updateCartNotes,
    updateCartBranch,
  } = useAppState()

  const subtotal = cartServices.reduce(
    (accumulator, service) => accumulator + service.price,
    0,
  )
  const total = subtotal + serviceFee

  if (!cartProvider || cartServices.length === 0) {
    return (
      <MobileShell header={<Header title="Carrito" subtitle="Sin servicios" showBack />}>
        <Card className="empty-state">
          <h3>Tu carrito esta vacio</h3>
          <p>Agrega al menos un servicio para continuar con el pago.</p>
          <Button fullWidth onClick={() => navigate('/search?query=plomeria')}>
            Explorar servicios
          </Button>
        </Card>
      </MobileShell>
    )
  }

  return (
    <MobileShell
      header={<Header title="Carrito" subtitle="Revisa tu pedido" showBack />}
    >
      <section className="stack-section">
        <OrderSummary
          title="Proveedor"
          provider={cartProvider}
          services={cartServices}
          subtotal={subtotal}
          serviceFee={serviceFee}
          total={total}
        />
        <div className="summary-strip">
          <Badge tone="success">Documentacion al dia</Badge>
          <Badge tone="accent">Facturacion corporativa</Badge>
        </div>
      </section>

      <section className="stack-section">
        <Card className="form-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Sucursal</p>
              <h2>Selecciona ubicacion</h2>
            </div>
          </div>
          <div className="branch-list">
            {user.branches.map((branch) => (
              <label key={branch.id} className="option-card">
                <input
                  type="radio"
                  name="branch"
                  checked={cart.branchId === branch.id}
                  onChange={() => updateCartBranch(branch.id)}
                />
                <div className="option-card__content">
                  <strong>{branch.name}</strong>
                  <p>{branch.address}</p>
                  <span>{branch.contact}</span>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="form-card">
          <label className="field">
            <span>Observaciones</span>
            <textarea
              rows={4}
              value={cart.notes}
              onChange={(event) => updateCartNotes(event.target.value)}
              placeholder="Ejemplo: el ingreso tecnico debe coordinarse con recepcion."
            />
          </label>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="info-card">
          <strong>Total estimado: ${total.toLocaleString('es-AR')}</strong>
          <p>Incluye cargo de servicio y coordinacion operativa para la sucursal.</p>
        </Card>
      </section>

      <section className="stack-section">
        <Button fullWidth onClick={() => navigate('/checkout')}>
          Ir a pagar
        </Button>
      </section>
    </MobileShell>
  )
}
