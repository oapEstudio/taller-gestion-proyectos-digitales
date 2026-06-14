import type { Category } from './types'

export const categories: Category[] = [
  {
    id: 'plomeria',
    label: 'Plomeria',
    searchTerm: 'plomeria',
    description: 'Urgencias, diagnostico y reparaciones para oficinas.',
    icon: 'droplets',
  },
  {
    id: 'electricidad',
    label: 'Electricidad',
    searchTerm: 'electricidad',
    description: 'Tableros, luminarias y mantenimiento preventivo.',
    icon: 'zap',
  },
  {
    id: 'climatizacion',
    label: 'Climatizacion',
    searchTerm: 'climatizacion',
    description: 'Aires, calefaccion y ventilacion para sucursales.',
    icon: 'snowflake',
  },
  {
    id: 'gas',
    label: 'Gas',
    searchTerm: 'gas',
    description: 'Instalaciones habilitadas y controles periodicos.',
    icon: 'flame',
  },
  {
    id: 'albanileria',
    label: 'Albanileria',
    searchTerm: 'albanileria',
    description: 'Obras menores, reparaciones y terminaciones.',
    icon: 'hammer',
  },
]
