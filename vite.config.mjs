import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',

    environmentMatchGlobs: [
      [
        'src/http/controllers/**/*.spec.ts',
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],

    projects: [
      {
        name: 'e2e',
        test: {
          include: ['src/http/controllers/**/*.spec.ts'],
        },
      },
      {
        name: 'unit',
        test: {
          include: ['src/services/**/*.spec.ts'],
        },
      },
    ],
  },
})