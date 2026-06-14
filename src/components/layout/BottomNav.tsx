import { Headset, House, Search, UserCircle2 } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', to: '/home', icon: House },
  { label: 'Buscar', to: '/search?query=plomeria', icon: Search },
  { label: 'Soporte', to: '/support', icon: Headset },
  { label: 'Perfil', to: '/profile', icon: UserCircle2 },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <div className="bottom-nav-wrap">
      <nav className="bottom-nav" aria-label="Navegacion principal">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            location.pathname === item.to ||
            (item.to === '/home' &&
              ['/provider', '/cart', '/checkout', '/tracking', '/rating'].some(
                (path) => location.pathname.startsWith(path),
              ))

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={['bottom-nav__item', isActive ? 'is-active' : ''].join(' ')}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
