import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const base = process.env.VITE_BASE_PATH ?? (repositoryName ? `/${repositoryName}/` : '/')

  return {
    base,
    plugins: [react()],
  }
})
