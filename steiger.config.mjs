import { defineConfig } from 'steiger'

import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: ['dist', 'functions', '**/__stories__/**/*', '**/__tests__/**/*'],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
    },
  },
])
