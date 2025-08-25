// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever plugins you're using

export default defineConfig({
  plugins: [react()],
  // Add or merge with existing build config
  build: {
    chunkSizeWarningLimit: 1000 // Increase to 1000 KB
  },
  // ... other existing config
})