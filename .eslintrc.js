module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  "extends": ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:import/errors"],
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
