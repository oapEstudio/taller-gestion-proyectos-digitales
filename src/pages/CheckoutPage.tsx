import { CreditCard, Landmark, ShieldCheck, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { serviceFee } from '../data/orders'
import { user } from '../data/user'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { OrderSummary } from '../components/order/OrderSummary'

const paymentIcons = {
  corporativa: CreditCard,
  transferencia: Landmark,
  billetera: Wallet,
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const {
    cart,
    cartProvider,
    cartServices,
    updateCartPaymentMethod,
    payOrder,
  } = useAppState()

  const branch = user.branches.find((currentBranch) => currentBranch.id === cart.branchId)
  const subtotal = cartServices.reduce(
    (accumulator, service) => accumulator + service.price,
    0,
  )
  const total = subtotal + serviceFee

  if (!cartProvider || cartServices.length === 0 || !branch) {
    return (
      <MobileShell
        header={<Header title="Pago" subtitle="Pedido incompleto" showBack />}
      >
        <Card className="empty-state">
          <h3>No hay un pedido listo para pagar</h3>
          <p>Completa el carrito antes de continuar.</p>
          <Button fullWidth onClick={() => navigate('/cart')}>
            Volver al carrito
          </Button>
        </Card>
      </MobileShell>
    )
  }

  const handlePay = () => {
    const wasCreated = payOrder()

    if (wasCreated) {
      navigate('/home')
    }
  }

  return (
    <MobileShell
      header={<Header title="Pago" subtitle="Confirma y abona el pedido" showBack />}
    >
      <section className="stack-section">
        <Card tone="soft" className="payment-hero-card">
          <p className="section-kicker">Checkout corporativo</p>
          <h2>Pago trazable y listo para facturacion</h2>
          <p>
            Confirma proveedor, sucursal y metodo. El servicio quedara programado al
            instante.
          </p>
        </Card>
      </section>

      <section className="stack-section">
        <OrderSummary
          title="Resumen del pedido"
          provider={cartProvider}
          services={cartServices}
          subtotal={subtotal}
          serviceFee={serviceFee}
          total={total}
        />
      </section>

      <section className="stack-section">
        <Card className="form-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Programacion</p>
              <h2>Fecha y sucursal</h2>
            </div>
          </div>
          <div className="detail-stack">
            <div className="detail-row">
              <span>Fecha</span>
              <strong>{cart.scheduledDate}</strong>
            </div>
            <div className="detail-row">
              <span>Horario</span>
              <strong>{cart.scheduledTime}</strong>
            </div>
            <div className="detail-row">
              <span>Sucursal</span>
              <strong>{branch.name}</strong>
            </div>
            <p className="muted-text">{branch.address}</p>
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="form-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Metodo de pago</p>
              <h2>Selecciona como pagar</h2>
            </div>
          </div>
          <div className="branch-list">
            {user.paymentMethods.map((method) => {
              const Icon = paymentIcons[method.id as keyof typeof paymentIcons]

              return (
                <label key={method.id} className="option-card">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={cart.paymentMethodId === method.id}
                    onChange={() => updateCartPaymentMethod(method.id)}
                  />
                  <div className="option-card__content">
                    <strong>{method.label}</strong>
                    <p>{method.details}</p>
                  </div>
                  <span className="option-card__icon">
                    <Icon size={18} />
                  </span>
                </label>
              )
            })}
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="secure-card">
          <ShieldCheck size={18} />
          <div>
            <strong>Pago seguro</strong>
            <p>{user.billingProfile}</p>
          </div>
        </Card>
        <div className="detail-chip-row">
          <span className="detail-chip">Total ${total.toLocaleString('es-AR')}</span>
          <span className="detail-chip">Pago seguro</span>
        </div>
      </section>

      <section className="stack-section">
        <Button fullWidth onClick={handlePay}>
          Pagar
        </Button>
      </section>
    </MobileShell>
  )
}
