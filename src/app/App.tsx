import { AppStateProvider } from './AppState'
import { AppRouter } from './router'

export default function App() {
  return (
    <AppStateProvider>
      <AppRouter />
    </AppStateProvider>
  )
}
