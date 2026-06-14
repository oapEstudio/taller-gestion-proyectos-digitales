import { createContext } from 'react'
import type { Order, ReviewInput, TrackingStage } from '../data/types'
import { providers } from '../data/providers'
import { services } from '../data/services'

export type FlashMessage = 'payment-confirmed' | 'rating-sent' | null

export interface CartState {
  providerId: string | null
  serviceIds: string[]
  notes: string
  branchId: string
  scheduledDate: string
  scheduledTime: string
  paymentMethodId: string
}

export interface PersistedState {
  isAuthenticated: boolean
  cart: CartState
  activeOrder: Order | null
  orderHistory: Order[]
  flashMessage: FlashMessage
}

export interface AppStateValue extends PersistedState {
  cartServices: typeof services
  cartProvider: (typeof providers)[number] | null
  activeOrderServices: typeof services
  activeOrderProvider: (typeof providers)[number] | null
  login: () => void
  logout: () => void
  toggleService: (providerId: string, serviceId: string) => void
  updateCartNotes: (notes: string) => void
  updateCartBranch: (branchId: string) => void
  updateCartPaymentMethod: (paymentMethodId: string) => void
  clearCart: () => void
  payOrder: () => boolean
  dismissFlash: () => void
  moveTrackingTo: (stage: TrackingStage) => void
  submitRating: (review: ReviewInput) => void
}

export const AppStateContext = createContext<AppStateValue | null>(null)
