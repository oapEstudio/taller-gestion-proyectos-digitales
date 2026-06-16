import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import { Header } from '../components/layout/Header'
import { MobileShell } from '../components/layout/MobileShell'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Rating } from '../components/ui/Rating'

export function RatingPage() {
  const navigate = useNavigate()
  const { activeOrder, activeOrderProvider, activeOrderServices, submitRating } =
    useAppState()
  const [overall, setOverall] = useState(5)
  const [punctuality, setPunctuality] = useState(5)
  const [quality, setQuality] = useState(5)
  const [resolution, setResolution] = useState(5)
  const [comments, setComments] = useState(
    'Resolucion rapida y prolija. Ideal para mantenimiento de sucursales.',
  )

  if (!activeOrder || !activeOrderProvider || activeOrderServices.length === 0) {
    return (
      <MobileShell
        header={<Header title="Calificacion" subtitle="Sin servicio para evaluar" showBack />}
      >
        <Card className="empty-state">
          <h3>No hay un servicio pendiente de calificar</h3>
          <p>Vuelve al inicio para revisar tus pedidos recientes.</p>
          <Button fullWidth onClick={() => navigate('/home')}>
            Ir al inicio
          </Button>
        </Card>
      </MobileShell>
    )
  }

  const handleSubmit = () => {
    submitRating({
      overall,
      punctuality,
      quality,
      resolution,
      comments,
    })
    navigate('/home')
  }

  return (
    <MobileShell
      header={<Header title="Calificacion" subtitle="Cierra el servicio" showBack />}
    >
      <section className="stack-section">
        <Card className="rating-summary-card">
          <Badge tone="success">Completado</Badge>
          <h2>{activeOrderServices[0].title}</h2>
          <p>{activeOrderProvider.name}</p>
          <div className="rating-summary-card__stats">
            <span>Servicio cerrado correctamente</span>
            <span>Ayuda a priorizar mejores proveedores</span>
          </div>
        </Card>
      </section>

      <section className="stack-section">
        <Card className="form-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Experiencia</p>
              <h2>Como fue tu experiencia?</h2>
            </div>
          </div>
          <div className="rating-block">
            <span>Rating general</span>
            <Rating value={overall} onChange={setOverall} size="lg" />
          </div>
          <div className="rating-block">
            <span>Puntualidad</span>
            <Rating value={punctuality} onChange={setPunctuality} />
          </div>
          <div className="rating-block">
            <span>Calidad del trabajo</span>
            <Rating value={quality} onChange={setQuality} />
          </div>
          <div className="rating-block">
            <span>Resolucion del problema</span>
            <Rating value={resolution} onChange={setResolution} />
          </div>
          <label className="field">
            <span>Comentarios adicionales</span>
            <textarea
              rows={4}
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
          </label>
        </Card>
      </section>

      <section className="stack-section">
        <Button fullWidth onClick={handleSubmit}>
          Enviar calificacion
        </Button>
      </section>
    </MobileShell>
  )
}
