import { useEffect, useState, type ReactNode } from 'react'
import {
  AppStateContext,
  type CartState,
  type PersistedState,
} from './app-state-context'
import { initialOrderHistory, serviceFee } from '../data/orders'
import { providers } from '../data/providers'
import { services } from '../data/services'
import type { Order, ReviewInput, TrackingStage } from '../data/types'
import { user } from '../data/user'

const storageKey = 'fixhub-mvp-state'

const createDefaultCart = (): CartState => ({
  providerId: null,
  serviceIds: [],
  notes: '',
  branchId: user.branches[0].id,
  scheduledDate: 'Lunes 15 de junio',
  scheduledTime: '15:00 - 17:00',
  paymentMethodId: user.paymentMethods[0].id,
})

const defaultState: PersistedState = {
  isAuthenticated: false,
  cart: createDefaultCart(),
  activeOrder: null,
  orderHistory: initialOrderHistory,
  flashMessage: null,
}

const getServicesByIds = (serviceIds: string[]) =>
  services.filter((service) => serviceIds.includes(service.id))

const getProvider = (providerId: string | null) =>
  providers.find((provider) => provider.id === providerId) ?? null

const getStatusByStage = (stage: TrackingStage) => {
  if (stage === 3) {
    return 'Finalizado'
  }

  if (stage === 2) {
    return 'En progreso'
  }

  if (stage === 1) {
    return 'Programado'
  }

  return 'Programado'
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => {
    if (typeof window === 'undefined') {
      return defaultState
    }

    const storedValue = window.localStorage.getItem(storageKey)

    if (!storedValue) {
      return defaultState
    }

    try {
      return {
        ...defaultState,
        ...JSON.parse(storedValue),
      }
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  const cartServices = getServicesByIds(state.cart.serviceIds)
  const cartProvider = getProvider(state.cart.providerId)
  const activeOrderServices = getServicesByIds(state.activeOrder?.serviceIds ?? [])
  const activeOrderProvider = getProvider(state.activeOrder?.providerId ?? null)

  const login = () => {
    setState((currentState) => ({
      ...currentState,
      isAuthenticated: true,
    }))
  }

  const logout = () => {
    setState((currentState) => ({
      ...currentState,
      isAuthenticated: false,
      flashMessage: null,
      cart: createDefaultCart(),
      activeOrder: null,
    }))
  }

  const toggleService = (providerId: string, serviceId: string) => {
    setState((currentState) => {
      const isNewProvider = currentState.cart.providerId !== providerId
      const existingIds = isNewProvider ? [] : currentState.cart.serviceIds
      const serviceIds = existingIds.includes(serviceId)
        ? existingIds.filter((id) => id !== serviceId)
        : [...existingIds, serviceId]

      return {
        ...currentState,
        cart: {
          ...currentState.cart,
          providerId: serviceIds.length > 0 ? providerId : null,
          serviceIds,
          notes: isNewProvider ? '' : currentState.cart.notes,
        },
      }
    })
  }

  const updateCartNotes = (notes: string) => {
    setState((currentState) => ({
      ...currentState,
      cart: {
        ...currentState.cart,
        notes,
      },
    }))
  }

  const updateCartBranch = (branchId: string) => {
    setState((currentState) => ({
      ...currentState,
      cart: {
        ...currentState.cart,
        branchId,
      },
    }))
  }

  const updateCartPaymentMethod = (paymentMethodId: string) => {
    setState((currentState) => ({
      ...currentState,
      cart: {
        ...currentState.cart,
        paymentMethodId,
      },
    }))
  }

  const clearCart = () => {
    setState((currentState) => ({
      ...currentState,
      cart: createDefaultCart(),
    }))
  }

  const dismissFlash = () => {
    setState((currentState) => ({
      ...currentState,
      flashMessage: null,
    }))
  }

  const payOrder = () => {
    if (!state.cart.providerId || state.cart.serviceIds.length === 0) {
      return false
    }

    const subtotal = cartServices.reduce(
      (accumulator, service) => accumulator + service.price,
      0,
    )

    const order: Order = {
      id: `order-${Date.now()}`,
      providerId: state.cart.providerId,
      serviceIds: state.cart.serviceIds,
      branchId: state.cart.branchId,
      scheduledDate: state.cart.scheduledDate,
      scheduledTime: state.cart.scheduledTime,
      notes: state.cart.notes,
      paymentMethodId: state.cart.paymentMethodId,
      subtotal,
      serviceFee,
      total: subtotal + serviceFee,
      status: 'Programado',
      trackingStage: 1,
      etaMinutes: 12,
      rated: false,
    }

    setState((currentState) => ({
      ...currentState,
      activeOrder: order,
      cart: createDefaultCart(),
      flashMessage: 'payment-confirmed',
    }))

    return true
  }

  const moveTrackingTo = (stage: TrackingStage) => {
    setState((currentState) => {
      if (!currentState.activeOrder) {
        return currentState
      }

      return {
        ...currentState,
        activeOrder: {
          ...currentState.activeOrder,
          trackingStage: stage,
          status: getStatusByStage(stage),
        },
      }
    })
  }

  const submitRating = (review: ReviewInput) => {
    void review

    setState((currentState) => {
      if (!currentState.activeOrder) {
        return currentState
      }

      const completedOrder: Order = {
        ...currentState.activeOrder,
        status: 'Finalizado',
        trackingStage: 3,
        rated: true,
      }

      return {
        ...currentState,
        activeOrder: null,
        orderHistory: [completedOrder, ...currentState.orderHistory],
        flashMessage: 'rating-sent',
      }
    })
  }

  return (
    <AppStateContext.Provider
      value={{
        ...state,
        cartServices,
        cartProvider,
        activeOrderServices,
        activeOrderProvider,
        login,
        logout,
        toggleService,
        updateCartNotes,
        updateCartBranch,
        updateCartPaymentMethod,
        clearCart,
        payOrder,
        dismissFlash,
        moveTrackingTo,
        submitRating,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
