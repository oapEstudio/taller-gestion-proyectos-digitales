import type { UserProfile } from './types'

export const user: UserProfile = {
  companyName: 'Nexa Retail SA',
  email: 'compras@nexaretail.com',
  avatarInitials: 'NR',
  procurementLead: 'Camila Mendez',
  branches: [
    {
      id: 'centro',
      name: 'Sucursal Centro',
      address: 'Av. Siempre Viva 123, CABA',
      contact: 'Recepcion 4to piso',
    },
    {
      id: 'palermo',
      name: 'Sucursal Palermo',
      address: 'Honduras 4120, CABA',
      contact: 'Administracion local',
    },
  ],
  paymentMethods: [
    {
      id: 'corporativa',
      label: 'Tarjeta corporativa',
      type: 'corporate-card',
      details: 'Visa Business terminada en 4408',
    },
    {
      id: 'transferencia',
      label: 'Transferencia bancaria',
      type: 'bank-transfer',
      details: 'Banco Galicia · Cuenta empresa',
    },
    {
      id: 'billetera',
      label: 'Billetera digital',
      type: 'digital-wallet',
      details: 'Cuenta FixHub Pay corporativa',
    },
  ],
  billingProfile: 'Facturacion centralizada · CUIT 30-71234567-9',
}
