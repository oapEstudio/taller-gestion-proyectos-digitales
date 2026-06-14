import { AlertTriangle, BadgeDollarSign, CircleHelp, ShieldAlert, Undo2 } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const supportTopics = [
  {
    title: 'Problemas con un servicio',
    description: 'Retrasos, calidad del trabajo o acceso a sucursal.',
    icon: AlertTriangle,
  },
  {
    title: 'Problemas con un pago',
    description: 'Comprobantes, rechazo o conciliacion de facturas.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Reportar proveedor',
    description: 'Conducta, documentacion o incumplimiento de SLA.',
    icon: ShieldAlert,
  },
  {
    title: 'Solicitar devolucion',
    description: 'Gestion de reintegros y creditos comerciales.',
    icon: Undo2,
  },
]

export function SupportPage() {
  return (
    <MobileShell
      header={
        <Header title="Soporte" subtitle="Ayuda operativa para tu equipo" />
      }
    >
      <section className="stack-section">
        <Card className="support-hero">
          <CircleHelp size={20} />
          <div>
            <h2>Centro de ayuda FixHub</h2>
            <p>Respondemos consultas de coordinacion, pagos y calidad de servicio.</p>
          </div>
          <Button fullWidth>Contactar soporte</Button>
        </Card>
      </section>

      <section className="stack-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Preguntas frecuentes</p>
            <h2>Respuestas rapidas</h2>
          </div>
        </div>
        <div className="stack-cards">
          <Card className="faq-card">
            <h3>Como reprogramo un servicio?</h3>
            <p>Desde seguimiento o soporte puedes coordinar una nueva ventana horaria.</p>
          </Card>
          <Card className="faq-card">
            <h3>Que valida FixHub antes de activar un proveedor?</h3>
            <p>Matriculas, seguros, capacidad operativa y facturacion formal.</p>
          </Card>
        </div>
      </section>

      <section className="stack-section">
        <div className="stack-cards">
          {supportTopics.map((topic) => {
            const Icon = topic.icon

            return (
              <Card key={topic.title} className="topic-card">
                <div className="topic-card__icon">
                  <Icon size={18} />
                </div>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </section>
    </MobileShell>
  )
}
