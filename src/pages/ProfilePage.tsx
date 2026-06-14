import { Building2, CreditCard, LogOut, MapPinned, UserCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { user } from '../data/user'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function ProfilePage() {
  const navigate = useNavigate()
  const { logout } = useAppState()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <MobileShell
      header={<Header title="Perfil" subtitle="Cuenta empresa y configuracion" />}
    >
      <section className="stack-section">
        <Card className="profile-card">
          <div className="profile-card__avatar">
            <UserCircle2 size={44} />
          </div>
          <div>
            <h2>{user.companyName}</h2>
            <p>{user.email}</p>
            <span>Responsable de compras: {user.procurementLead}</span>
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="detail-card">
          <div className="detail-card__row">
            <Building2 size={18} />
            <div>
              <strong>Nombre empresa</strong>
              <p>{user.companyName}</p>
            </div>
          </div>
          <div className="detail-card__row">
            <MapPinned size={18} />
            <div>
              <strong>Sucursales</strong>
              <p>{user.branches.map((branch) => branch.name).join(' · ')}</p>
            </div>
          </div>
          <div className="detail-card__row">
            <CreditCard size={18} />
            <div>
              <strong>Metodos de pago</strong>
              <p>{user.paymentMethods.map((method) => method.label).join(' · ')}</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Button fullWidth variant="secondary" onClick={handleLogout}>
          <LogOut size={16} />
          Cerrar sesion
        </Button>
      </section>
    </MobileShell>
  )
}
