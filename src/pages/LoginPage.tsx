import { Building2, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/useAppState'
import heroImage from '../assets/hero.png'
import { Button } from '../components/ui/Button'
import { getButtonClassName } from '../components/ui/button-styles'

export function LoginPage() {
  const navigate = useNavigate()
  const [remember, setRemember] = useState(true)
  const [email, setEmail] = useState('compras@nexaretail.com')
  const [password, setPassword] = useState('FixHub2026')
  const { login } = useAppState()

  const handleSubmit = () => {
    if (!email || !password) {
      return
    }

    login()
    navigate('/home')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__brand">
          <div className="brand-mark brand-mark--lg">FH</div>
          <div>
            <p className="section-kicker">FixHub</p>
            <h1>Marketplace B2B de servicios corporativos</h1>
          </div>
        </div>
        <img src={heroImage} alt="" className="auth-card__hero" />
        <div className="auth-form">
          <label className="field">
            <span>Correo corporativo</span>
            <div className="field__input">
              <Mail size={16} />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="empresa@fixhub.com"
              />
            </div>
          </label>
          <label className="field">
            <span>Contrasena</span>
            <div className="field__input">
              <LockKeyhole size={16} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
              />
            </div>
          </label>
          <div className="auth-form__row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((value) => !value)}
              />
              <span>Recordarme</span>
            </label>
            <button type="button" className="text-link">
              Olvidaste tu contrasena?
            </button>
          </div>
          <Button fullWidth onClick={handleSubmit}>
            Ingresar
          </Button>
          <button
            type="button"
            className={getButtonClassName({ variant: 'secondary', fullWidth: true })}
          >
            <Building2 size={16} />
            Crear cuenta empresa
          </button>
        </div>
      </div>
    </div>
  )
}
