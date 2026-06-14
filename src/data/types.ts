export type CategoryId =
  | 'plomeria'
  | 'electricidad'
  | 'climatizacion'
  | 'gas'
  | 'albanileria'

export type OrderStatus =
  | 'Programado'
  | 'En camino'
  | 'En progreso'
  | 'Finalizado'

export type TrackingStage = 0 | 1 | 2 | 3

export type PaymentMethodType =
  | 'corporate-card'
  | 'bank-transfer'
  | 'digital-wallet'

export interface Category {
  id: CategoryId
  label: string
  searchTerm: string
  description: string
  icon:
    | 'droplets'
    | 'zap'
    | 'snowflake'
    | 'flame'
    | 'hammer'
}

export interface Provider {
  id: string
  name: string
  shortName: string
  categoryIds: CategoryId[]
  rating: number
  reviews: number
  zone: string
  eta: string
  responseTime: string
  coverage: string
  hours: string
  description: string
  validated: boolean
  featured: boolean
  trustBadges: string[]
  highlight: string
}

export interface Service {
  id: string
  providerId: string
  categoryId: CategoryId
  title: string
  description: string
  duration: string
  price: number
}

export interface Branch {
  id: string
  name: string
  address: string
  contact: string
}

export interface PaymentMethod {
  id: string
  label: string
  type: PaymentMethodType
  details: string
}

export interface UserProfile {
  companyName: string
  email: string
  avatarInitials: string
  procurementLead: string
  branches: Branch[]
  paymentMethods: PaymentMethod[]
  billingProfile: string
}

export interface Order {
  id: string
  providerId: string
  serviceIds: string[]
  branchId: string
  scheduledDate: string
  scheduledTime: string
  notes: string
  paymentMethodId: string
  subtotal: number
  serviceFee: number
  total: number
  status: OrderStatus
  trackingStage: TrackingStage
  etaMinutes: number
  rated: boolean
}

export interface ReviewInput {
  overall: number
  punctuality: number
  quality: number
  resolution: number
  comments: string
}
