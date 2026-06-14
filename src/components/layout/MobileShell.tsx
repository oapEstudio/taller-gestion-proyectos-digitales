import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'

interface MobileShellProps {
  header: ReactNode
  children: ReactNode
  withBottomNav?: boolean
}

export function MobileShell({
  header,
  children,
  withBottomNav = true,
}: MobileShellProps) {
  return (
    <div className="app-shell">
      {header}
      <main className="screen-content">{children}</main>
      {withBottomNav ? <BottomNav /> : null}
    </div>
  )
}
