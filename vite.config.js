import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        contracting: resolve(__dirname, 'government-contracting.html'),
        capability: resolve(__dirname, 'capability-statement.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        resources: resolve(__dirname, 'resources.html'),
        contact: resolve(__dirname, 'contact.html'),
      }
    }
  }
})
