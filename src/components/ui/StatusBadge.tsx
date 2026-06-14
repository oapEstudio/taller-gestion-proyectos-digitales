import type { OrderStatus } from '../../data/types'
import { Badge } from './Badge'

export function StatusBadge({ status }: { status: OrderStatus }) {
  const tone =
    status === 'Finalizado'
      ? 'success'
      : status === 'En progreso'
        ? 'accent'
        : status === 'En camino'
          ? 'warning'
          : 'neutral'

  return <Badge tone={tone}>{status}</Badge>
}
