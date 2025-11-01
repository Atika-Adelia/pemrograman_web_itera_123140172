// .eslintrc.config.js
export default {
  env: { // <-- TAMBAHKAN BLOK 'env' INI
    browser: true,
    es2020: true,
    node: true,
    'vitest-globals/env': true // <-- INI KUNCINYA
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh',
    'vitest-globals' // <-- GANTI/TAMBAHKAN 'vitest-globals'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}