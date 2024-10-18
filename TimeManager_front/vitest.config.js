import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        environment: 'jsdom',
        coverage: {
          provider: 'istanbul',
          reporter: ['text', 'json', 'html']
        },
        exclude: ['node_modules', 'dist', 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        globals: true
      }
    })
  )
)
