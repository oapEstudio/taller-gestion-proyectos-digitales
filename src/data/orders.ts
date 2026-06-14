import type { Order, OrderStatus } from './types'

export const orderStatusSteps: OrderStatus[] = [
  'Programado',
  'En camino',
  'En progreso',
  'Finalizado',
]

export const serviceFee = 3500

export const initialOrderHistory: Order[] = [
  {
    id: 'hist-001',
    providerId: 'electro-red',
    serviceIds: ['tablero'],
    branchId: 'palermo',
    scheduledDate: 'Jueves 11 de junio',
    scheduledTime: '10:00 - 12:00',
    notes: 'Chequear chispazo en tablero del deposito.',
    paymentMethodId: 'corporativa',
    subtotal: 26000,
    serviceFee,
    total: 29500,
    status: 'Finalizado',
    trackingStage: 3,
    etaMinutes: 0,
    rated: true,
  },
  {
    id: 'hist-002',
    providerId: 'gas-seguro',
    serviceIds: ['fuga-gas'],
    branchId: 'centro',
    scheduledDate: 'Martes 2 de junio',
    scheduledTime: '15:00 - 16:30',
    notes: 'Control preventivo en cocina y office.',
    paymentMethodId: 'transferencia',
    subtotal: 30000,
    serviceFee,
    total: 33500,
    status: 'Finalizado',
    trackingStage: 3,
    etaMinutes: 0,
    rated: true,
  },
]
